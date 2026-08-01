'use client';

import { useState } from 'react';

export default function AccesSensible({ slug }) {
  const [code, setCode] = useState('');
  const [infos, setInfos] = useState(null);
  const [erreur, setErreur] = useState('');
  const [chargement, setChargement] = useState(false);
  const [copie, setCopie] = useState('');

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
        setErreur(data.error || 'Code incorrect, réessayez');
      } else {
        setInfos(data.infos);
      }
    } catch {
      setErreur('Problème de connexion, réessayez');
    } finally {
      setChargement(false);
    }
  }

  function copier(label, valeur) {
    navigator.clipboard.writeText(valeur);
    setCopie(label);
    setTimeout(() => setCopie(''), 1200);
  }

  if (infos) {
    return (
      <>
        {(infos.wifiNom || infos.wifiMotDePasse) && (
          <section className="section" id="sec-wifi">
            <div className="section-head">
              <h2 className="section-title">Wi-Fi</h2>
            </div>
            <div className="wifi-card">
              {infos.wifiNom && (
                <div className="wifi-row">
                  <div>
                    <div className="wifi-label">Réseau</div>
                    <div className="wifi-value">{infos.wifiNom}</div>
                  </div>
                  <button className="copy-btn" onClick={() => copier('nom', infos.wifiNom)}>
                    {copie === 'nom' ? '✓' : 'Copier'}
                  </button>
                </div>
              )}
              {infos.wifiMotDePasse && (
                <div className="wifi-row">
                  <div>
                    <div className="wifi-label">Mot de passe</div>
                    <div className="wifi-value">{infos.wifiMotDePasse}</div>
                  </div>
                  <button className="copy-btn" onClick={() => copier('mdp', infos.wifiMotDePasse)}>
                    {copie === 'mdp' ? '✓' : 'Copier'}
                  </button>
                </div>
              )}
            </div>
          </section>
        )}

        {(infos.accesDescription || (infos.accesPhotos && infos.accesPhotos.length > 0)) && (
          <section className="section" id="sec-acces">
            <div className="section-head">
              <h2 className="section-title">Comment entrer</h2>
            </div>
            {infos.accesDescription && (
              <div className="text-card" style={{ marginBottom: 16 }}>
                <p>{infos.accesDescription}</p>
              </div>
            )}
            {infos.accesPhotos && infos.accesPhotos.length > 0 && (
              <div className="carousel">
                {infos.accesPhotos.map((src) => (
                  <div className="carousel-item" key={src}>
                    <div className="pt-card">
                      <div className="pt-img">
                        <img src={src} alt="Accès au logement" loading="lazy" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {infos.equipements && infos.equipements.length > 0 && (
          <section className="section" id="sec-equip">
            <div className="section-head">
              <h2 className="section-title">Équipements</h2>
              <span className="section-sub">Faites glisser →</span>
            </div>
            <div className="carousel">
              {infos.equipements.map((eq) => (
                <div className="carousel-item" key={eq.nom}>
                  <div className="pt-card">
                    {eq.photo && (
                      <div className="pt-img">
                        <img src={eq.photo} alt={eq.nom} loading="lazy" />
                      </div>
                    )}
                    <div className="pt-body">
                      <div className="pt-title">{eq.nom}</div>
                      <div className="pt-text">{eq.description}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </>
    );
  }

  return (
    <div className="lock-zone" id="lockZone">
      <div className="lock-icon">🔒</div>
      <div className="lock-title">Accès &amp; Wi-Fi</div>
      <div className="lock-sub">Entrez le code reçu dans votre message de confirmation</div>
      <form className="lock-form" onSubmit={verifier}>
        <input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="CODE"
          maxLength={8}
          autoComplete="off"
        />
        <button type="submit" disabled={chargement}>
          {chargement ? '...' : 'Ouvrir'}
        </button>
      </form>
      {erreur && <div className="lock-error">{erreur}</div>}
    </div>
  );
}
