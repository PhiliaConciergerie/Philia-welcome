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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
        <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
      </head>
      <body>
        <div className="topbar">
          <div className="topbar-brand">
            {logoExists ? (
              <img src="/logo.png" alt="Philia Conciergerie" style={{ height: 22 }} />
            ) : (
              'Philia Conciergerie'
            )}
          </div>
        </div>
        {children}
      </body>
    </html>
  );
}
