'use client';

import { useEffect, useRef, useState } from 'react';

const CATEGORIES = [
  { label: 'Boulangerie', key: 'shop', val: 'bakery' },
  { label: 'Supermarché', key: 'shop', val: 'supermarket' },
  { label: 'Pharmacie', key: 'amenity', val: 'pharmacy' },
  { label: 'Restaurant', key: 'amenity', val: 'restaurant' },
  { label: 'Café', key: 'amenity', val: 'cafe' },
  { label: 'Arrêt de transport', key: 'highway', val: 'bus_stop' },
];

function haversine(lat1, lon1, lat2, lon2) {
  const R = 6371000;
  const toRad = (d) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export default function CartePlan({ lat, lng, nom }) {
  const mapRef = useRef(null);
  const containerRef = useRef(null);
  const [lieux, setLieux] = useState(null);
  const [erreur, setErreur] = useState('');

  useEffect(() => {
    if (!lat || !lng || typeof window === 'undefined' || !window.L || mapRef.current) return;
    const map = window.L.map(containerRef.current).setView([lat, lng], 15);
    window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; contributeurs OpenStreetMap',
      maxZoom: 19,
    }).addTo(map);
    window.L.marker([lat, lng]).addTo(map).bindPopup(nom || 'Logement');
    mapRef.current = map;
  }, [lat, lng, nom]);

  useEffect(() => {
    if (!lat || !lng) return;
    const filters = CATEGORIES.map(
      (c) => `node["${c.key}"="${c.val}"](around:900,${lat},${lng});`
    ).join('\n');
    const query = `[out:json][timeout:25];(${filters});out center 80;`;

    fetch('https://overpass-api.de/api/interpreter', {
      method: 'POST',
      body: query,
    })
      .then((r) => r.json())
      .then((data) => {
        const groupes = CATEGORIES.map((cat) => {
          const items = data.elements
            .filter((el) => el.tags && el.tags[cat.key] === cat.val && el.tags.name)
            .map((el) => ({
              nom: el.tags.name,
              distance: Math.round(haversine(lat, lng, el.lat, el.lon)),
              lat: el.lat,
              lon: el.lon,
            }))
            .sort((a, b) => a.distance - b.distance)
            .slice(0, 4);
          return { label: cat.label, items };
        }).filter((c) => c.items.length > 0);

        setLieux(groupes);

        if (mapRef.current && window.L) {
          groupes.forEach((cat) => {
            cat.items.forEach((item) => {
              window.L.circleMarker([item.lat, item.lon], {
                radius: 6,
                color: '#a8623f',
                fillColor: '#a8623f',
                fillOpacity: 0.85,
              })
                .addTo(mapRef.current)
                .bindPopup(`${item.nom} — ${cat.label}`);
            });
          });
        }
      })
      .catch(() => setErreur('Les commerces à proximité ne se sont pas chargés, réessayez plus tard.'));
  }, [lat, lng]);

  if (!lat || !lng) return null;

  return (
    <div>
      <div
        ref={containerRef}
        style={{ height: 320, borderRadius: 8, border: '1px solid var(--line)', marginBottom: 16 }}
      />
      {erreur && <div className="error-msg">{erreur}</div>}
      {lieux &&
        lieux.map((cat) => (
          <div className="card" key={cat.label}>
            <div className="label">{cat.label}</div>
            <ul>
              {cat.items.map((item) => (
                <li key={item.nom + item.distance}>
                  {item.nom} — {item.distance} m
                </li>
              ))}
            </ul>
          </div>
        ))}
    </div>
  );
}
