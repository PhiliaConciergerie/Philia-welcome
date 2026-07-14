import './globals.css';

export const metadata = {
  title: "Livret d'accueil — Philia Conciergerie",
  description: "Livret d'accueil numérique pour les logements gérés par Philia Conciergerie.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        />
        <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
      </head>
      <body>{children}</body>
    </html>
  );
}
