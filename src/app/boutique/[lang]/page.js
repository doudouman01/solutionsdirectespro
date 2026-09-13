import Link from 'next/link';
import { languages, boutiqueCategories } from '../../../lib/config';
import { getProducts, getMarkets } from '../../../lib/boutique';

const marketLabels = {
  US: '🇺🇸 United States',
  AU: '🇦🇺 Australia',
  CA: '🇨🇦 Canada',
  UK: '🇬🇧 United Kingdom',
  FR: '🇫🇷 France',
  DE: '🇩🇪 Deutschland',
  ES: '🇪🇸 España',
  IT: '🇮🇹 Italia',
  BR: '🇧🇷 Brasil',
  PT: '🇵🇹 Portugal',
  NL: '🇳🇱 Nederland',
  SE: '🇸🇪 Sverige',
  PL: '🇵🇱 Polska',
  DK: '🇩🇰 Danmark',
  FI: '🇫🇮 Suomi',
  MX: '🇲🇽 México',
  JP: '🇯🇵 Japan',
  IN: '🇮🇳 India',
};

const boutiqueDescriptions = {
  fr: 'Decouvrez les livres et ebooks d\'Adrian Phoenix Vale. Romans, guides pratiques et nonfiction disponibles sur Amazon Kindle et en broche.',
  en: 'Browse books and ebooks by Adrian Phoenix Vale. Fiction, nonfiction and practical guides available on Amazon Kindle and in paperback.',
  de: 'Entdecken Sie die Buecher und E-Books von Adrian Phoenix Vale. Romane, Ratgeber und Sachbuecher auf Amazon Kindle und als Taschenbuch.',
  es: 'Descubre los libros y ebooks de Adrian Phoenix Vale. Novelas, guias practicas y no ficcion disponibles en Amazon Kindle y en tapa blanda.',
  it: 'Scopri i libri e gli ebook di Adrian Phoenix Vale. Romanzi, guide pratiche e saggistica disponibili su Amazon Kindle e in brossura.',
  da: 'Udforsk boeger og e-boeger af Adrian Phoenix Vale. Romaner, guides og faglitteratur paa Amazon Kindle og i paperback.',
  nl: 'Ontdek boeken en ebooks van Adrian Phoenix Vale. Romans, praktische gidsen en non-fictie op Amazon Kindle en in paperback.',
  sv: 'Utforska boecker och e-boecker av Adrian Phoenix Vale. Romaner, guider och facklitteratur paa Amazon Kindle och i pocket.',
  pl: 'Odkryj ksiazki i ebooki Adriana Phoenix Vale. Powiesci, poradniki i literatura faktu na Amazon Kindle i w miekkiej okladce.',
  pt: 'Descubra os livros e ebooks de Adrian Phoenix Vale. Romances, guias praticos e nao ficcao disponiveis no Amazon Kindle e em brochura.',
  fi: 'Tutustu Adrian Phoenix Valen kirjoihin ja e-kirjoihin. Romaaneja, oppaita ja tietokirjallisuutta Amazon Kindlessa ja pokkareina.',
  ja: 'Adrian Phoenix Valeの書籍と電子書籍をご覧ください。小説、実用ガイド、ノンフィクションをAmazon Kindleとペーパーバックで。',
  hi: 'Adrian Phoenix Vale की किताबें और ईबुक्स ब्राउज़ करें। उपन्यास, व्यावहारिक गाइड और नॉनफिक्शन Amazon Kindle और पेपरबैक में उपलब्ध।',
  vi: 'Kham pha sach va ebook cua Adrian Phoenix Vale. Tieu thuyet, huong dan thuc hanh va phi hu cau tren Amazon Kindle va ban in.',
  id: 'Jelajahi buku dan ebook karya Adrian Phoenix Vale. Novel, panduan praktis, dan nonfiksi tersedia di Amazon Kindle dan paperback.',
};

export function generateStaticParams() {
  return Object.keys(languages).map((lang) => ({ lang }));
}

export function generateMetadata({ params }) {
  const lang = languages[params.lang];
  if (!lang) return { title: 'Boutique — Solutions Directes Pro' };

  const pageTitle = `Boutique — ${lang.label} — Solutions Directes Pro`;
  const pageDescription = boutiqueDescriptions[params.lang] || boutiqueDescriptions.en;
  const boutiqueUrl = `https://solutionsdirectespro.com/boutique/${params.lang}`;

  return {
    title: pageTitle,
    description: pageDescription,
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: boutiqueUrl,
      siteName: 'Solutions Directes Pro',
      locale: params.lang === 'fr' ? 'fr_FR' : params.lang === 'en' ? 'en_US' : params.lang === 'de' ? 'de_DE' : params.lang === 'es' ? 'es_ES' : params.lang === 'it' ? 'it_IT' : params.lang === 'pt' ? 'pt_PT' : params.lang === 'nl' ? 'nl_NL' : params.lang === 'sv' ? 'sv_SE' : params.lang === 'da' ? 'da_DK' : params.lang === 'pl' ? 'pl_PL' : params.lang === 'fi' ? 'fi_FI' : params.lang === 'ja' ? 'ja_JP' : params.lang === 'hi' ? 'hi_IN' : params.lang === 'vi' ? 'vi_VN' : params.lang === 'id' ? 'id_ID' : 'fr_FR',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: pageDescription,
    },
    alternates: {
      canonical: boutiqueUrl,
    },
  };
}

export default function BoutiqueLangPage({ params, searchParams }) {
  const { lang } = params;
  const langConfig = languages[lang];
  if (!langConfig) {
    return (
      <div className="section">
        <h1 className="section-title">Page non trouvée</h1>
        <p><Link href="/">← Retour</Link></p>
      </div>
    );
  }

  const allProducts = getProducts(lang);
  const markets = getMarkets(lang);
  const selectedMarket = searchParams?.market || null;
  const selectedCategory = searchParams?.category || null;

  // Get categories that have products
  const catLabels = boutiqueCategories[lang] || boutiqueCategories.en || {};
  const activeCats = {};
  for (const p of allProducts) {
    if (p.category && catLabels[p.category]) {
      activeCats[p.category] = (activeCats[p.category] || 0) + 1;
    }
  }

  // Filter products
  let products = allProducts;
  if (selectedMarket) {
    products = products.filter(p => p.markets.some(m => m.id === selectedMarket));
  }
  if (selectedCategory) {
    products = products.filter(p => p.category === selectedCategory);
  }

  const boutiqueLabels = {
    fr: { title: 'Boutique', subtitle: 'Nos livres et ebooks', all: 'Tous', buy: 'Voir le livre' },
    en: { title: 'Bookshop', subtitle: 'Our books and ebooks', all: 'All', buy: 'View book' },
    de: { title: 'Buchhandlung', subtitle: 'Unsere Bücher und E-Books', all: 'Alle', buy: 'Buch ansehen' },
    es: { title: 'Tienda', subtitle: 'Nuestros libros y ebooks', all: 'Todos', buy: 'Ver libro' },
    it: { title: 'Negozio', subtitle: 'I nostri libri ed ebook', all: 'Tutti', buy: 'Vedi libro' },
    da: { title: 'Boghandel', subtitle: 'Vores bøger og e-bøger', all: 'Alle', buy: 'Se bog' },
    nl: { title: 'Boekwinkel', subtitle: 'Onze boeken en ebooks', all: 'Alle', buy: 'Bekijk boek' },
    sv: { title: 'Bokhandel', subtitle: 'Våra böcker och e-böcker', all: 'Alla', buy: 'Visa bok' },
    pl: { title: 'Księgarnia', subtitle: 'Nasze książki i ebooki', all: 'Wszystkie', buy: 'Zobacz książkę' },
    pt: { title: 'Livraria', subtitle: 'Nossos livros e ebooks', all: 'Todos', buy: 'Ver livro' },
    fi: { title: 'Kirjakauppa', subtitle: 'Kirjamme ja e-kirjat', all: 'Kaikki', buy: 'Katso kirja' },
  };
  const labels = boutiqueLabels[lang] || boutiqueLabels.en;

  // Build filter URL helper
  function filterUrl(cat, market) {
    const params = new URLSearchParams();
    if (cat) params.set('category', cat);
    if (market) params.set('market', market);
    const qs = params.toString();
    return `/boutique/${lang}${qs ? '?' + qs : ''}`;
  }

  // Get display price for card (first market's price)
  function getDisplayPrice(product) {
    const first = product.markets[0];
    if (!first) return { kindle: '', paperback: '' };
    return {
      kindle: first.price_kindle || product.price_kindle || '',
      paperback: first.price_paperback || product.price_paperback || '',
    };
  }

  return (
    <section className="section">
      <h1 className="section-title">{langConfig.flag} {labels.title}</h1>
      <p className="section-subtitle">
        {products.length} {lang === 'fr' ? 'livre' : 'book'}{products.length !== 1 ? 's' : ''}
      </p>

      {/* Category filter tabs */}
      {Object.keys(activeCats).length > 0 && (
        <div className="category-tabs">
          <Link
            href={filterUrl(null, selectedMarket)}
            className={`category-tab ${!selectedCategory ? 'active' : ''}`}
          >
            {labels.all} <span className="count">({allProducts.length})</span>
          </Link>
          {Object.entries(activeCats).map(([catSlug, count]) => (
            <Link
              key={catSlug}
              href={filterUrl(catSlug, selectedMarket)}
              className={`category-tab ${selectedCategory === catSlug ? 'active' : ''}`}
            >
              {catLabels[catSlug] || catSlug}
              <span className="count">({count})</span>
            </Link>
          ))}
        </div>
      )}

      {/* Market filter tabs (only if multiple markets) */}
      {markets.length > 1 && (
        <div className="category-tabs" style={{ marginBottom: '32px' }}>
          <Link
            href={filterUrl(selectedCategory, null)}
            className={`category-tab ${!selectedMarket ? 'active' : ''}`}
            style={{ fontSize: '0.78rem' }}
          >
            🌐 {labels.all}
          </Link>
          {markets.map((m) => (
            <Link
              key={m}
              href={filterUrl(selectedCategory, m)}
              className={`category-tab ${selectedMarket === m ? 'active' : ''}`}
              style={{ fontSize: '0.78rem' }}
            >
              {marketLabels[m] || m}
            </Link>
          ))}
        </div>
      )}

      {/* Product grid */}
      {products.length > 0 ? (
        <div className="articles-grid">
          {products.map((product) => {
            const prices = getDisplayPrice(product);
            return (
              <Link
                key={product.slug}
                href={`/boutique/${lang}/${product.slug}`}
                className="article-card"
                style={{ overflow: 'hidden' }}
              >
                {product.cover && (
                  <div style={{
                    width: '100%',
                    height: '280px',
                    background: '#1a1a2e',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                  }}>
                    <img
                      src={product.cover}
                      alt={product.title}
                      style={{
                        maxWidth: '100%',
                        maxHeight: '100%',
                        objectFit: 'contain',
                      }}
                    />
                  </div>
                )}
                <div className="article-card-body">
                  <span className="article-card-category">
                    {product.type === 'nonfiction' ? '📘' : '📖'} {product.genre || product.type}
                  </span>
                  <h3>{product.title}</h3>
                  <p className="article-card-excerpt">{product.excerpt}</p>
                  {/* Market badges */}
                  {product.markets.length > 1 && (
                    <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', marginBottom: '8px' }}>
                      {product.markets.map((m) => (
                        <span key={m.id} style={{
                          fontSize: '0.7rem',
                          padding: '2px 6px',
                          background: '#f0f0f0',
                          borderRadius: '4px',
                          color: '#555',
                        }}>
                          {(marketLabels[m.id] || m.id).split(' ')[0]}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="article-card-meta">
                    <span>
                      {prices.kindle && `${prices.kindle} Kindle`}
                      {prices.kindle && prices.paperback && ' · '}
                      {prices.paperback && `${prices.paperback} Paperback`}
                    </span>
                    <span className="article-card-link">{labels.buy} →</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="empty-state">
          <p>{lang === 'fr' ? 'Aucun livre disponible pour le moment.' : 'No books available yet.'}</p>
        </div>
      )}
    </section>
  );
}
