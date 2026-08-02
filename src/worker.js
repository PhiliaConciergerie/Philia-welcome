<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Générateur de logement — Philia Conciergerie</title>
<style>
  :root {
    --ink: #23261f; --paper: #f7f5ee; --panel: #ffffff; --line: #ded9c7;
    --clay: #a8623f; --clay-dark: #8a4e32; --moss: #556b4f; --muted: #7a7666;
  }
  * { box-sizing: border-box; }
  body { margin: 0; background: var(--paper); color: var(--ink); font-family: Georgia, serif; -webkit-font-smoothing: antialiased; }
  .wrap { max-width: 960px; margin: 0 auto; padding: 40px 24px 80px; }
  header { border-bottom: 1px solid var(--line); padding-bottom: 20px; margin-bottom: 28px; }
  .eyebrow { font-family: -apple-system, sans-serif; text-transform: uppercase; letter-spacing: 0.14em; font-size: 11px; color: var(--clay); font-weight: 600; margin-bottom: 8px; }
  h1 { font-size: 28px; margin: 0 0 6px; font-weight: 400; }
  .sub { font-family: -apple-system, sans-serif; color: var(--muted); font-size: 14px; line-height: 1.5; max-width: 70ch; }
  .part-title { font-family: -apple-system, sans-serif; font-size: 15px; font-weight: 700; margin: 40px 0 4px; padding-top: 16px; border-top: 2px solid var(--line); }
  .part-sub { font-family: -apple-system, sans-serif; color: var(--muted); font-size: 13px; margin-bottom: 16px; }
  .part-sub.protected { color: var(--clay-dark); }
  .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; }
  @media (max-width: 760px) { .grid { grid-template-columns: 1fr; } }
  .field { margin-bottom: 14px; }
  .field.full { grid-column: 1 / -1; }
  label { display: block; font-family: -apple-system, sans-serif; font-size: 12.5px; font-weight: 600; margin-bottom: 5px; }
  label .hint { font-weight: 400; color: var(--muted); }
  input, textarea { width: 100%; padding: 9px 11px; border: 1px solid var(--line); border-radius: 4px; background: var(--panel); font-family: -apple-system, sans-serif; font-size: 14px; color: var(--ink); }
  input:focus, textarea:focus { outline: none; border-color: var(--clay); box-shadow: 0 0 0 3px rgba(168,98,63,0.12); }
  textarea { resize: vertical; min-height: 60px; }
  .list-block { border: 1px solid var(--line); border-radius: 6px; padding: 12px; background: var(--panel); margin-bottom: 6px; }
  .list-block textarea { min-height: 80px; }
  .list-hint { font-family: -apple-system, sans-serif; font-size: 12px; color: var(--muted); margin-top: 4px; }
  .output-panel { margin-top: 30px; border: 1px solid var(--line); border-radius: 8px; background: var(--panel); overflow: hidden; }
  .output-header { display: flex; justify-content: space-between; align-items: center; padding: 12px 18px; border-bottom: 1px solid var(--line); background: #fbfaf5; }
  .output-header h2 { font-size: 14px; font-weight: 700; margin: 0; font-family: -apple-system, sans-serif; text-transform: uppercase; letter-spacing: 0.06em; color: var(--moss); }
  button.copy { font-family: -apple-system, sans-serif; font-size: 12.5px; font-weight: 600; background: var(--clay); color: #fff; border: none; padding: 8px 14px; border-radius: 5px; cursor: pointer; }
  button.copy:hover { background: var(--clay-dark); }
  button.copy.copied { background: var(--moss); }
  pre#outData, pre#outKV { margin: 0; padding: 18px; white-space: pre-wrap; word-break: break-word; font-family: 'SF Mono', Consolas, monospace; font-size: 12.5px; line-height: 1.6; color: var(--ink); }
  .note { margin-top: 14px; font-family: -apple-system, sans-serif; font-size: 12.5px; color: var(--muted); line-height: 1.6; border-left: 3px solid var(--clay); padding-left: 12px; }
  .kv-key { font-family: -apple-system, sans-serif; font-size: 12.5px; color: var(--muted); padding: 10px 18px 0; }
  .error-msg { color: var(--clay-dark); font-family: -apple-system, sans-serif; font-size: 13px; margin-top: 8px; }
  .file-row { display: flex; gap: 8px; align-items: center; margin-bottom: 6px; }
  .file-row input[type=text] { flex: 1; }
  .file-row .ext { font-family: -apple-system, sans-serif; font-size: 12px; color: var(--muted); white-space: nowrap; }
  .upload-zone { border: 1px dashed var(--line); border-radius: 6px; padding: 12px; background: var(--panel); }
  .upload-zone input[type=file] { font-family: -apple-system, sans-serif; font-size: 13px; }
</style>
</head>
<body>
<div class="wrap">
  <header>
    <div class="eyebrow">Philia Conciergerie · Générateur</div>
    <h1>Ajouter un nouveau logement</h1>
    <p class="sub">Remplissez ce formulaire, déposez vos photos, puis cliquez sur "Publier en ligne" — tout se met à jour automatiquement sur le site, y compris les photos.</p>
  </header>

  <div class="field full">
    <label>Identifiant du logement <span class="hint">(sans espace ni accent — devient l'adresse du livret)</span></label>
    <input id="slug" placeholder="ex. capitole-2">
  </div>

  <div class="part-title">1. Contenu public</div>
  <div class="part-sub">Visible par tout le monde, sans code.</div>

  <div class="grid">
    <div>
      <div class="field"><label>Nom du logement</label><input id="nom" placeholder="ex. Le Capitole"></div>
      <div class="field">
        <label>Adresse</label>
        <input id="adresse" placeholder="Adresse complète">
        <div class="list-hint" id="geoStatus" style="margin-top:6px;">
          <button type="button" id="geocoder" style="font-family:-apple-system,sans-serif;font-size:12px;background:none;border:1px solid var(--line);border-radius:4px;padding:4px 8px;cursor:pointer;color:var(--clay-dark);">Localiser cette adresse sur la carte</button>
        </div>
      </div>
      <div class="field"><label>Description</label><textarea id="description" placeholder="Une ou deux phrases de présentation"></textarea></div>
      <div class="field"><label>Arrivée</label><input id="arrivee" placeholder="ex. à partir de 16h00"></div>
      <div class="field"><label>Départ</label><input id="depart" placeholder="ex. avant 11h00"></div>
      <div class="field"><label>Contact urgence</label><input id="contactUrgence" placeholder="06 00 00 00 00"></div>
      <div class="field"><label>Poubelles et tri</label><textarea id="poubelles" placeholder="Emplacement, jours de collecte, consignes de tri"></textarea></div>
    </div>

    <div>
      <div class="field">
        <label>Photos d'accueil <span class="hint">(déposez vos fichiers, renommage automatique)</span></label>
        <div class="upload-zone">
          <input type="file" id="filesAccueil" multiple accept="image/*">
          <div id="listeAccueil" style="margin-top:8px;"></div>
        </div>
      </div>
      <div class="field">
        <label>Règles de la maison <span class="hint">(une par ligne)</span></label>
        <div class="list-block"><textarea id="regles" placeholder="Non-fumeur&#10;Calme après 22h"></textarea></div>
      </div>
      <div class="field">
        <label>Recommandations <span class="hint">(une par ligne : Nom — description)</span></label>
        <div class="list-block"><textarea id="recommandations" placeholder="Boulangerie du coin — croissants frais, 3 min à pied"></textarea></div>
      </div>
      <div class="field">
        <label>Photos de la ville <span class="hint">(déposez vos fichiers)</span></label>
        <div class="upload-zone">
          <input type="file" id="filesVille" multiple accept="image/*">
          <div id="listeVille" style="margin-top:8px;"></div>
        </div>
      </div>
      <div class="field">
        <label>Check-out <span class="hint">(une étape par ligne)</span></label>
        <div class="list-block"><textarea id="checkout" placeholder="Déposer les clés dans la boîte&#10;Sortir les poubelles"></textarea></div>
      </div>
      <div class="field">
        <label>Notre boutique <span class="hint">(une par ligne : Nom — description — prix, laissez vide si pas prêt)</span></label>
        <div class="list-block"><textarea id="boutique" placeholder="Petit-déjeuner livré — croissants et jus frais — 15€"></textarea></div>
      </div>
      <div class="field"><label>Info urgence locale <span class="hint">(optionnel)</span></label><textarea id="urgencesInfo" placeholder="Hôpital le plus proche : ..."></textarea></div>
      <div class="field">
        <label>Avis voyageurs <span class="hint">(une par ligne : Nom — note sur 5 — commentaire)</span></label>
        <div class="list-block"><textarea id="avis" placeholder="Camille — 5 — Séjour parfait, très bien situé"></textarea></div>
      </div>
      <div class="field">
        <label>FAQ <span class="hint">(une par ligne : Question — Réponse)</span></label>
        <div class="list-block"><textarea id="faq" placeholder="Puis-je fumer ? — Non, le logement est non-fumeur"></textarea></div>
      </div>
    </div>
  </div>

  <div class="part-title">2. Contenu protégé par code</div>
  <div class="part-sub protected">Affiché uniquement après saisie du bon code par le voyageur (équipements, accès, wifi).</div>

  <div class="grid">
    <div>
      <div class="field">
        <label>Code d'accès au livret</label>
        <div style="display:flex; gap:8px;">
          <input id="codeVerif" placeholder="ex. AB72XP" style="flex:1;">
          <button type="button" id="genCode" style="font-family:-apple-system,sans-serif;font-size:12px;background:none;border:1px solid var(--line);border-radius:4px;padding:0 10px;cursor:pointer;color:var(--clay-dark);white-space:nowrap;">Générer</button>
        </div>
      </div>
      <div class="field"><label>Nom du réseau wifi</label><input id="wifiNom" placeholder="ex. Logement_Capitole"></div>
      <div class="field"><label>Mot de passe wifi</label><input id="wifiMdp" placeholder="ex. bienvenue2026"></div>
      <div class="field">
        <label>Instructions d'accès</label>
        <textarea id="accesDescription" placeholder="Sonnez à l'interphone, 2e porte à gauche. Boîte à clés sous l'escalier, code 4821."></textarea>
      </div>
      <div class="field">
        <label>Photos d'accès <span class="hint">(dont la boîte à clés — protégées, visibles seulement après le code)</span></label>
        <div class="upload-zone">
          <input type="file" id="filesAcces" multiple accept="image/*">
          <div id="listeAcces" style="margin-top:8px;"></div>
        </div>
      </div>
    </div>
    <div>
      <div class="field">
        <label>Équipements <span class="hint">(un par ligne : Nom — description)</span></label>
        <div class="list-block"><textarea id="equipements" placeholder="Cafetière Nespresso — capsules dans le tiroir&#10;Lave-linge — sous l'évier"></textarea></div>
      </div>
    </div>
  </div>

  <div class="part-title">3. Publier</div>
  <div class="part-sub">Publie directement le logement et ses photos sur le site — aucune manipulation sur GitHub nécessaire.</div>

  <div class="field">
    <label>Mot de passe administrateur</label>
    <input type="password" id="motDePasseAdmin" placeholder="Mot de passe de publication">
  </div>

  <button type="button" id="publier" style="font-family:-apple-system,sans-serif;font-weight:600;background:var(--clay);color:#fff;border:none;padding:12px 22px;border-radius:6px;cursor:pointer;font-size:14px;">Publier en ligne</button>

  <div id="resultatPublication" style="margin-top:16px;"></div>

  <div class="output-panel" style="margin-top:36px;">
    <div class="output-header">
      <h2>Sauvegarde manuelle — data/logements.json (public)</h2>
      <button class="copy" id="copyData">Copier</button>
    </div>
    <pre id="outData"></pre>
  </div>

  <div class="output-panel">
    <div class="output-header">
      <h2>Sauvegarde manuelle — coffre-fort KV (protégée)</h2>
      <button class="copy" id="copyKV">Copier la valeur</button>
    </div>
    <div class="kv-key">Key : <strong id="kvKeyDisplay">—</strong></div>
    <pre id="outKV"></pre>
  </div>

  <p class="note">Le bouton "Publier en ligne" envoie d'abord les photos déposées ci-dessus, puis publie le logement. Les blocs de sauvegarde manuelle ne contiennent que le texte — pas les photos, qui ne s'envoient que via le bouton "Publier en ligne".</p>
</div>

<script>
  const ids = ['slug','nom','adresse','description','arrivee','depart','contactUrgence','poubelles',
    'regles','recommandations','checkout','boutique','urgencesInfo','avis','faq',
    'codeVerif','wifiNom','wifiMdp','accesDescription','equipements','motDePasseAdmin'];
  const el = {};
  ids.forEach(id => el[id] = document.getElementById(id));

  function lines(id) { return el[id].value.split('\n').map(s => s.trim()).filter(Boolean); }
  function pairLines(id) {
    return lines(id).map(line => {
      const [nom, ...rest] = line.split('—');
      return { nom: (nom || '').trim(), description: rest.join('—').trim() };
    });
  }
  function tripleLines(id) {
    return lines(id).map(line => {
      const parts = line.split('—').map(p => p.trim());
      return { nom: parts[0] || '', description: parts[1] || '', extra: parts[2] || '' };
    });
  }
  function slugify(str) {
    return String(str).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-+|-+$)/g, '');
  }

  const store = { accueil: [], ville: [], acces: [] };

  function guessLabel(filename) {
    return filename.replace(/\.[^.]+$/, '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
  }

  function renderListe(zone, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = store[zone].map((item, i) => {
      const ext = item.file.name.split('.').pop().toLowerCase();
      return `<div class="file-row">
        <input type="text" data-zone="${zone}" data-idx="${i}" class="label-input" value="${item.label}">
        <span class="ext">.${ext}</span>
      </div>`;
    }).join('');
    container.querySelectorAll('.label-input').forEach(inp => {
      inp.addEventListener('input', (e) => {
        const zone = e.target.dataset.zone;
        const idx = parseInt(e.target.dataset.idx, 10);
        store[zone][idx].label = e.target.value;
      });
    });
  }

  function wireFileInput(inputId, zone, containerId) {
    document.getElementById(inputId).addEventListener('change', (e) => {
      const files = Array.from(e.target.files);
      store[zone] = files.map(f => ({ file: f, label: guessLabel(f.name) }));
      renderListe(zone, containerId);
    });
  }
  wireFileInput('filesAccueil', 'accueil', 'listeAccueil');
  wireFileInput('filesVille', 'ville', 'listeVille');
  wireFileInput('filesAcces', 'acces', 'listeAcces');

  function fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result.split(',')[1]);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  async function envoyerPhotos(zone, slug, nomSlug, motDePasse) {
    const items = store[zone];
    const paths = [];
    for (const item of items) {
      const ext = item.file.name.split('.').pop().toLowerCase();
      const filename = `${slugify(item.label)}-${nomSlug}.${ext}`;
      const contentBase64 = await fileToBase64(item.file);
      const res = await fetch('/api/admin/uploader-photo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ motDePasseAdmin: motDePasse, slug, filename, contentBase64 }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || ('Échec envoi photo ' + item.file.name));
      paths.push(data.path);
    }
    return paths;
  }

  document.getElementById('genCode').addEventListener('click', () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    for (let i = 0; i < 6; i++) { code += chars[Math.floor(Math.random() * chars.length)]; }
    el.codeVerif.value = code;
    generate();
  });

  let currentLat = null;
  let currentLng = null;
  document.getElementById('geocoder').addEventListener('click', async () => {
    const btn = document.getElementById('geocoder');
    const adresse = el.adresse.value.trim();
    if (!adresse) { alert('Renseignez d\'abord une adresse.'); return; }
    btn.textContent = 'Recherche...';
    try {
      const res = await fetch('https://nominatim.openstreetmap.org/search?format=json&limit=1&q=' + encodeURIComponent(adresse));
      const results = await res.json();
      if (results && results.length > 0) {
        currentLat = parseFloat(results[0].lat);
        currentLng = parseFloat(results[0].lon);
        btn.textContent = 'Adresse localisée ✓ (' + currentLat.toFixed(4) + ', ' + currentLng.toFixed(4) + ')';
      } else {
        btn.textContent = 'Adresse introuvable, réessayez';
        currentLat = null; currentLng = null;
      }
    } catch { btn.textContent = 'Erreur, réessayez'; }
    generate();
  });

  let lastPublicObj = null, lastSecretObj = null, lastSlug = '';

  function generate() {
    const slug = el.slug.value.trim() || 'identifiant-logement';
    const regles = lines('regles');
    const reco = pairLines('recommandations');
    const checkout = lines('checkout');
    const boutique = tripleLines('boutique').map(b => ({ nom: b.nom, description: b.description, prix: b.extra }));
    const avis = tripleLines('avis').map(a => ({ nom: a.nom, note: parseInt(a.description, 10) || 5, commentaire: a.extra }));
    const faq = pairLines('faq').map(f => ({ question: f.nom, reponse: f.description }));
    const equipements = pairLines('equipements');

    const publicObj = {
      nom: el.nom.value.trim(), adresse: el.adresse.value.trim(), description: el.description.value.trim(),
      arrivee: el.arrivee.value.trim(), depart: el.depart.value.trim(), lat: currentLat, lng: currentLng,
      photosAccueil: (lastPublicObj && lastPublicObj.photosAccueil) || [],
      reglesMaison: regles, poubelles: el.poubelles.value.trim(), recommandations: reco,
      photosVille: (lastPublicObj && lastPublicObj.photosVille) || [],
      checkout, boutique, contactUrgence: el.contactUrgence.value.trim(),
      urgencesInfo: el.urgencesInfo.value.trim(), avis, faq,
    };
    const secretObj = {
      code: el.codeVerif.value.trim(), wifiNom: el.wifiNom.value.trim(), wifiMotDePasse: el.wifiMdp.value.trim(),
      accesDescription: el.accesDescription.value.trim(),
      accesPhotos: (lastSecretObj && lastSecretObj.accesPhotos) || [],
      equipements,
    };
    lastPublicObj = publicObj; lastSecretObj = secretObj; lastSlug = slug;
    document.getElementById('outData').textContent = `"${slug}": ${JSON.stringify(publicObj, null, 2)}`;
    document.getElementById('outKV').textContent = JSON.stringify(secretObj);
    document.getElementById('kvKeyDisplay').textContent = slug;
  }

  document.getElementById('publier').addEventListener('click', async () => {
    const btn = document.getElementById('publier');
    const resultat = document.getElementById('resultatPublication');
    const motDePasse = el.motDePasseAdmin.value.trim();
    if (!motDePasse) { resultat.innerHTML = '<div class="error-msg">Merci de renseigner le mot de passe administrateur.</div>'; return; }
    if (!lastSlug || lastSlug === 'identifiant-logement') { resultat.innerHTML = '<div class="error-msg">Merci de renseigner un identifiant.</div>'; return; }

    const slug = lastSlug;
    const nomSlug = slugify(el.nom.value) || slug;
    btn.disabled = true;
    resultat.innerHTML = '';

    try {
      if (store.accueil.length || store.ville.length || store.acces.length) {
        btn.textContent = 'Envoi des photos...';
      }
      if (store.accueil.length) lastPublicObj.photosAccueil = await envoyerPhotos('accueil', slug, nomSlug, motDePasse);
      if (store.ville.length) lastPublicObj.photosVille = await envoyerPhotos('ville', slug, nomSlug, motDePasse);
      if (store.acces.length) lastSecretObj.accesPhotos = await envoyerPhotos('acces', slug, nomSlug, motDePasse);

      btn.textContent = 'Publication en cours...';
      const res = await fetch('/api/admin/ajouter-logement', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ motDePasseAdmin: motDePasse, slug, public: lastPublicObj, secret: lastSecretObj }),
      });
      const data = await res.json();
      if (!res.ok) {
        resultat.innerHTML = '<div class="error-msg">' + (data.error || 'Échec de la publication.') + '</div>';
      } else {
        resultat.innerHTML = '<div class="list-block" style="display:flex; gap:8px; align-items:center;"><input readonly value="' + data.url + '" style="flex:1;" id="lienPublie"><button type="button" class="copy" id="copierLien">Copier le lien</button></div><div class="list-hint">Comptez 1 à 2 minutes avant que le lien soit actif.</div>';
        document.getElementById('copierLien').addEventListener('click', () => {
          navigator.clipboard.writeText(data.url);
          const b = document.getElementById('copierLien');
          b.textContent = 'Copié ✓';
          setTimeout(() => { b.textContent = 'Copier le lien'; }, 1600);
        });
      }
    } catch (err) {
      resultat.innerHTML = '<div class="error-msg">' + (err.message || 'Erreur lors de la publication.') + '</div>';
    }
    btn.textContent = 'Publier en ligne';
    btn.disabled = false;
  });

  ids.forEach(id => el[id].addEventListener('input', generate));
  function wireCopy(btnId, targetId) {
    document.getElementById(btnId).addEventListener('click', () => {
      const btn = document.getElementById(btnId);
      navigator.clipboard.writeText(document.getElementById(targetId).textContent).then(() => {
        const original = btn.textContent;
        btn.textContent = 'Copié ✓'; btn.classList.add('copied');
        setTimeout(() => { btn.textContent = original; btn.classList.remove('copied'); }, 1600);
      });
    });
  }
  wireCopy('copyData', 'outData');
  wireCopy('copyKV', 'outKV');
  generate();
</script>
</body>
</html>
