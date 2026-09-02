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
        <div className="product-cover-col">
          {product.cover ? (
            <img src={product.cover} alt={product.title} className="product-cover-img" />
          ) : (
            <div className="product-cover-placeholder">{product.title}</div>
          )}
        </div>
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
          {/* Multi-market buttons */}
          <MarketButtons markets={product.markets} />
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
        <span className="product-cta-text">Available now on Amazon</span>
        <MarketButtonsCompact markets={product.markets} />
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
                <p className="product-also-price">{p.markets[0]?.price_kindle || p.price_kindle}</p>
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
        <div className="product-cover-col">
          {product.cover ? (
            <img src={product.cover} alt={product.title} className="product-cover-img" />
          ) : (
            <div className="product-cover-placeholder">{product.title}</div>
          )}
        </div>
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
          {/* Multi-market buttons */}
          <MarketButtons markets={product.markets} />
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
          <span className="product-cta-sub">Available now on Amazon</span>
        </div>
        <MarketButtonsCompact markets={product.markets} />
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
                <p className="product-also-price">{p.markets[0]?.price_kindle || p.price_kindle}</p>
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

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Book',
    name: product.title,
    description: product.excerpt || '',
    author: {
      '@type': 'Person',
      name: 'Adrian Phoenix Vale',
    },
    bookFormat: 'https://schema.org/EBook',
    numberOfPages: product.pages || undefined,
    inLanguage: product.language || lang,
    image: product.cover ? `https://solutionsdirectespro.com${product.cover}` : undefined,
    url: productUrl,
    offers: firstMarket ? {
      '@type': 'Offer',
      price: (firstMarket.price_kindle || '').replace(/[^0-9.]/g, ''),
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: firstMarket.kindle_link || firstMarket.amazon_link || '',
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
