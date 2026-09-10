import Link from 'next/link';
import { languages } from '../../../../lib/config';
import { getProduct, getAllProductPaths, getProducts } from '../../../../lib/boutique';

const marketLabels = {
  US: '🇺🇸 Amazon US',
  AU: '🇦🇺 Amazon Australia',
  CA: '🇨🇦 Amazon Canada',
  UK: '🇬🇧 Amazon UK',
  FR: '🇫🇷 Amazon France',
  DE: '🇩🇪 Amazon Deutschland',
  ES: '🇪🇸 Amazon España',
  IT: '🇮🇹 Amazon Italia',
  BR: '🇧🇷 Amazon Brasil',
  PT: '🇵🇹 Amazon Portugal',
  NL: '🇳🇱 Amazon Nederland',
  SE: '🇸🇪 Amazon Sverige',
  PL: '🇵🇱 Amazon Polska',
  DK: '🇩🇰 Amazon Danmark',
  FI: '🇫🇮 Amazon Suomi',
  MX: '🇲🇽 Amazon México',
  JP: '🇯🇵 Amazon Japan',
  IN: '🇮🇳 Amazon India',
};

/* ── Gumroad button (product-level, not market-level) ── */
function GumroadButton({ link, price }) {
  if (!link || link === '#') return null;
  return (
    <div className="product-market-buttons">
      <div className="product-market-row">
        <span className="product-market-label">🛍️ Gumroad</span>
        <div className="product-market-links">
          <a href={link} target="_blank" rel="noopener noreferrer" className="btn-gumroad btn-gumroad-sm">
            🛒 {price ? `Buy ${price}` : 'Buy now'}
          </a>
        </div>
      </div>
    </div>
  );
}

function GumroadButtonCompact({ link, price }) {
  if (!link || link === '#') return null;
  return (
    <div className="product-cta-markets">
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
        <span style={{ fontSize: '0.85rem', minWidth: '140px' }}>🛍️ Gumroad</span>
        <a href={link} target="_blank" rel="noopener noreferrer" className="btn-gumroad">🛒 Buy</a>
      </div>
    </div>
  );
}

/* ── Google Play button ── */
function GooglePlayButton({ link, price }) {
  if (!link || link === '#') return null;
  return (
    <div className="product-market-buttons">
      <div className="product-market-row">
        <span className="product-market-label">▶️ Google Play</span>
        <div className="product-market-links">
          <a href={link} target="_blank" rel="noopener noreferrer" className="btn-google btn-google-sm">
            📖 {price ? `Buy ${price}` : 'Buy now'}
          </a>
        </div>
      </div>
    </div>
  );
}

function GooglePlayButtonCompact({ link, price }) {
  if (!link || link === '#') return null;
  return (
    <div className="product-cta-markets">
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
        <span style={{ fontSize: '0.85rem', minWidth: '140px' }}>▶️ Google Play</span>
        <a href={link} target="_blank" rel="noopener noreferrer" className="btn-google">📖 Buy</a>
      </div>
    </div>
  );
}

/* ── Cover display: Kindle main + optional paperback ── */
function ProductCovers({ product }) {
  return (
    <div className="product-cover-col">
      {product.cover ? (
        <img src={product.cover} alt={product.title} className="product-cover-img" />
      ) : (
        <div className="product-cover-placeholder">{product.title}</div>
      )}
      {product.cover_paperback && (
        <div className="product-cover-alt">
          <img src={product.cover_paperback} alt={`${product.title} — Paperback`} className="product-cover-alt-img" />
          <span className="product-cover-alt-label">📖 Paperback edition</span>
        </div>
      )}
    </div>
  );
}

/* ── Amazon market buttons (unchanged) ── */
function MarketButtons({ markets }) {
  if (!markets || markets.length === 0) return null;

  return (
    <div className="product-market-buttons">
      {markets.map((m) => (
        <div key={m.id} className="product-market-row">
          <span className="product-market-label">{marketLabels[m.id] || m.id}</span>
          <div className="product-market-links">
            {m.amazon_link && m.amazon_link !== '#' && (
              <a href={m.amazon_link} target="_blank" rel="noopener noreferrer" className="btn-amazon btn-amazon-sm">
                🛒 {m.price_paperback ? `Paperback ${m.price_paperback}` : 'Paperback'}
              </a>
            )}
            {m.kindle_link && m.kindle_link !== '#' && (
              <a href={m.kindle_link} target="_blank" rel="noopener noreferrer" className="btn-kindle btn-kindle-sm">
                📱 {m.price_kindle ? `Kindle ${m.price_kindle}` : 'Kindle'}
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function MarketButtonsCompact({ markets }) {
  if (!markets || markets.length === 0) return null;

  return (
    <div className="product-cta-markets">
      {markets.map((m) => (
        <div key={m.id} style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.85rem', minWidth: '140px' }}>{marketLabels[m.id] || m.id}</span>
          {m.amazon_link && m.amazon_link !== '#' && (
            <a href={m.amazon_link} target="_blank" rel="noopener noreferrer" className="btn-amazon">🛒 Buy</a>
          )}
          {m.kindle_link && m.kindle_link !== '#' && (
            <a href={m.kindle_link} target="_blank" rel="noopener noreferrer" className="btn-kindle">📱 Kindle</a>
          )}
        </div>
      ))}
    </div>
  );
}

/* ── Helper: is this a Gumroad product? ── */
function isGumroad(product) {
  return !!(product.gumroad_link && product.gumroad_link !== '#');
}

/* ── Helper: is this a Google Play product? ── */
function isGooglePlay(product) {
  return !!(product.google_play_link && product.google_play_link !== '#');
}

/* ── Helper: get display price for "Also by" section ── */
function getDisplayPrice(p) {
  if (isGumroad(p)) return p.price_gumroad;
  if (isGooglePlay(p)) return p.price_google;
  return p.markets[0]?.price_kindle || p.price_kindle;
}

/* ── Helper: get platform label ── */
function getPlatformLabel(product) {
  if (isGumroad(product)) return 'Available now on Gumroad';
  if (isGooglePlay(product)) return 'Available now on Google Play';
  return 'Available now on Amazon';
}

/* ── Buy buttons wrapper: picks Gumroad, Google Play, or Amazon automatically ── */
function BuyButtons({ product }) {
  if (isGumroad(product)) {
    return <GumroadButton link={product.gumroad_link} price={product.price_gumroad} />;
  }
  if (isGooglePlay(product)) {
    return <GooglePlayButton link={product.google_play_link} price={product.price_google} />;
  }
  return <MarketButtons markets={product.markets} />;
}

function BuyButtonsCompact({ product }) {
  if (isGumroad(product)) {
    return <GumroadButtonCompact link={product.gumroad_link} price={product.price_gumroad} />;
  }
  if (isGooglePlay(product)) {
    return <GooglePlayButtonCompact link={product.google_play_link} price={product.price_google} />;
  }
  return <MarketButtonsCompact markets={product.markets} />;
}

export function generateStaticParams() {
  return getAllProductPaths();
}

export function generateMetadata({ params }) {
  const product = getProduct(params.lang, params.slug);
  if (!product) return { title: 'Boutique — Solutions Directes Pro' };
  return {
    title: `${product.title} — Solutions Directes Pro`,
    description: product.excerpt || '',
  };
}

function RomanLayout({ product, otherProducts }) {
  

  return (
    <>
      {/* HERO */}
      <div className="product-hero">
        <ProductCovers product={product} />
        <div className="product-info-col">
          {product.genre && <span className="product-badge">📖 {product.genre}</span>}
          <h1 className="product-title">{product.title}</h1>
          <p className="product-author">Adrian Phoenix Vale</p>
          {product.excerpt && <p className="product-hook">{product.excerpt}</p>}
          <div className="product-features">
            {product.pages && <span className="product-feat">📄 {product.pages} pages</span>}
            {product.language && <span className="product-feat">🌐 {product.language}</span>}
            {product.genre && <span className="product-feat">⭐ {product.genre}</span>}
          </div>
          {/* Buy buttons — Gumroad or Amazon */}
          <BuyButtons product={product} />
        </div>
      </div>

      {/* DESCRIPTION */}
      <div className="product-divider" />
      <div className="product-description">
        <h2>Description</h2>
        <div dangerouslySetInnerHTML={{ __html: product.html }} />
      </div>

      {/* BOTTOM CTA */}
      <div className="product-cta-bottom">
        <span className="product-cta-text">{getPlatformLabel(product)}</span>
        <BuyButtonsCompact product={product} />
      </div>

      {/* ALSO BY */}
      {otherProducts.length > 0 && (
        <div className="product-also">
          <h2>Also by Adrian Phoenix Vale</h2>
          <div className="product-also-grid">
            {otherProducts.slice(0, 3).map((p) => (
              <Link key={p.slug} href={`/boutique/${product.lang}/${p.slug}`} className="product-also-card">
                {p.cover ? (
                  <img src={p.cover} alt={p.title} className="product-also-cover" />
                ) : (
                  <div className="product-also-placeholder">{p.title}</div>
                )}
                <p className="product-also-name">{p.title}</p>
                <p className="product-also-price">{getDisplayPrice(p)}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

function NonfictionLayout({ product, otherProducts }) {
  

  return (
    <>
      {/* HERO */}
      <div className="product-hero">
        <ProductCovers product={product} />
        <div className="product-info-col">
          {product.genre && <span className="product-badge product-badge-nf">📘 {product.genre}</span>}
          <h1 className="product-title">{product.title}</h1>
          <p className="product-author">Adrian Phoenix Vale</p>
          {product.excerpt && <p className="product-hook">{product.excerpt}</p>}

          {/* What you'll learn box */}
          {product.learn && (
            <div className="product-learn-box">
              <p className="product-learn-title">💡 What you'll learn</p>
              <p className="product-learn-text">{product.learn}</p>
            </div>
          )}

          <div className="product-features">
            {product.pages && <span className="product-feat">📄 {product.pages} pages</span>}
            {product.language && <span className="product-feat">🌐 {product.language}</span>}
            <span className="product-feat">✅ Actionable exercises</span>
          </div>
          {/* Buy buttons — Gumroad or Amazon */}
          <BuyButtons product={product} />
        </div>
      </div>

      <div className="product-divider" />

      {/* BENEFITS */}
      {product.benefits && product.benefits.length > 0 && (
        <div className="product-benefits-section">
          <h2>What's inside</h2>
          <div className="product-benefits-grid">
            {product.benefits.map((b, i) => (
              <div key={i} className="product-benefit-card">
                <p className="product-benefit-title">{b.title}</p>
                <p className="product-benefit-desc">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* DESCRIPTION */}
      <div className="product-description">
        <h2>Description</h2>
        <div dangerouslySetInnerHTML={{ __html: product.html }} />
      </div>

      {/* TABLE OF CONTENTS */}
      {product.toc && product.toc.length > 0 && (
        <div className="product-toc">
          <h2>Table of contents</h2>
          <ul className="product-toc-list">
            {product.toc.map((item, i) => (
              <li key={i}>
                <span className="product-toc-num">{String(i + 1).padStart(2, '0')}</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* FOR YOU */}
      {product.for_you && product.for_you.length > 0 && (
        <div className="product-foryou">
          <h2>This book is for you if</h2>
          <ul className="product-foryou-list">
            {product.for_you.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      {/* BOTTOM CTA */}
      <div className="product-cta-bottom product-cta-dark">
        <div>
          <span className="product-cta-text">Ready to transform your life?</span>
          <span className="product-cta-sub">{getPlatformLabel(product)}</span>
        </div>
        <BuyButtonsCompact product={product} />
      </div>

      {/* ALSO BY */}
      {otherProducts.length > 0 && (
        <div className="product-also">
          <h2>Also by Adrian Phoenix Vale</h2>
          <div className="product-also-grid">
            {otherProducts.slice(0, 3).map((p) => (
              <Link key={p.slug} href={`/boutique/${product.lang}/${p.slug}`} className="product-also-card">
                {p.cover ? (
                  <img src={p.cover} alt={p.title} className="product-also-cover" />
                ) : (
                  <div className="product-also-placeholder">{p.title}</div>
                )}
                <p className="product-also-name">{p.title}</p>
                <p className="product-also-price">{getDisplayPrice(p)}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default function ProductPage({ params }) {
  const { lang, slug } = params;
  const langConfig = languages[lang];
  const product = getProduct(lang, slug);

  if (!product || !langConfig) {
    return (
      <div className="article-page">
        <h1>Product not found</h1>
        <p><Link href="/">← Back</Link></p>
      </div>
    );
  }

  const otherProducts = getProducts(lang).filter(p => p.slug !== slug);

  const productUrl = `https://solutionsdirectespro.com/boutique/${lang}/${slug}`;
  const firstMarket = product.markets && product.markets[0];
  const gumroad = isGumroad(product);
  const googlePlay = isGooglePlay(product);
  const isExternalProduct = gumroad || googlePlay;

  /* ── Schema.org JSON-LD — adapts to Gumroad, Google Play, or Amazon ── */
  const offerUrl = gumroad ? product.gumroad_link
    : googlePlay ? product.google_play_link
    : (firstMarket?.kindle_link || firstMarket?.amazon_link || '');
  const offerPrice = gumroad ? (product.price_gumroad || '')
    : googlePlay ? (product.price_google || '')
    : (firstMarket?.price_kindle || '');

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': (gumroad ? 'Product' : 'Book'),
    name: product.title,
    description: product.excerpt || '',
    author: {
      '@type': 'Person',
      name: 'Adrian Phoenix Vale',
    },
    ...(gumroad ? {} : { bookFormat: 'https://schema.org/EBook' }),
    numberOfPages: product.pages || undefined,
    inLanguage: product.language || lang,
    image: product.cover ? `https://solutionsdirectespro.com${product.cover}` : undefined,
    url: productUrl,
    offers: (offerUrl && offerPrice) ? {
      '@type': 'Offer',
      price: offerPrice.replace(/[^0-9.]/g, ''),
      priceCurrency: googlePlay ? 'CAD' : 'USD',
      availability: 'https://schema.org/InStock',
      url: offerUrl,
    } : undefined,
  };

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Accueil',
        item: 'https://solutionsdirectespro.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: `Boutique (${lang.toUpperCase()})`,
        item: `https://solutionsdirectespro.com/boutique/${lang}`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: product.title,
        item: productUrl,
      },
    ],
  };

  return (
    <div className="product-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <Link href={`/boutique/${lang}`} className="article-back">
        ← Back to bookshop
      </Link>
      {product.type === 'nonfiction' ? (
        <NonfictionLayout product={product} otherProducts={otherProducts} />
      ) : (
        <RomanLayout product={product} otherProducts={otherProducts} />
      )}
    </div>
  );
}
