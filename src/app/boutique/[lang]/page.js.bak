import Link from 'next/link';
import { languages, boutiqueCategories } from '../../../lib/config';
import { getProducts, getMarkets } from '../../../lib/boutique';

const marketLabels = {
  US: '🇺🇸 United States',
  AU: '🇦🇺 Australia',
  CA: '🇨🇦 Canada',
  UK: '🇬🇧 United Kingdom',
};

export function generateStaticParams() {
  return Object.keys(languages).map((lang) => ({ lang }));
}

export function generateMetadata({ params }) {
  const lang = languages[params.lang];
  if (!lang) return { title: 'Boutique — Solutions Directes Pro' };
  return { title: `Boutique — ${lang.label} — Solutions Directes Pro` };
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
    products = products.filter(p => p.market === selectedMarket);
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
          {products.map((product) => (
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
                <div className="article-card-meta">
                  <span>
                    {product.price_kindle && `${product.price_kindle} Kindle`}
                    {product.price_kindle && product.price_paperback && ' · '}
                    {product.price_paperback && `${product.price_paperback} Paperback`}
                  </span>
                  <span className="article-card-link">{labels.buy} →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <p>{lang === 'fr' ? 'Aucun livre disponible pour le moment.' : 'No books available yet.'}</p>
        </div>
      )}
    </section>
  );
}
