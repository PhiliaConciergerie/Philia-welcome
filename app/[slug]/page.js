import { logements } from '../../data/logements';
import { notFound } from 'next/navigation';
import AccesSensible from './AccesSensible';
import CartePlan from './CartePlan';
import HeroCarousel from './HeroCarousel';

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
    <>
      <div className="wrap">
        <HeroCarousel photos={logement.photosAccueil} nom={logement.nom} adresse={logement.adresse} />

        <div className="quick-info">
          <div className="quick-card">
            <div className="quick-label">Arrivée</div>
            <div className="quick-value">{logement.arrivee}</div>
          </div>
          <div className="quick-card">
            <div className="quick-label">Départ</div>
            <div className="quick-value">{logement.depart}</div>
          </div>
        </div>

        <section className="section" id="sec-welcome">
          <div className="section-head">
            <h2 className="section-title">Bienvenue</h2>
          </div>
          <div className="text-card">
            <p>{logement.description}</p>
          </div>
        </section>

        <AccesSensible slug={params.slug} />

        {logement.reglesMaison && logement.reglesMaison.length > 0 && (
          <section className="section" id="sec-regles">
            <div className="section-head">
              <h2 className="section-title">Règles de la maison</h2>
            </div>
            <div className="text-card">
              <ul className="rules-list">
                {logement.reglesMaison.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {logement.poubelles && (
          <section className="section" id="sec-poubelles">
            <div className="section-head">
              <h2 className="section-title">Poubelles et tri</h2>
            </div>
            <div className="text-card">
              <p>{logement.poubelles}</p>
            </div>
          </section>
        )}

        {logement.lat && logement.lng && (
          <section className="section" id="sec-carte">
            <div className="section-head">
              <h2 className="section-title">Autour du logement</h2>
            </div>
            <CartePlan lat={logement.lat} lng={logement.lng} nom={logement.nom} />
          </section>
        )}

        {logement.recommandations && logement.recommandations.length > 0 && (
          <section className="section" id="sec-reco">
            <div className="section-head">
              <h2 className="section-title">Nos recommandations</h2>
              <span className="section-sub">Faites glisser →</span>
            </div>
            <div className="carousel">
              {logement.recommandations.map((r) => (
                <div className="carousel-item" key={r.nom}>
                  <div className="pt-card">
                    <div className="pt-body" style={{ paddingTop: 22 }}>
                      <div className="pt-title">{r.nom}</div>
                      <div className="pt-text">{r.description}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {logement.photosVille && logement.photosVille.length > 0 && (
          <section className="section" id="sec-ville">
            <div className="section-head">
              <h2 className="section-title">Autour de vous</h2>
              <span className="section-sub">Faites glisser →</span>
            </div>
            <div className="carousel">
              {logement.photosVille.map((src) => (
                <div className="carousel-item" key={src}>
                  <div className="pt-card">
                    <div className="pt-img">
                      <img src={src} alt="La ville et ses environs" loading="lazy" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {logement.checkout && logement.checkout.length > 0 && (
          <section className="section" id="sec-checkout">
            <div className="section-head">
              <h2 className="section-title">Avant de partir</h2>
            </div>
            <div className="text-card">
              <div className="steps">
                {logement.checkout.map((etape, i) => (
                  <div className="step" key={etape}>
                    <div className="step-num">{i + 1}</div>
                    <div className="step-text">{etape}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="section" id="sec-boutique">
          <div className="section-head">
            <h2 className="section-title">Petite attention</h2>
          </div>
          {logement.boutique && logement.boutique.length > 0 ? (
            <div className="carousel">
              {logement.boutique.map((p) => (
                <div className="carousel-item" key={p.nom}>
                  <div className="pt-card">
                    <div className="pt-body" style={{ paddingTop: 22 }}>
                      <div className="pt-title">{p.nom}</div>
                      <div className="pt-text">{p.description}</div>
                      {p.prix && <div className="pt-meta">{p.prix}</div>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="boutique-teaser">
              <h3>Bientôt disponible</h3>
              <p>Petites attentions et extras arrivent très bientôt.</p>
            </div>
          )}
        </section>

        {logement.avis && logement.avis.length > 0 && (
          <section className="section" id="sec-avis">
            <div className="section-head">
              <h2 className="section-title">Ils ont adoré</h2>
              <span className="section-sub">Faites glisser →</span>
            </div>
            <div className="carousel">
              {logement.avis.map((a) => (
                <div className="carousel-item" key={a.nom}>
                  <div className="pt-card">
                    <div className="pt-body" style={{ paddingTop: 22 }}>
                      <div className="pt-title">{a.nom}</div>
                      <div className="review-stars">
                        {'★'.repeat(a.note)}
                        {'☆'.repeat(5 - a.note)}
                      </div>
                      <div className="pt-text">{a.commentaire}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {logement.faq && logement.faq.length > 0 && (
          <section className="section" id="sec-faq">
            <div className="section-head">
              <h2 className="section-title">Questions fréquentes</h2>
            </div>
            <div className="text-card">
              {logement.faq.map((f) => (
                <details className="faq-item" key={f.question}>
                  <summary className="faq-q">{f.question}</summary>
                  <div className="faq-a">{f.reponse}</div>
                </details>
              ))}
            </div>
          </section>
        )}

        <section className="section" id="sec-urgence">
          <div className="emergency">
            <div className="emergency-title">Urgences</div>
            {logement.contactUrgence && <div className="emergency-phone">{logement.contactUrgence}</div>}
            <div className="emergency-info">
              Police : 17 · Pompiers : 18 · SAMU : 15 · Urgence Europe : 112 · Médecin de garde : 3966
              {logement.urgencesInfo && (
                <>
                  <br />
                  {logement.urgencesInfo}
                </>
              )}
            </div>
          </div>
        </section>

        <div className="footer">
          Avec soin par <strong>Philia Conciergerie</strong>
          <br />
          Bon séjour ✨
        </div>
      </div>

      <nav className="float-nav">
        <a href="#sec-welcome">Accueil</a>
        <a href="#lockZone">Accès</a>
        <a href="#sec-reco">Sortir</a>
        <a href="#sec-checkout">Départ</a>
        <a href="#sec-urgence">Aide</a>
      </nav>
    </>
  );
}
