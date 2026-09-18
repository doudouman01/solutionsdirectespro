import Link from 'next/link';
import { languages } from '../../../../lib/config';
import { getProduct, getAllProductPaths, getProducts } from '../../../../lib/boutique';

/* ── Translations for boutique product pages ── */
const t = {
  en: { whatLearn: "💡 What you'll learn", exercises: "✅ Actionable exercises", inside: "What's inside", description: "Description", toc: "Table of contents", forYou: "This book is for you if", cta: "Ready to transform your life?", also: "Also by Adrian Phoenix Vale", back: "← Back to bookshop", notFound: "Product not found", buy: "Buy", buyNow: "Buy now", paperback: "Paperback", paperbackEd: "📖 Paperback edition", onAmazon: "Available now on Amazon", onGumroad: "Available now on Gumroad", onGooglePlay: "Available now on Google Play" },
  fr: { whatLearn: "💡 Ce que vous apprendrez", exercises: "✅ Exercices pratiques", inside: "Contenu du livre", description: "Description", toc: "Table des matières", forYou: "Ce livre est pour vous si", cta: "Prêt à transformer votre vie ?", also: "Du même auteur", back: "← Retour à la boutique", notFound: "Produit introuvable", buy: "Acheter", buyNow: "Acheter", paperback: "Broché", paperbackEd: "📖 Édition brochée", onAmazon: "Disponible sur Amazon", onGumroad: "Disponible sur Gumroad", onGooglePlay: "Disponible sur Google Play" },
  de: { whatLearn: "💡 Was Sie lernen werden", exercises: "✅ Praktische Übungen", inside: "Inhalt", description: "Beschreibung", toc: "Inhaltsverzeichnis", forYou: "Dieses Buch ist für Sie, wenn", cta: "Bereit, Ihr Leben zu verändern?", also: "Vom selben Autor", back: "← Zurück zum Shop", notFound: "Produkt nicht gefunden", buy: "Kaufen", buyNow: "Jetzt kaufen", paperback: "Taschenbuch", paperbackEd: "📖 Taschenbuchausgabe", onAmazon: "Jetzt auf Amazon verfügbar", onGumroad: "Jetzt auf Gumroad verfügbar", onGooglePlay: "Jetzt auf Google Play verfügbar" },
  es: { whatLearn: "💡 Lo que aprenderás", exercises: "✅ Ejercicios prácticos", inside: "Contenido del libro", description: "Descripción", toc: "Índice", forYou: "Este libro es para ti si", cta: "¿Listo para transformar tu vida?", also: "Del mismo autor", back: "← Volver a la tienda", notFound: "Producto no encontrado", buy: "Comprar", buyNow: "Comprar ahora", paperback: "Tapa blanda", paperbackEd: "📖 Edición en tapa blanda", onAmazon: "Disponible en Amazon", onGumroad: "Disponible en Gumroad", onGooglePlay: "Disponible en Google Play" },
  it: { whatLearn: "💡 Cosa imparerai", exercises: "✅ Esercizi pratici", inside: "Contenuto del libro", description: "Descrizione", toc: "Indice", forYou: "Questo libro è per te se", cta: "Pronto a trasformare la tua vita?", also: "Dello stesso autore", back: "← Torna alla libreria", notFound: "Prodotto non trovato", buy: "Acquista", buyNow: "Acquista ora", paperback: "Cartaceo", paperbackEd: "📖 Edizione cartacea", onAmazon: "Disponibile su Amazon", onGumroad: "Disponibile su Gumroad", onGooglePlay: "Disponibile su Google Play" },
  pt: { whatLearn: "💡 O que você vai aprender", exercises: "✅ Exercícios práticos", inside: "Conteúdo do livro", description: "Descrição", toc: "Sumário", forYou: "Este livro é para você se", cta: "Pronto para transformar sua vida?", also: "Do mesmo autor", back: "← Voltar à loja", notFound: "Produto não encontrado", buy: "Comprar", buyNow: "Comprar agora", paperback: "Capa comum", paperbackEd: "📖 Edição impressa", onAmazon: "Disponível na Amazon", onGumroad: "Disponível no Gumroad", onGooglePlay: "Disponível no Google Play" },
  nl: { whatLearn: "💡 Wat je zult leren", exercises: "✅ Praktische oefeningen", inside: "Inhoud", description: "Beschrijving", toc: "Inhoudsopgave", forYou: "Dit boek is voor jou als", cta: "Klaar om je leven te veranderen?", also: "Van dezelfde auteur", back: "← Terug naar de winkel", notFound: "Product niet gevonden", buy: "Kopen", buyNow: "Nu kopen", paperback: "Paperback", paperbackEd: "📖 Paperback editie", onAmazon: "Nu verkrijgbaar op Amazon", onGumroad: "Nu verkrijgbaar op Gumroad", onGooglePlay: "Nu verkrijgbaar op Google Play" },
  sv: { whatLearn: "💡 Vad du kommer att lära dig", exercises: "✅ Praktiska övningar", inside: "Innehåll", description: "Beskrivning", toc: "Innehållsförteckning", forYou: "Den här boken är för dig om", cta: "Redo att förändra ditt liv?", also: "Av samma författare", back: "← Tillbaka till butiken", notFound: "Produkten hittades inte", buy: "Köp", buyNow: "Köp nu", paperback: "Pocket", paperbackEd: "📖 Pocketutgåva", onAmazon: "Tillgänglig på Amazon", onGumroad: "Tillgänglig på Gumroad", onGooglePlay: "Tillgänglig på Google Play" },
  da: { whatLearn: "💡 Hvad du vil lære", exercises: "✅ Praktiske øvelser", inside: "Indhold", description: "Beskrivelse", toc: "Indholdsfortegnelse", forYou: "Denne bog er for dig, hvis", cta: "Klar til at forandre dit liv?", also: "Af samme forfatter", back: "← Tilbage til butikken", notFound: "Produkt ikke fundet", buy: "Køb", buyNow: "Køb nu", paperback: "Paperback", paperbackEd: "📖 Paperback udgave", onAmazon: "Tilgængelig på Amazon", onGumroad: "Tilgængelig på Gumroad", onGooglePlay: "Tilgængelig på Google Play" },
  pl: { whatLearn: "💡 Czego się nauczysz", exercises: "✅ Ćwiczenia praktyczne", inside: "Zawartość książki", description: "Opis", toc: "Spis treści", forYou: "Ta książka jest dla Ciebie, jeśli", cta: "Gotowy zmienić swoje życie?", also: "Od tego samego autora", back: "← Powrót do sklepu", notFound: "Produkt nie znaleziony", buy: "Kup", buyNow: "Kup teraz", paperback: "Wersja papierowa", paperbackEd: "📖 Wydanie papierowe", onAmazon: "Dostępne na Amazon", onGumroad: "Dostępne na Gumroad", onGooglePlay: "Dostępne na Google Play" },
  fi: { whatLearn: "💡 Mitä opit", exercises: "✅ Käytännön harjoituksia", inside: "Kirjan sisältö", description: "Kuvaus", toc: "Sisällysluettelo", forYou: "Tämä kirja on sinulle, jos", cta: "Valmis muuttamaan elämäsi?", also: "Samalta kirjailijalta", back: "← Takaisin kauppaan", notFound: "Tuotetta ei löytynyt", buy: "Osta", buyNow: "Osta nyt", paperback: "Nidottu", paperbackEd: "📖 Nidottu painos", onAmazon: "Saatavilla Amazonissa", onGumroad: "Saatavilla Gumroadissa", onGooglePlay: "Saatavilla Google Playssa" },
  ja: { whatLearn: "💡 学べること", exercises: "✅ 実践的なエクササイズ", inside: "本の内容", description: "説明", toc: "目次", forYou: "この本はあなたのために", cta: "人生を変える準備はできましたか？", also: "同じ著者の作品", back: "← ショップに戻る", notFound: "商品が見つかりません", buy: "購入", buyNow: "今すぐ購入", paperback: "ペーパーバック", paperbackEd: "📖 ペーパーバック版", onAmazon: "Amazonで販売中", onGumroad: "Gumroadで販売中", onGooglePlay: "Google Playで販売中" },
  hi: { whatLearn: "💡 आप क्या सीखेंगे", exercises: "✅ व्यावहारिक अभ्यास", inside: "पुस्तक की विषय-वस्तु", description: "विवरण", toc: "विषय सूची", forYou: "यह किताब आपके लिए है अगर", cta: "अपना जीवन बदलने के लिए तैयार?", also: "इसी लेखक की अन्य पुस्तकें", back: "← दुकान पर वापस", notFound: "उत्पाद नहीं मिला", buy: "खरीदें", buyNow: "अभी खरीदें", paperback: "पेपरबैक", paperbackEd: "📖 पेपरबैक संस्करण", onAmazon: "Amazon पर उपलब्ध", onGumroad: "Gumroad पर उपलब्ध", onGooglePlay: "Google Play पर उपलब्ध" },
  id: { whatLearn: "💡 Apa yang akan Anda pelajari", exercises: "✅ Latihan praktis", inside: "Isi buku", description: "Deskripsi", toc: "Daftar isi", forYou: "Buku ini untuk Anda jika", cta: "Siap mengubah hidup Anda?", also: "Dari penulis yang sama", back: "← Kembali ke toko", notFound: "Produk tidak ditemukan", buy: "Beli", buyNow: "Beli sekarang", paperback: "Cetak", paperbackEd: "📖 Edisi cetak", onAmazon: "Tersedia di Amazon", onGumroad: "Tersedia di Gumroad", onGooglePlay: "Tersedia di Google Play" },
  ms: { whatLearn: "💡 Apa yang anda akan pelajari", exercises: "✅ Latihan praktikal", inside: "Kandungan buku", description: "Penerangan", toc: "Isi kandungan", forYou: "Buku ini untuk anda jika", cta: "Bersedia mengubah hidup anda?", also: "Oleh penulis yang sama", back: "← Kembali ke kedai", notFound: "Produk tidak dijumpai", buy: "Beli", buyNow: "Beli sekarang", paperback: "Cetak", paperbackEd: "📖 Edisi cetak", onAmazon: "Didapati di Amazon", onGumroad: "Didapati di Gumroad", onGooglePlay: "Didapati di Google Play" },
  ro: { whatLearn: "💡 Ce vei învăța", exercises: "✅ Exerciții practice", inside: "Conținutul cărții", description: "Descriere", toc: "Cuprins", forYou: "Această carte este pentru tine dacă", cta: "Gata să-ți transformi viața?", also: "De același autor", back: "← Înapoi la magazin", notFound: "Produs negăsit", buy: "Cumpără", buyNow: "Cumpără acum", paperback: "Broșată", paperbackEd: "📖 Ediție broșată", onAmazon: "Disponibil pe Amazon", onGumroad: "Disponibil pe Gumroad", onGooglePlay: "Disponibil pe Google Play" },
  el: { whatLearn: "💡 Τι θα μάθετε", exercises: "✅ Πρακτικές ασκήσεις", inside: "Περιεχόμενο του βιβλίου", description: "Περιγραφή", toc: "Πίνακας περιεχομένων", forYou: "Αυτό το βιβλίο είναι για εσάς αν", cta: "Έτοιμοι να αλλάξετε τη ζωή σας;", also: "Από τον ίδιο συγγραφέα", back: "← Πίσω στο κατάστημα", notFound: "Το προϊόν δεν βρέθηκε", buy: "Αγορά", buyNow: "Αγοράστε τώρα", paperback: "Χαρτόδετο", paperbackEd: "📖 Χαρτόδετη έκδοση", onAmazon: "Διαθέσιμο στο Amazon", onGumroad: "Διαθέσιμο στο Gumroad", onGooglePlay: "Διαθέσιμο στο Google Play" },
  cs: { whatLearn: "💡 Co se naučíte", exercises: "✅ Praktická cvičení", inside: "Obsah knihy", description: "Popis", toc: "Obsah", forYou: "Tato kniha je pro vás, pokud", cta: "Připraveni změnit svůj život?", also: "Od stejného autora", back: "← Zpět do obchodu", notFound: "Produkt nenalezen", buy: "Koupit", buyNow: "Koupit nyní", paperback: "Brožovaná", paperbackEd: "📖 Brožované vydání", onAmazon: "K dispozici na Amazonu", onGumroad: "K dispozici na Gumroad", onGooglePlay: "K dispozici na Google Play" },
  vi: { whatLearn: "💡 Bạn sẽ học được gì", exercises: "✅ Bài tập thực hành", inside: "Nội dung sách", description: "Mô tả", toc: "Mục lục", forYou: "Cuốn sách này dành cho bạn nếu", cta: "Sẵn sàng thay đổi cuộc sống?", also: "Cùng tác giả", back: "← Quay lại cửa hàng", notFound: "Không tìm thấy sản phẩm", buy: "Mua", buyNow: "Mua ngay", paperback: "Bản in", paperbackEd: "📖 Phiên bản in", onAmazon: "Có sẵn trên Amazon", onGumroad: "Có sẵn trên Gumroad", onGooglePlay: "Có sẵn trên Google Play" },
  is: { whatLearn: "💡 Hvað þú munt læra", exercises: "✅ Hagnýtar æfingar", inside: "Innihald bókarinnar", description: "Lýsing", toc: "Efnisyfirlit", forYou: "Þessi bók er fyrir þig ef", cta: "Tilbúin/n að breyta lífi þínu?", also: "Eftir sama höfund", back: "← Til baka í búð", notFound: "Vara fannst ekki", buy: "Kaupa", buyNow: "Kaupa núna", paperback: "Kiljuútgáfa", paperbackEd: "📖 Kiljuútgáfa", onAmazon: "Fáanlegt á Amazon", onGumroad: "Fáanlegt á Gumroad", onGooglePlay: "Fáanlegt á Google Play" },
};

/* Helper: get translation for current lang, fallback to English */
function ui(lang, key) {
  return (t[lang] && t[lang][key]) || t.en[key] || key;
}

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
function GumroadButton({ link, price, lang }) {
  if (!link || link === '#') return null;
  return (
    <div className="product-market-buttons">
      <div className="product-market-row">
        <span className="product-market-label">🛍️ Gumroad</span>
        <div className="product-market-links">
          <a href={link} target="_blank" rel="noopener noreferrer" className="btn-gumroad btn-gumroad-sm">
            🛒 {price ? `${ui(lang, 'buy')} ${price}` : ui(lang, 'buyNow')}
          </a>
        </div>
      </div>
    </div>
  );
}

function GumroadButtonCompact({ link, price, lang }) {
  if (!link || link === '#') return null;
  return (
    <div className="product-cta-markets">
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
        <span style={{ fontSize: '0.85rem', minWidth: '140px' }}>🛍️ Gumroad</span>
        <a href={link} target="_blank" rel="noopener noreferrer" className="btn-gumroad">🛒 {ui(lang, 'buy')}</a>
      </div>
    </div>
  );
}

/* ── Google Play button ── */
function GooglePlayButton({ link, price, lang }) {
  if (!link || link === '#') return null;
  return (
    <div className="product-market-buttons">
      <div className="product-market-row">
        <span className="product-market-label">▶️ Google Play</span>
        <div className="product-market-links">
          <a href={link} target="_blank" rel="noopener noreferrer" className="btn-google btn-google-sm">
            📖 {price ? `${ui(lang, 'buy')} ${price}` : ui(lang, 'buyNow')}
          </a>
        </div>
      </div>
    </div>
  );
}

function GooglePlayButtonCompact({ link, price, lang }) {
  if (!link || link === '#') return null;
  return (
    <div className="product-cta-markets">
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
        <span style={{ fontSize: '0.85rem', minWidth: '140px' }}>▶️ Google Play</span>
        <a href={link} target="_blank" rel="noopener noreferrer" className="btn-google">📖 {ui(lang, 'buy')}</a>
      </div>
    </div>
  );
}

/* ── Cover display: Kindle main + optional paperback ── */
function ProductCovers({ product, lang }) {
  return (
    <div className="product-cover-col">
      {product.cover ? (
        <img src={product.cover} alt={product.title} className="product-cover-img" />
      ) : (
        <div className="product-cover-placeholder">{product.title}</div>
      )}
      {product.cover_paperback && (
        <div className="product-cover-alt">
          <img src={product.cover_paperback} alt={`${product.title} — ${ui(lang, 'paperback')}`} className="product-cover-alt-img" />
          <span className="product-cover-alt-label">{ui(lang, 'paperbackEd')}</span>
        </div>
      )}
    </div>
  );
}

/* ── Amazon market buttons (unchanged) ── */
function MarketButtons({ markets, lang }) {
  if (!markets || markets.length === 0) return null;

  return (
    <div className="product-market-buttons">
      {markets.map((m) => (
        <div key={m.id} className="product-market-row">
          <span className="product-market-label">{marketLabels[m.id] || m.id}</span>
          <div className="product-market-links">
            {m.amazon_link && m.amazon_link !== '#' && (
              <a href={m.amazon_link} target="_blank" rel="noopener noreferrer" className="btn-amazon btn-amazon-sm">
                🛒 {m.price_paperback ? `${ui(lang, 'paperback')} ${m.price_paperback}` : ui(lang, 'paperback')}
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

function MarketButtonsCompact({ markets, lang }) {
  if (!markets || markets.length === 0) return null;

  return (
    <div className="product-cta-markets">
      {markets.map((m) => (
        <div key={m.id} style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.85rem', minWidth: '140px' }}>{marketLabels[m.id] || m.id}</span>
          {m.amazon_link && m.amazon_link !== '#' && (
            <a href={m.amazon_link} target="_blank" rel="noopener noreferrer" className="btn-amazon">🛒 {ui(lang, 'buy')}</a>
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
function getPlatformLabel(product, lang) {
  if (isGumroad(product)) return ui(lang, 'onGumroad');
  if (isGooglePlay(product)) return ui(lang, 'onGooglePlay');
  return ui(lang, 'onAmazon');
}

/* ── Buy buttons wrapper: picks Gumroad, Google Play, or Amazon automatically ── */
function BuyButtons({ product, lang }) {
  if (isGumroad(product)) {
    return <GumroadButton link={product.gumroad_link} price={product.price_gumroad} lang={lang} />;
  }
  if (isGooglePlay(product)) {
    return <GooglePlayButton link={product.google_play_link} price={product.price_google} lang={lang} />;
  }
  return <MarketButtons markets={product.markets} lang={lang} />;
}

function BuyButtonsCompact({ product, lang }) {
  if (isGumroad(product)) {
    return <GumroadButtonCompact link={product.gumroad_link} price={product.price_gumroad} lang={lang} />;
  }
  if (isGooglePlay(product)) {
    return <GooglePlayButtonCompact link={product.google_play_link} price={product.price_google} lang={lang} />;
  }
  return <MarketButtonsCompact markets={product.markets} lang={lang} />;
}

export function generateStaticParams() {
  return getAllProductPaths();
}

export function generateMetadata({ params }) {
  const product = getProduct(params.lang, params.slug);
  if (!product) return { title: 'Boutique — Solutions Directes Pro' };

  const pageTitle = `${product.title} — Solutions Directes Pro`;
  const pageDescription = product.excerpt || '';
  const productUrl = `https://solutionsdirectespro.com/boutique/${params.lang}/${params.slug}`;
  const coverImage = product.cover ? `https://solutionsdirectespro.com${product.cover}` : undefined;

  return {
    title: pageTitle,
    description: pageDescription,
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: productUrl,
      siteName: 'Solutions Directes Pro',
      locale: params.lang === 'fr' ? 'fr_FR' : params.lang === 'en' ? 'en_US' : params.lang === 'de' ? 'de_DE' : params.lang === 'es' ? 'es_ES' : params.lang === 'it' ? 'it_IT' : params.lang === 'pt' ? 'pt_PT' : params.lang === 'nl' ? 'nl_NL' : params.lang === 'sv' ? 'sv_SE' : params.lang === 'da' ? 'da_DK' : params.lang === 'pl' ? 'pl_PL' : params.lang === 'fi' ? 'fi_FI' : params.lang === 'ja' ? 'ja_JP' : params.lang === 'hi' ? 'hi_IN' : params.lang === 'vi' ? 'vi_VN' : params.lang === 'id' ? 'id_ID' : 'fr_FR',
      type: 'website',
      ...(coverImage ? { images: [{ url: coverImage, width: 1600, height: 2560, alt: product.title }] } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: pageDescription,
      ...(coverImage ? { images: [coverImage] } : {}),
    },
    alternates: {
      canonical: productUrl,
    },
  };
}

function RomanLayout({ product, otherProducts, lang }) {
  

  return (
    <>
      {/* HERO */}
      <div className="product-hero">
        <ProductCovers product={product} lang={lang} />
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
          <BuyButtons product={product} lang={lang} />
        </div>
      </div>

      {/* DESCRIPTION */}
      <div className="product-divider" />
      <div className="product-description">
        <h2>{ui(lang, 'description')}</h2>
        <div dangerouslySetInnerHTML={{ __html: product.html }} />
      </div>

      {/* BOTTOM CTA */}
      <div className="product-cta-bottom">
        <span className="product-cta-text">{getPlatformLabel(product, lang)}</span>
        <BuyButtonsCompact product={product} lang={lang} />
      </div>

      {/* ALSO BY */}
      {otherProducts.length > 0 && (
        <div className="product-also">
          <h2>{ui(lang, 'also')}</h2>
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

function NonfictionLayout({ product, otherProducts, lang }) {
  

  return (
    <>
      {/* HERO */}
      <div className="product-hero">
        <ProductCovers product={product} lang={lang} />
        <div className="product-info-col">
          {product.genre && <span className="product-badge product-badge-nf">📘 {product.genre}</span>}
          <h1 className="product-title">{product.title}</h1>
          <p className="product-author">Adrian Phoenix Vale</p>
          {product.excerpt && <p className="product-hook">{product.excerpt}</p>}

          {/* What you'll learn box */}
          {product.learn && (
            <div className="product-learn-box">
              <p className="product-learn-title">{ui(lang, 'whatLearn')}</p>
              <p className="product-learn-text">{product.learn}</p>
            </div>
          )}

          <div className="product-features">
            {product.pages && <span className="product-feat">📄 {product.pages} pages</span>}
            {product.language && <span className="product-feat">🌐 {product.language}</span>}
            <span className="product-feat">{ui(lang, 'exercises')}</span>
          </div>
          {/* Buy buttons — Gumroad or Amazon */}
          <BuyButtons product={product} lang={lang} />
        </div>
      </div>

      <div className="product-divider" />

      {/* BENEFITS */}
      {product.benefits && product.benefits.length > 0 && (
        <div className="product-benefits-section">
          <h2>{ui(lang, 'inside')}</h2>
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
        <h2>{ui(lang, 'description')}</h2>
        <div dangerouslySetInnerHTML={{ __html: product.html }} />
      </div>

      {/* TABLE OF CONTENTS */}
      {product.toc && product.toc.length > 0 && (
        <div className="product-toc">
          <h2>{ui(lang, 'toc')}</h2>
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
          <h2>{ui(lang, 'forYou')}</h2>
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
          <span className="product-cta-text">{ui(lang, 'cta')}</span>
          <span className="product-cta-sub">{getPlatformLabel(product, lang)}</span>
        </div>
        <BuyButtonsCompact product={product} lang={lang} />
      </div>

      {/* ALSO BY */}
      {otherProducts.length > 0 && (
        <div className="product-also">
          <h2>{ui(lang, 'also')}</h2>
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
        <h1>{ui(lang, 'notFound')}</h1>
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
        {ui(lang, 'back')}
      </Link>
      {product.type === 'nonfiction' ? (
        <NonfictionLayout product={product} otherProducts={otherProducts} lang={lang} />
      ) : (
        <RomanLayout product={product} otherProducts={otherProducts} lang={lang} />
      )}
    </div>
  );
}
