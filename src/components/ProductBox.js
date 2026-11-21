// ============================================================
// ProductBox — Encadré produit visuel pour articles SEO
// ============================================================
// Usage dans un article page :
//   <ProductBox product={product} lang="en" />
//
// Le composant affiche : couverture, titre, auteur, prix,
// badges (pages, langue, genre), excerpt, boutons d'achat.
// Adapté automatiquement à Amazon, Google Play, Gumroad, Etsy.
// ============================================================

import Link from 'next/link';

const platformConfig = {
  etsy: { label: 'Etsy', icon: '🧡', btnClass: 'pbox-btn-etsy' },
  gumroad: { label: 'Gumroad', icon: '🛍️', btnClass: 'pbox-btn-gumroad' },
  google_play: { label: 'Google Play', icon: '▶️', btnClass: 'pbox-btn-google' },
  amazon_kindle: { label: 'Kindle', icon: '📱', btnClass: 'pbox-btn-kindle' },
  amazon_paperback: { label: '', icon: '🛒', btnClass: 'pbox-btn-amazon' },
};

const buyLabels = {
  en: 'Buy', fr: 'Acheter', de: 'Kaufen', es: 'Comprar', it: 'Acquista',
  pt: 'Comprar', nl: 'Kopen', sv: 'Köp', da: 'Køb', pl: 'Kup',
  fi: 'Osta', ja: '購入', hi: 'खरीदें', id: 'Beli', vi: 'Mua',
  ms: 'Beli', ro: 'Cumpără', el: 'Αγορά', cs: 'Koupit', is: 'Kaupa',
};

const discoverLabels = {
  en: 'Discover this book', fr: 'Découvrir ce livre', de: 'Dieses Buch entdecken',
  es: 'Descubrir este libro', it: 'Scopri questo libro', pt: 'Descubra este livro',
  nl: 'Ontdek dit boek', sv: 'Upptäck denna bok', da: 'Opdag denne bog',
  pl: 'Odkryj tę książkę', fi: 'Tutustu tähän kirjaan', ja: 'この本を見る',
  hi: 'इस किताब को देखें', id: 'Temukan buku ini', vi: 'Khám phá cuốn sách này',
  ms: 'Terokai buku ini', ro: 'Descoperă această carte', el: 'Ανακαλύψτε αυτό το βιβλίο',
  cs: 'Objevte tuto knihu', is: 'Uppgötvaðu þessa bók',
};

const byLabels = {
  en: 'by', fr: 'par', de: 'von', es: 'por', it: 'di',
  pt: 'por', nl: 'door', sv: 'av', da: 'af', pl: 'autor:',
  fi: 'kirjoittanut', ja: '著者：', hi: 'लेखक:', id: 'oleh',
  vi: 'tác giả:', ms: 'oleh', ro: 'de', el: 'από', cs: 'autor:',
  is: 'eftir',
};

function getPlatform(product) {
  if (product.etsy_link && product.etsy_link !== '#') return 'etsy';
  if (product.gumroad_link && product.gumroad_link !== '#') return 'gumroad';
  if (product.google_play_link && product.google_play_link !== '#') return 'google_play';
  return 'amazon';
}

function getMainLink(product) {
  if (product.etsy_link && product.etsy_link !== '#') return product.etsy_link;
  if (product.gumroad_link && product.gumroad_link !== '#') return product.gumroad_link;
  if (product.google_play_link && product.google_play_link !== '#') return product.google_play_link;
  const m = product.markets && product.markets[0];
  return m?.kindle_link || m?.amazon_link || product.kindle_link || product.amazon_link || '#';
}

function getMainPrice(product) {
  if (product.etsy_link && product.etsy_link !== '#') return product.price_etsy;
  if (product.gumroad_link && product.gumroad_link !== '#') return product.price_gumroad;
  if (product.google_play_link && product.google_play_link !== '#') return product.price_google;
  const m = product.markets && product.markets[0];
  return m?.price_kindle || product.price_kindle || '';
}

export default function ProductBox({ product, lang = 'en', variant = 'full' }) {
  if (!product) return null;

  const platform = getPlatform(product);
  const mainLink = getMainLink(product);
  const mainPrice = getMainPrice(product);
  const buyLabel = buyLabels[lang] || buyLabels.en;
  const discoverLabel = discoverLabels[lang] || discoverLabels.en;
  const byLabel = byLabels[lang] || byLabels.en;
  const boutiqueUrl = `/boutique/${product.lang || lang}/${product.slug}`;

  if (variant === 'compact') {
    return (
      <div className="pbox pbox-compact">
        <Link href={boutiqueUrl} className="pbox-compact-link">
          {product.cover && (
            <img src={product.cover} alt={product.title} className="pbox-cover-compact" />
          )}
          <div className="pbox-compact-info">
            <span className="pbox-compact-title">{product.title}</span>
            <span className="pbox-compact-author">{byLabel} Adrian Phoenix Vale</span>
            {mainPrice && <span className="pbox-compact-price">{mainPrice}</span>}
          </div>
        </Link>
        <a href={mainLink} target="_blank" rel="noopener noreferrer" className={`pbox-btn ${platformConfig[platform === 'amazon' ? 'amazon_kindle' : platform]?.btnClass || 'pbox-btn-kindle'}`}>
          {platformConfig[platform === 'amazon' ? 'amazon_kindle' : platform]?.icon || '📱'} {buyLabel}
        </a>
      </div>
    );
  }

  // Full variant
  return (
    <div className="pbox">
      <div className="pbox-inner">
        {/* Cover */}
        <div className="pbox-cover-col">
          <Link href={boutiqueUrl}>
            {product.cover ? (
              <img src={product.cover} alt={product.title} className="pbox-cover" />
            ) : (
              <div className="pbox-cover-placeholder">{product.title}</div>
            )}
          </Link>
        </div>

        {/* Info */}
        <div className="pbox-info-col">
          <Link href={boutiqueUrl} className="pbox-title-link">
            <h4 className="pbox-title">{product.title}</h4>
          </Link>
          <p className="pbox-author">{byLabel} Adrian Phoenix Vale</p>

          {/* Badges */}
          <div className="pbox-badges">
            {product.genre && <span className="pbox-badge">{product.type === 'nonfiction' ? '📘' : '📖'} {product.genre}</span>}
            {product.pages && product.pages !== '0' && <span className="pbox-badge">📄 {product.pages} pages</span>}
            {product.language && <span className="pbox-badge">🌐 {product.language}</span>}
          </div>

          {/* Excerpt */}
          {product.excerpt && (
            <p className="pbox-excerpt">{product.excerpt.length > 200 ? product.excerpt.substring(0, 200) + '...' : product.excerpt}</p>
          )}

          {/* Price + Buttons */}
          <div className="pbox-actions">
            {/* Main buy button */}
            <a href={mainLink} target="_blank" rel="noopener noreferrer" className={`pbox-btn pbox-btn-primary ${platformConfig[platform === 'amazon' ? 'amazon_kindle' : platform]?.btnClass || 'pbox-btn-kindle'}`}>
              {platformConfig[platform === 'amazon' ? 'amazon_kindle' : platform]?.icon || '📱'} {buyLabel} {mainPrice && `— ${mainPrice}`}
            </a>

            {/* Secondary: paperback if Amazon */}
            {platform === 'amazon' && product.markets && product.markets[0]?.amazon_link && product.markets[0].amazon_link !== '#' && product.markets[0]?.price_paperback && (
              <a href={product.markets[0].amazon_link} target="_blank" rel="noopener noreferrer" className="pbox-btn pbox-btn-secondary pbox-btn-amazon">
                🛒 {product.markets[0].price_paperback}
              </a>
            )}

            {/* Boutique page link */}
            <Link href={boutiqueUrl} className="pbox-btn pbox-btn-outline">
              {discoverLabel} →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
