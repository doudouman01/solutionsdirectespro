import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Analytics } from '@vercel/analytics/next';

export const metadata = {
  title: 'Solutions Directes Pro — Des solutions directes, partout dans le monde',
  description: 'Une plateforme multilingue qui vous guide pas à pas pour résoudre vos problèmes. Finances, emploi, santé, logement, droit, relations.',
  openGraph: {
    title: 'Solutions Directes Pro',
    description: 'Des solutions directes, partout dans le monde. Finances, emploi, santé, logement, droit, relations.',
    url: 'https://solutionsdirectespro.com',
    siteName: 'Solutions Directes Pro',
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Solutions Directes Pro',
    description: 'Des solutions directes, partout dans le monde. Finances, emploi, santé, logement, droit, relations.',
  },
  metadataBase: new URL('https://solutionsdirectespro.com'),
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        <Header />
        <main>{children}</main>
                <Footer />
        <Analytics />
      </body>
 </html>
  );
}
