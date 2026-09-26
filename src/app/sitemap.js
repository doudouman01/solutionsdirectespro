import fs from 'fs';
import path from 'path';

const BASE_URL = 'https://solutionsdirectespro.com';

// ── Get real file modification date ───────────────────────────
function getFileDate(filePath) {
  try {
    const stat = fs.statSync(filePath);
    return stat.mtime;
  } catch {
    return new Date('2026-09-01'); // fallback
  }
}

export default function sitemap() {
  const urls = [];

  // ─── Pages statiques ───
  const srcApp = path.join(process.cwd(), 'src', 'app');
  const staticPages = [
    { path: '', file: 'page.js', priority: 1.0 },
    { path: '/a-propos', file: 'a-propos/page.js', priority: 0.7 },
    { path: '/domaines', file: 'domaines/page.js', priority: 0.7 },
    { path: '/ressources', file: 'ressources/page.js', priority: 0.7 },
    { path: '/blogs', file: 'blogs/page.js', priority: 0.7 },
  ];

  for (const page of staticPages) {
    urls.push({
      url: BASE_URL + page.path,
      lastModified: getFileDate(path.join(srcApp, page.file)),
      changeFrequency: 'monthly',
      priority: page.priority,
    });
  }

  // ─── Articles : content/[langue]/[categorie]/[slug].md ───
  const contentDir = path.join(process.cwd(), 'content');
  if (fs.existsSync(contentDir)) {
    const langues = fs.readdirSync(contentDir).filter(f => {
      try {
        return fs.statSync(path.join(contentDir, f)).isDirectory() && f !== 'boutique';
      } catch (e) { return false; }
    });

    for (const langue of langues) {
      // Page index articles par langue
      const langDir = path.join(contentDir, langue);
      urls.push({
        url: `${BASE_URL}/articles/${langue}`,
        lastModified: getFileDate(langDir),
        changeFrequency: 'weekly',
        priority: 0.7,
      });

      const categories = fs.readdirSync(langDir).filter(f => {
        try { return fs.statSync(path.join(langDir, f)).isDirectory(); }
        catch (e) { return false; }
      });

      for (const cat of categories) {
        const catDir = path.join(langDir, cat);
        // Page index articles par catégorie
        urls.push({
          url: `${BASE_URL}/articles/${langue}/${cat}`,
          lastModified: getFileDate(catDir),
          changeFrequency: 'weekly',
          priority: 0.65,
        });

        const files = fs.readdirSync(catDir).filter(f => f.endsWith('.md'));
        for (const file of files) {
          urls.push({
            url: `${BASE_URL}/articles/${langue}/${cat}/${file.replace('.md', '')}`,
            lastModified: getFileDate(path.join(catDir, file)),
            changeFrequency: 'weekly',
            priority: 0.6,
          });
        }
      }
    }
  }

  // ─── Boutique : content/boutique/[langue]/[slug].md ───
  const boutiqueDir = path.join(process.cwd(), 'content', 'boutique');
  if (fs.existsSync(boutiqueDir)) {
    const langues = fs.readdirSync(boutiqueDir).filter(f => {
      try { return fs.statSync(path.join(boutiqueDir, f)).isDirectory(); }
      catch (e) { return false; }
    });

    for (const langue of langues) {
      const langBoutiqueDir = path.join(boutiqueDir, langue);
      // Page index boutique par langue
      urls.push({
        url: `${BASE_URL}/boutique/${langue}`,
        lastModified: getFileDate(langBoutiqueDir),
        changeFrequency: 'weekly',
        priority: 0.75,
      });

      const files = fs.readdirSync(langBoutiqueDir).filter(f => f.endsWith('.md'));
      for (const file of files) {
        urls.push({
          url: `${BASE_URL}/boutique/${langue}/${file.replace('.md', '')}`,
          lastModified: getFileDate(path.join(langBoutiqueDir, file)),
          changeFrequency: 'monthly',
          priority: 0.8,
        });
      }
    }
  }

  return urls;
}
