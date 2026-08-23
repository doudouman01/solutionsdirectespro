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

export function getProducts(lang, market = null) {
  const langDir = path.join(boutiqueDir, lang);
  if (!fs.existsSync(langDir)) return [];

  const files = fs.readdirSync(langDir).filter(f => f.endsWith('.md'));
  const products = [];

  for (const file of files) {
    const filePath = path.join(langDir, file);
    const fileContent = readFile(filePath);
    const { data, content } = matter(fileContent);

    if (market && data.market && data.market !== market) continue;

    products.push({
      slug: file.replace('.md', ''),
      title: data.title || 'Sans titre',
      type: data.type || 'roman',
      cover: data.cover || null,
      amazon_link: data.amazon_link || '#',
      kindle_link: data.kindle_link || '#',
      price_kindle: data.price_kindle || '',
      price_paperback: data.price_paperback || '',
      market: data.market || 'US',
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
    });
  }

  products.sort((a, b) => (a.title || '').localeCompare(b.title || ''));
  return products;
}

export function getProduct(lang, slug) {
  const filePath = path.join(boutiqueDir, lang, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const fileContent = readFile(filePath);
  const { data, content } = matter(fileContent);

  return {
    slug,
    title: data.title || 'Sans titre',
    type: data.type || 'roman',
    cover: data.cover || null,
    amazon_link: data.amazon_link || '#',
    kindle_link: data.kindle_link || '#',
    price_kindle: data.price_kindle || '',
    price_paperback: data.price_paperback || '',
    market: data.market || 'US',
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
  const markets = [...new Set(products.map(p => p.market))].sort();
  return markets;
}
