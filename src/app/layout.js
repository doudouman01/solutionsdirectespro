import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

export const metadata = {
  title: 'Solutions Directes Pro — Des solutions directes, partout dans le monde',
  description: 'Une plateforme multilingue qui vous guide pas à pas pour résoudre vos problèmes. Finances, emploi, santé, logement, droit, relations.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
