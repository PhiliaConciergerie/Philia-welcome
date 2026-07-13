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
      <div className="card">
        {infos.wifiNom && (
          <>
            <div className="label">Wifi</div>
            <p>
              Réseau : {infos.wifiNom}
              {infos.wifiMotDePasse && <> — Mot de passe : {infos.wifiMotDePasse}</>}
            </p>
          </>
        )}
        {infos.codeAcces && (
          <>
            <div className="label" style={{ marginTop: 10 }}>
              Accès
            </div>
            <p>{infos.codeAcces}</p>
          </>
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
