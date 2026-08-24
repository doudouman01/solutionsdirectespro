import fs from 'fs';
import path from 'path';

const BASE_URL = 'https://solutionsdirectespro.com';

function getFilesRecursive(dir) {
  let results = [];
  try {
    const items = fs.readdirSync(dir);
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        results = results.concat(getFilesRecursive(fullPath));
      } else if (item.endsWith('.md')) {
        results.push(fullPath);
      }
    }
  } catch (e) {
    // silently ignore
  }
  return results;
}

export default function sitemap() {
  const urls = [];

  // Pages statiques
  ['', '/a-propos', '/domaines', '/ressources', '/blogs'].forEach(p => {
    urls.push({
      url: BASE_URL + p,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: p === '' ? 1.0 : 0.7,
    });
  });

  // Articles : content/[langue]/[categorie]/[slug].md
  const contentDir = path.join(process.cwd(), 'content');
  if (fs.existsSync(contentDir)) {
    const langues = fs.readdirSync(contentDir).filter(f => {
      try {
        return fs.statSync(path.join(contentDir, f)).isDirectory() && f !== 'boutique';
      } catch (e) { return false; }
    });

    for (const langue of langues) {
      const langDir = path.join(contentDir, langue);
      const categories = fs.readdirSync(langDir).filter(f => {
        try { return fs.statSync(path.join(langDir, f)).isDirectory(); }
        catch (e) { return false; }
      });

      for (const cat of categories) {
        const files = fs.readdirSync(path.join(langDir, cat)).filter(f => f.endsWith('.md'));
        for (const file of files) {
          urls.push({
            url: `${BASE_URL}/${langue}/${cat}/${file.replace('.md', '')}`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.6,
          });
        }
      }
    }
  }

  // Boutique : content/boutique/[langue]/[slug].md
  const boutiqueDir = path.join(process.cwd(), 'content', 'boutique');
  if (fs.existsSync(boutiqueDir)) {
    const langues = fs.readdirSync(boutiqueDir).filter(f => {
      try { return fs.statSync(path.join(boutiqueDir, f)).isDirectory(); }
      catch (e) { return false; }
    });

    for (const langue of langues) {
      const files = fs.readdirSync(path.join(boutiqueDir, langue)).filter(f => f.endsWith('.md'));
      for (const file of files) {
        urls.push({
          url: `${BASE_URL}/boutique/${langue}/${file.replace('.md', '')}`,
          lastModified: new Date(),
          changeFrequency: 'monthly',
          priority: 0.8,
        });
      }
    }
  }

  return urls;
}
