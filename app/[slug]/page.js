import { logements } from '../../data/logements';
import { notFound } from 'next/navigation';
import AccesSensible from './AccesSensible';
import CartePlan from './CartePlan';
import Carrousel from './Carrousel';

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

      <Carrousel photos={logement.photosAccueil} nomLogement={logement.nom} />

      <h2>Informations pratiques</h2>
      <div className="card">
        <div className="label">Adresse</div>
        <p>
          
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(logement.adresse)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {logement.adresse}
          </a>
        </p>
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
          <Carrousel photos={logement.photosVille} nomLogement={logement.nom} />
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
            <ul className="checkout-list">
              {logement.checkout.map((etape) => (
                <li key={etape}>{etape}</li>
              ))}
            </ul>
          </div>
        </>
      )}

      <h2>Urgences</h2>
      <div className="card">
        <p>
          <span className="urgence-num">17</span> — Police / Gendarmerie
          <br />
          <span className="urgence-num">18</span> — Pompiers
          <br />
          <span className="urgence-num">15</span> — SAMU (urgences médicales)
          <br />
          <span className="urgence-num">112</span> — Numéro d&apos;urgence européen
          <br />
          <span className="urgence-num">3966</span> — Médecin de garde (nuit et week-end)
        </p>
        {logement.urgencesInfo && <p>{logement.urgencesInfo}</p>}
      </div>

      {logement.avis && logement.avis.length > 0 && (
        <>
          <h2>Avis</h2>
          {logement.avis.map((a) => (
            <div className="card" key={a.nom}>
              <div className="avis-note">{'★'.repeat(a.note)} — {a.nom}</div>
              <p>{a.commentaire}</p>
            </div>
          ))}
        </>
      )}

      {logement.faq && logement.faq.length > 0 && (
        <>
          <h2>Questions fréquentes</h2>
          {logement.faq.map((f) => (
            <details className="faq-item" key={f.question}>
              <summary>{f.question}</summary>
              <p>{f.reponse}</p>
            </details>
          ))}
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
