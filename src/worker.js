// Ce fichier tourne côté serveur (jamais visible par le voyageur).
// Il gère :
//  - la vérification du code d'accès d'un logement (API /api/acces)
//  - le reste : sert normalement les pages du site (Next.js)

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === '/api/acces' && request.method === 'POST') {
      return handleAcces(request, env);
    }

    // Toute autre requête : on sert les pages statiques du site normalement.
    return env.ASSETS.fetch(request);
  },
};

async function handleAcces(request, env) {
  let body;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: 'Requête invalide.' }, 400);
  }

  const slug = String(body.slug || '').trim();
  const code = String(body.code || '').trim();

  if (!slug || !code) {
    return jsonResponse({ error: 'Merci de renseigner le code.' }, 400);
  }

  const raw = await env.LOGEMENTS_SECRETS.get(slug);
  if (!raw) {
    return jsonResponse({ error: 'Code incorrect.' }, 401);
  }

  let data;
  try {
    data = JSON.parse(raw);
  } catch {
    return jsonResponse({ error: 'Erreur de configuration.' }, 500);
  }

  const bonCode = String(data.code || '').trim().toUpperCase();
  if (code.toUpperCase() !== bonCode) {
    return jsonResponse({ error: 'Code incorrect.' }, 401);
  }

  const { code: _omis, ...infos } = data;
  return jsonResponse({ ok: true, infos });
}

function jsonResponse(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
