import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import { languages } from './config';

const boutiqueDir = path.join(process.cwd(), 'content', 'boutique');

function readFile(filePath) {
  const raw = fs.readFileSync(filePath, 'utf-8');
  return raw.replace(/^\uFEFF/, '');
}

// Convert old single-market format to new markets array
function normalizeMarkets(data) {
  // New format: markets array already present
  if (data.markets && Array.isArray(data.markets) && data.markets.length > 0) {
    return data.markets;
  }
  // Old format: single market + amazon_link + kindle_link
  const m = {
    id: data.market || 'US',
  };
  if (data.amazon_link && data.amazon_link !== '#') m.amazon_link = data.amazon_link;
  if (data.kindle_link && data.kindle_link !== '#') m.kindle_link = data.kindle_link;
  if (data.price_kindle) m.price_kindle = data.price_kindle;
  if (data.price_paperback) m.price_paperback = data.price_paperback;
  return [m];
}

function parseProduct(filePath, file, lang) {
  const fileContent = readFile(filePath);
  const { data, content } = matter(fileContent);
  const markets = normalizeMarkets(data);

  return {
    slug: file.replace('.md', ''),
    title: data.title || 'Sans titre',
    type: data.type || 'roman',
    cover: data.cover || null,
    cover_paperback: data.cover_paperback || null,
    // Gumroad fields
    gumroad_link: data.gumroad_link || null,
    price_gumroad: data.price_gumroad || '',
    // Google Play fields
    google_play_link: data.google_play_link || null,
    price_google: data.price_google || '',
    // Keep legacy fields for backward compat
    amazon_link: data.amazon_link || '#',
    kindle_link: data.kindle_link || '#',
    price_kindle: data.price_kindle || '',
    price_paperback: data.price_paperback || '',
    market: data.market || 'US',
    // New multi-market
    markets: markets,
    category: data.category || '',
    pages: data.pages || '',
    language: data.language || lang,
    genre: data.genre || '',
    excerpt: data.excerpt || '',
    learn: data.learn || '',
    toc: data.toc || [],
    for_you: data.for_you || [],
    benefits: data.benefits || [],
    also_by: data.also_by || [],
    content: content,
    lang: lang,
  };
}

export function getProducts(lang, market = null) {
  const langDir = path.join(boutiqueDir, lang);
  if (!fs.existsSync(langDir)) return [];

  const files = fs.readdirSync(langDir).filter(f => f.endsWith('.md'));
  const products = [];

  for (const file of files) {
    const filePath = path.join(langDir, file);
    const product = parseProduct(filePath, file, lang);

    // Filter by market: check if any market in the array matches
    if (market && !product.markets.some(m => m.id === market)) continue;

    products.push(product);
  }

  products.sort((a, b) => (a.title || '').localeCompare(b.title || ''));
  return products;
}

export function getProduct(lang, slug) {
  const filePath = path.join(boutiqueDir, lang, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const fileContent = readFile(filePath);
  const { data, content } = matter(fileContent);
  const markets = normalizeMarkets(data);

  return {
    slug,
    title: data.title || 'Sans titre',
    type: data.type || 'roman',
    cover: data.cover || null,
    cover_paperback: data.cover_paperback || null,
    gumroad_link: data.gumroad_link || null,
    price_gumroad: data.price_gumroad || '',
    google_play_link: data.google_play_link || null,
    price_google: data.price_google || '',
    amazon_link: data.amazon_link || '#',
    kindle_link: data.kindle_link || '#',
    price_kindle: data.price_kindle || '',
    price_paperback: data.price_paperback || '',
    market: data.market || 'US',
    markets: markets,
    category: data.category || '',
    pages: data.pages || '',
    language: data.language || lang,
    genre: data.genre || '',
    excerpt: data.excerpt || '',
    learn: data.learn || '',
    toc: data.toc || [],
    for_you: data.for_you || [],
    benefits: data.benefits || [],
    also_by: data.also_by || [],
    html: marked(content),
    lang: lang,
  };
}

export function getAllProductPaths() {
  const paths = [];
  if (!fs.existsSync(boutiqueDir)) return paths;

  const langDirs = fs.readdirSync(boutiqueDir, { withFileTypes: true })
    .filter(d => d.isDirectory());

  for (const langDir of langDirs) {
    const langPath = path.join(boutiqueDir, langDir.name);
    const files = fs.readdirSync(langPath).filter(f => f.endsWith('.md'));
    for (const file of files) {
      paths.push({ lang: langDir.name, slug: file.replace('.md', '') });
    }
  }
  return paths;
}

export function getMarkets(lang) {
  const products = getProducts(lang);
  const marketSet = new Set();
  for (const p of products) {
    for (const m of p.markets) {
      marketSet.add(m.id);
    }
  }
  return [...marketSet].sort();
}
