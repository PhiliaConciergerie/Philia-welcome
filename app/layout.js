import './globals.css';

export const metadata = {
  title: "Livret d'accueil — Philia Conciergerie",
  description: "Livret d'accueil numérique pour les logements gérés par Philia Conciergerie.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
