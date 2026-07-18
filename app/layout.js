import fs from 'fs';
import path from 'path';
import './globals.css';

export const metadata = {
  title: "Livret d'accueil — Philia Conciergerie",
  description: "Livret d'accueil numérique pour les logements gérés par Philia Conciergerie.",
};

export default function RootLayout({ children }) {
  const logoExists = fs.existsSync(path.join(process.cwd(), 'public', 'logo.png'));

  return (
    <html lang="fr">
      <head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        />
        <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
      </head>
      <body>
        {logoExists && (
          <header className="site-header">
            <a href="/">
              <img src="/logo.png" alt="Philia Conciergerie" />
            </a>
          </header>
        )}
        {children}
      </body>
    </html>
  );
}
