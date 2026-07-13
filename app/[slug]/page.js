import { logements } from '../../data/logements';
import { notFound } from 'next/navigation';
import AccesSensible from './AccesSensible';

export function generateStaticParams() {
  return Object.keys(logements).map((slug) => ({ slug }));
}

export function generateMetadata({ params }) {
  const logement = logements[params.slug];
  if (!logement) return {};
  return {
    title: `${logement.nom} — Livret d'accueil`,
  };
}

export default function LogementPage({ params }) {
  const logement = logements[params.slug];

  if (!logement) {
    notFound();
  }

  return (
    <main className="wrap">
      <div className="eyebrow">Philia Conciergerie</div>
      <h1>{logement.nom}</h1>
      <p className="desc">{logement.description}</p>

      {logement.photos && logement.photos.length > 0 && (
        <div className="photos">
          {logement.photos.map((src) => (
            <img key={src} src={src} alt={logement.nom} />
          ))}
        </div>
      )}

      <h2>Informations pratiques</h2>
      <div className="card">
        <div className="label">Adresse</div>
        <p>{logement.adresse}</p>
      </div>
      <div className="card">
        <div className="label">Arrivée</div>
        <p>{logement.arrivee}</p>
      </div>
      <div className="card">
        <div className="label">Départ</div>
        <p>{logement.depart}</p>
      </div>

      {logement.recommandations && logement.recommandations.length > 0 && (
        <>
          <h2>Nos recommandations</h2>
          {logement.recommandations.map((r) => (
            <div className="reco" key={r.nom}>
              <div className="nom">{r.nom}</div>
              <p>{r.description}</p>
            </div>
          ))}
        </>
      )}

      <h2>Informations d&apos;arrivée</h2>
      <AccesSensible slug={params.slug} />

      <p className="footer-note">
        {logement.contactUrgence && (
          <>Une question ? Contactez-nous au {logement.contactUrgence}.</>
        )}
      </p>
    </main>
  );
}
