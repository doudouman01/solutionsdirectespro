import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import GoogleAnalytics from '../components/GoogleAnalytics';
import { Analytics } from '@vercel/analytics/next';

export const metadata = {
  title: {
    default: 'Solutions Directes Pro — Guides pratiques et livres multilingues',
    template: '%s | Solutions Directes Pro',
  },
  description: 'Guides pratiques, livres et outils pour reprendre le controle. Psychologie, productivite, IA, finances, sante — en 15+ langues.',
  metadataBase: new URL('https://solutionsdirectespro.com'),
  alternates: {
    canonical: './',
  },
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
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7225007611886114"
          crossOrigin="anonymous"
        />
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
        <GoogleAnalytics />
        <Header />
        <main>{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
