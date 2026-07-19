// Ce fichier tourne côté serveur (jamais visible par le voyageur).
// Il gère :
//  - la vérification du code d'accès d'un logement (API /api/acces)
//  - la publication automatique d'un logement (API /api/admin/ajouter-logement)
//  - le reste : sert normalement les pages du site (Next.js)

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === '/api/acces' && request.method === 'POST') {
      return handleAcces(request, env);
    }

    if (url.pathname === '/api/admin/ajouter-logement' && request.method === 'POST') {
      return handleAjouterLogement(request, env);
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

const GITHUB_OWNER = 'PhiliaConciergerie';
const GITHUB_REPO = 'Philia-welcome';
const DATA_FILE_PATH = 'data/logements.json';

function b64EncodeUtf8(str) {
  return btoa(unescape(encodeURIComponent(str)));
}

function b64DecodeUtf8(str) {
  return decodeURIComponent(escape(atob(str.replace(/\n/g, ''))));
}

async function handleAjouterLogement(request, env) {
  let body;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: 'Requête invalide.' }, 400);
  }

  if (!env.ADMIN_PASSWORD || body.motDePasseAdmin !== env.ADMIN_PASSWORD) {
    return jsonResponse({ error: 'Mot de passe administrateur incorrect.' }, 401);
  }

  const slug = String(body.slug || '').trim();
  if (!slug) {
    return jsonResponse({ error: 'Identifiant de logement manquant.' }, 400);
  }
  if (!env.GITHUB_TOKEN) {
    return jsonResponse({ error: 'Publication non configurée (jeton GitHub manquant).' }, 500);
  }

  const publicData = body.public || {};
  const secretData = body.secret || {};

  const githubHeaders = {
    Authorization: `Bearer ${env.GITHUB_TOKEN}`,
    'User-Agent': 'philia-welcome-admin',
    Accept: 'application/vnd.github+json',
  };

  try {
    const getRes = await fetch(
      `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${DATA_FILE_PATH}`,
      { headers: githubHeaders }
    );
    if (!getRes.ok) {
      const errText = await getRes.text();
      return jsonResponse({ error: `Impossible de lire logements.json (${getRes.status}) : ${errText}` }, 502);
    }
    const getData = await getRes.json();
    const currentContent = JSON.parse(b64DecodeUtf8(getData.content));

    currentContent[slug] = publicData;

    const newContentB64 = b64EncodeUtf8(JSON.stringify(currentContent, null, 2));
    const putRes = await fetch(
      `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${DATA_FILE_PATH}`,
      {
        method: 'PUT',
        headers: githubHeaders,
        body: JSON.stringify({
          message: `Ajout/mise à jour du logement "${slug}" via le générateur`,
          content: newContentB64,
          sha: getData.sha,
        }),
      }
    );
    if (!putRes.ok) {
      const errText = await putRes.text();
      return jsonResponse({ error: 'Échec de la publication sur GitHub : ' + errText }, 502);
    }

    if (env.LOGEMENTS_SECRETS) {
      await env.LOGEMENTS_SECRETS.put(slug, JSON.stringify(secretData));
    }

    return jsonResponse({ ok: true, url: `https://livret.philiaconciergerie.fr/${slug}` });
  } catch (e) {
    return jsonResponse({ error: 'Erreur inattendue lors de la publication.' }, 500);
  }
}
