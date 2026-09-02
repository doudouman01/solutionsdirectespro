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
    'max-snippet': -1,
    'max-image-preview': 'large',
    'max-video-preview': -1,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
};

// Schema.org JSON-LD pour le site entier
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Solutions Directes Pro',
  url: 'https://solutionsdirectespro.com',
  logo: 'https://solutionsdirectespro.com/logo.png',
  description: 'Plateforme multilingue de guides pratiques et de livres pour résoudre vos problèmes quotidiens.',
  sameAs: [],
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Solutions Directes Pro',
  url: 'https://solutionsdirectespro.com',
  description: 'Des solutions directes, partout dans le monde. Finances, emploi, santé, logement, droit, relations.',
  inLanguage: ['fr', 'en', 'de', 'es', 'it', 'nl', 'sv', 'da', 'pl', 'pt', 'fi', 'ja', 'hi'],
  publisher: {
    '@type': 'Organization',
    name: 'Solutions Directes Pro',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
