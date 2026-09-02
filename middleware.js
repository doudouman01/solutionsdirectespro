import { NextResponse } from 'next/server';

// ============================================================
// MIDDLEWARE — Solutions Directes Pro
// ============================================================
// 1. Redirige le .vercel.app vers le domaine principal (301)
// 2. Renvoie 410 (Gone) pour toutes les anciennes URLs mortes
// ============================================================

// Liste complète des anciennes URLs flat (ancien site)
const GONE_SLUGS = new Set([
  // --- ANCIENNES PAGES ARTICLES (flat URLs) ---
  // Français
  'dompter-la-colere',
  'jeunes-mamans-fr',
  'addictions-et-dependances-fr',
  'remedes-naturels-du-quotidien',
  'mini-collections-emotionnelles',
  'lepuisement-invisible',
  'reprogrammer-son-esprit-guide-scientifique-fr',
  'sante-bien-etre-francais',
  'romans-litterature-francais',
  'e-books-francais',
  'medecine-naturelle-fr',
  'addiction-au-sucre-cerveau-fr',
  'boissons-de-noel-sans-stress',
  'boissons-de-noel-de-derniere-minute',
  'arreter-sans-volonte',
  'chutes-chez-les-seniors',
  'respiration-abdominale-calmer-systeme-nerveux',
  'inflammation-silencieuse',
  'seniors-60-ans',
  'developpement-personnel',
  'surcharge-mentale',
  'fatigue-mentale-femme-que-faire',
  'articles-fr',
  'solutions-concretes-domaines',
  'articles-internationaux',
  'solutions-quotidiennes-a-propos',
  'entrepreneuriat',
  'resources-ebooks-articles',

  // Anglais
  'why-you-feel-unsteady-after-60',
  'abdominal-breathing',
  'overloaded',
  'essential-everyday-natural-remedies-en',
  'first-time-single-mother-en',
  'preventing-falls-after-60',
  'english-articles-en',
  'functional-exhaustion',
  'chronic-exhaustion',
  'insulin-resistance-metabolic-fatigue-glp-1',
  'first-time-mom-at-35',
  'natural-medicine-en',
  'why-you-feel-mentally-exhausted-all-the-time',
  'personal-development-english',
  'young-mothers-an',
  'seniors-60-english-usa-canada-uk-australia',
  'digital-product-business-and-global-ecommerce',
  'guide-to-payhip',
  'articles-and-guides-multilingues',

  // Allemand
  'nervensystem-beruhigen',
  'erschopft-ohne-diagnose',
  'erschopfung-ohne-diagnose',
  'deutsche-gesundheit-and-wohlbefinden',
  'deutsche-literatur-and-romane',
  'deutsche-artikel',
  'naturheilkunde-de',
  'personlichkeitsentwicklung-deutsch',
  'gesunde-gewohnheiten-statt-sucht-de',
  'unverzichtbare-naturliche-heilmittel-20252026-de',
  'sturze-im-alter-vermeiden',
  'wut-kontrollieren',
  'finanzen',
  'senioren-60-deutschland-schweiz-belgien-osterreich-niederlande',
  'raus-aus-der-mentalen-uberlastung',
  'warum-kann-ich-nicht-abschalten',
  'sucht-und-abhaengigkeit',

  // Espagnol
  'por-que-pierdes-el-equilibrio-despues-de-los-60',
  'salud-bienestar-espanol',
  'novelas-literatura-espanol',
  'articulos-es',
  'prevenir-caidas-despues-de-los-60',
  'remedios-naturales-efectivos-es',
  'respiracion-abdominal',
  'ebooks-en-espanol',
  'ansiedad-cansancio-y-niebla-mental',
  'por-que-estoy-cansada-si-no-hago-nada',

  // Portugais
  'por-que-voce-comeca-a-perder-o-equilibrio-depois-dos-60-anos',
  'cansaco-feminino-depois-dos-40',
  'romances-e-literatura-portugues',
  'burnout-no-trabalho',
  'por-que-estou-cansada-mentalmente-o-tempo-todo',
  'desenvolvimento-pessoal-portugues',
  '60-ativo-and-saudavel-portugues',
  'saude-e-bem-estar-portugues',
  'prevencao-de-quedas-apos-os-60',
  'respiracao-abdominal',
  'por-que-estou-sempre-cansado',

  // Italien
  'prevenire-le-cadute-dopo-i-60-anni',
  'articoli-in-italiano',
  'over-60-italiano',
  'salute-e-benessere-it',
  'ebook-letteratura-italiana',
  'respirazione-addominale',
  'la-grande-illusione-mediterranea',
  'perche-inizi-a-perdere-equilibrio-dopo-i-60-anni',

  // Néerlandais
  'waarom-ben-ik-altijd-moe',
  'gezondheid-and-welzijn-nederlands',
  'literatuur-and-romans-nederlands',
  'senioren-60-nederlands-nederland-belgie',
  'nederlandse-e-books',
  'praktische-nederlandse-artikelen-and-gidsen',
  'vallen-voorkomen-na-je-60e',
  'waarom-ben-ik-altijd-moe-zelfs-na-8-uur-slaap',
  'mentale-vermoeidheid',
  'hoe-darmflora-herstellen-natuurlijk',

  // Suédois
  'halsa-och-valbefinnande-se',
  'personlig-utveckling-bocker-svenska',
  'litteratur-och-romaner-svenska',
  'svenska-e-bocker-suedois',
  'seniorer-60-sverige',

  // Danois
  'personlig-udvikling-dansk',
  'abdominal-vejrtraekning',
  'forebyg-fald-efter-60',
  'naturlig-forstehjaelp-derhjemme',
  'seniorer-60-danmark',
  'sundhed-og-velvaere-dk',
  'viden-og-guides-pa-dansk',

  // Polonais
  'polskie-powiesci-polski',
  'polskie-e-booki',
  'seniorzy-60-polski',
  'oddychanie-przeponowe',
  'rozwoj-osobisty',
  'zdrowie-i-dobrostan',

  // Finnois
  'talous-suomi',

  // Tchèque
  'finance-a-nezavislost-cestina-cz',
  'e-knihy-v-cestine',
  'zdravi-a-pohoda-cz',
  'prevence-padu-po-60-roce',

  // Roumain
  'seniori-60-romania',
  'cheltuieli-medicale-in-romania-cnas-2026',
  'prevenirea-caderilor-dupa-60-de-ani',
  'respiratia-abdominala',
  'sanatate-si-bunastare-ro',

  // Indonésien
  'kesehatan-dan-kesejahteraan-id',
  'menenangkan-sistem-saraf-secara-alami',
  'sastra-dan-novel-indonesia',
  'lansia-60-indonesia',
  'pengembangan-diri-indonesia',
  'mencegah-jatuh-setelah-usia-60-tahun',
  'bangsa-yang-diprogram-kecanduan-gula',
  'artikel-id',

  // Vietnamien
  'phong-ngua-te-nga-cho-nguoi-cao-tuoi',
  'sach-djien-tu-tieng-viet',
  'van-hoc-and-tieu-thuyet-tieng-viet',
  'phat-trien-ca-nhan-vietnam',
  'suc-khoe-va-hanh-phuc-viet',
  'nguoi-cao-tuoi-60-viet',
  'bai-viet-bang-tieng-viet',
  'kiet-suc-trong-xa-hoi-viet-nam',

  // Malais
  'ebook-bahasa-melayu',
  'kesihatan-dan-kesejahteraan-ms',
  '60-bahasa-melayu',
  'sastera-dan-novel-melayu-',

  // Grec
  'oikonomika-ebooks-ellhnika',
  'ugeia-kai-euexia-ellinika',
  'anw-twn-60-ellinika',
  'ar8ra-sta-ellhnika',

  // --- URLs CASSÉES (domaine collé dans le slug) ---
  'httpssolutionsdirectesprocomdesarrollo-personal-espanol',
  'httpssolutionsdirectesprocompersoonlijke-ontwikkeling-nederlands',
  'httpssolutionsdirectesprocomsviluppo-personale-italiano',
  'httpssolutionsdirectesprocomhealth-wellness-en',
  'httpssolutionsdirectesprocom60-mayores-activos-salud-espanol',
]);

export function middleware(request) {
  const { pathname, hostname } = request.nextUrl;

  // ─── 1. Redirection .vercel.app → domaine principal ───
  if (hostname.endsWith('.vercel.app')) {
    const url = new URL(pathname, 'https://solutionsdirectespro.com');
    url.search = request.nextUrl.search;
    return NextResponse.redirect(url, 301);
  }

  // ─── 2. Retourner 410 Gone pour les anciennes URLs ───
  const slug = pathname.startsWith('/') ? pathname.slice(1) : pathname;

  if (slug && GONE_SLUGS.has(slug)) {
    return new NextResponse(
      `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="robots" content="noindex">
  <title>Page supprimée</title>
</head>
<body>
  <h1>410 — Cette page n'existe plus</h1>
  <p>Le contenu a été déplacé. <a href="/">Retour à l'accueil</a></p>
</body>
</html>`,
      {
        status: 410,
        headers: { 'Content-Type': 'text/html; charset=utf-8' },
      }
    );
  }

  return NextResponse.next();
}

// Ne pas intercepter les fichiers statiques, images, API, etc.
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|covers|images|api|robots.txt|sitemap.xml).*)',
  ],
};
