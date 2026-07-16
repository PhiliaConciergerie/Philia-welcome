import CartePlan from './CartePlan';
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

      {logement.photosAccueil && logement.photosAccueil.length > 0 && (
        <div className="photos">
          {logement.photosAccueil.map((src) => (
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

      <h2>Informations d&apos;arrivée</h2>
      <AccesSensible slug={params.slug} />

      {logement.reglesMaison && logement.reglesMaison.length > 0 && (
        <>
          <h2>Règles de la maison</h2>
          <div className="card">
            <ul>
              {logement.reglesMaison.map((regle) => (
                <li key={regle}>{regle}</li>
              ))}
            </ul>
          </div>
        </>
      )}

      {logement.poubelles && (
        <>
          <h2>Poubelles et tri</h2>
          <div className="card">
            <p>{logement.poubelles}</p>
          </div>
        </>
      )}

     {logement.lat && logement.lng && (
        <>
          <h2>Autour du logement</h2>
          <CartePlan lat={logement.lat} lng={logement.lng} nom={logement.nom} />
        </>
      )}

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

      {logement.photosVille && logement.photosVille.length > 0 && (
        <>
          <h2>La ville et ses environs</h2>
          <div className="photos">
            {logement.photosVille.map((src) => (
              <img key={src} src={src} alt="La ville et ses environs" />
            ))}
          </div>
        </>
      )}

      {logement.boutique && logement.boutique.length > 0 && (
        <>
          <h2>Notre boutique</h2>
          {logement.boutique.map((p) => (
            <div className="card" key={p.nom}>
              <div className="label">
                {p.nom}
                {p.prix && <> — {p.prix}</>}
              </div>
              <p>{p.description}</p>
            </div>
          ))}
        </>
      )}

      {logement.checkout && logement.checkout.length > 0 && (
        <>
          <h2>Check-out</h2>
          <div className="card">
            <ul>
              {logement.checkout.map((etape) => (
                <li key={etape}>{etape}</li>
              ))}
            </ul>
          </div>
        </>
      )}

      <p className="footer-note">
        {logement.contactUrgence && (
          <>Une question ? Contactez-nous au {logement.contactUrgence}.</>
        )}
      </p>
    </main>
  );
}
