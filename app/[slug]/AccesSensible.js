'use client';

import { useState } from 'react';

export default function AccesSensible({ slug }) {
  const [ouvert, setOuvert] = useState(false);
  const [code, setCode] = useState('');
  const [infos, setInfos] = useState(null);
  const [erreur, setErreur] = useState('');
  const [chargement, setChargement] = useState(false);

  async function verifier(e) {
    e.preventDefault();
    setErreur('');
    setChargement(true);
    try {
      const res = await fetch('/api/acces', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, code }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErreur(data.error || 'Code incorrect.');
      } else {
        setInfos(data.infos);
      }
    } catch {
      setErreur('Problème de connexion, réessayez.');
    } finally {
      setChargement(false);
    }
  }

  if (infos) {
    return (
      <div>
        {(infos.accesDescription || (infos.accesPhotos && infos.accesPhotos.length > 0)) && (
          <div className="card">
            <div className="label">Accès au logement</div>
            {infos.accesDescription && <p>{infos.accesDescription}</p>}
            {infos.accesPhotos && infos.accesPhotos.length > 0 && (
              <div className="photos">
                {infos.accesPhotos.map((src) => (
                  <img key={src} src={src} alt="Accès au logement" />
                ))}
              </div>
            )}
          </div>
        )}

        {infos.equipements && infos.equipements.length > 0 && (
          <>
            <div className="label" style={{ marginTop: 16, marginBottom: 8 }}>
              Équipements
            </div>
            {infos.equipements.map((eq) => (
              <div className="card" key={eq.nom}>
                <div className="label">{eq.nom}</div>
                <p>{eq.description}</p>
                {eq.photo && (
                  <div className="photos" style={{ gridTemplateColumns: '1fr' }}>
                    <img src={eq.photo} alt={eq.nom} />
                  </div>
                )}
              </div>
            ))}
          </>
        )}

        {(infos.wifiNom || infos.wifiMotDePasse) && (
          <div className="card" style={{ marginTop: 12 }}>
            <div className="label">Wifi</div>
            <p>
              {infos.wifiNom && <>Réseau : {infos.wifiNom}</>}
              {infos.wifiMotDePasse && <> — Mot de passe : {infos.wifiMotDePasse}</>}
            </p>
          </div>
        )}
      </div>
    );
  }

  if (!ouvert) {
    return (
      <button className="sensible-btn" onClick={() => setOuvert(true)}>
        Afficher les informations d&apos;arrivée
      </button>
    );
  }

  return (
    <div>
      <form className="code-form" onSubmit={verifier}>
        <input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Code reçu par message"
          autoFocus
        />
        <button className="sensible-btn" type="submit" disabled={chargement}>
          {chargement ? '...' : 'Valider'}
        </button>
      </form>
      {erreur && <div className="error-msg">{erreur}</div>}
    </div>
  );
}
