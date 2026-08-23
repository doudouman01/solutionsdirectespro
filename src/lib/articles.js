import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import { languages } from './config';

const contentDir = path.join(process.cwd(), 'content');

// Get all articles for a language, optionally filtered by category
export function getArticles(lang, category = null) {
  const langConfig = languages[lang];
  if (!langConfig) return [];

  const langDir = path.join(contentDir, lang);
  if (!fs.existsSync(langDir)) return [];

  const articles = [];

  // Read all category folders
  const categoryDirs = fs.readdirSync(langDir, { withFileTypes: true })
    .filter(d => d.isDirectory());

  for (const catDir of categoryDirs) {
    if (category && catDir.name !== category) continue;

    const catPath = path.join(langDir, catDir.name);
    const files = fs.readdirSync(catPath).filter(f => f.endsWith('.md'));

    for (const file of files) {
      const filePath = path.join(catPath, file);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const { data, content } = matter(fileContent);

      articles.push({
        slug: file.replace('.md', ''),
        category: catDir.name,
        categoryLabel: langConfig.categories[catDir.name] || catDir.name,
        title: data.title || 'Sans titre',
        date: data.date || '2026-01-01',
        excerpt: data.excerpt || content.substring(0, 200) + '...',
        author: data.author || 'Solutions Directes Pro',
        image: data.image || null,
        content: content,
        lang: lang,
      });
    }
  }

  // Sort by date descending
  articles.sort((a, b) => new Date(b.date) - new Date(a.date));
  return articles;
}

// Get a single article by slug
export function getArticle(lang, category, slug) {
  const langConfig = languages[lang];
  if (!langConfig) return null;

  const filePath = path.join(contentDir, lang, category, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);

  return {
    slug,
    category,
    categoryLabel: langConfig.categories[category] || category,
    title: data.title || 'Sans titre',
    date: data.date || '2026-01-01',
    excerpt: data.excerpt || '',
    author: data.author || 'Solutions Directes Pro',
    image: data.image || null,
    html: marked(content),
    lang,
  };
}

// Get all possible [lang]/[category]/[slug] paths for static generation
export function getAllArticlePaths() {
  const paths = [];

  for (const lang of Object.keys(languages)) {
    const langDir = path.join(contentDir, lang);
    if (!fs.existsSync(langDir)) continue;

    const categoryDirs = fs.readdirSync(langDir, { withFileTypes: true })
      .filter(d => d.isDirectory());

    for (const catDir of categoryDirs) {
      const catPath = path.join(langDir, catDir.name);
      const files = fs.readdirSync(catPath).filter(f => f.endsWith('.md'));

      for (const file of files) {
        paths.push({
          lang,
          category: catDir.name,
          slug: file.replace('.md', ''),
        });
      }
    }
  }

  return paths;
}

// Get all languages that have at least one article
export function getActiveLanguages() {
  const active = [];
  for (const lang of Object.keys(languages)) {
    const articles = getArticles(lang);
    if (articles.length > 0) {
      active.push({ code: lang, ...languages[lang], count: articles.length });
    }
  }
  return active;
}

// Get categories with article counts for a language
export function getCategoriesWithCounts(lang) {
  const langConfig = languages[lang];
  if (!langConfig) return [];

  const result = [];
  for (const [catSlug, catLabel] of Object.entries(langConfig.categories)) {
    const articles = getArticles(lang, catSlug);
    result.push({
      slug: catSlug,
      label: catLabel,
      count: articles.length,
    });
  }
  return result;
}
