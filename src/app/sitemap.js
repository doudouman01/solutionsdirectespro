import fs from 'fs';
import path from 'path';

const BASE_URL = 'https://solutionsdirectespro.com';

export default function sitemap() {
  const urls = [];

  // ─── Pages statiques ───
  const staticPages = [
    { path: '', priority: 1.0 },
    { path: '/a-propos', priority: 0.7 },
    { path: '/domaines', priority: 0.7 },
    { path: '/ressources', priority: 0.7 },
    { path: '/blogs', priority: 0.7 },
  ];

  for (const page of staticPages) {
    urls.push({
      url: BASE_URL + page.path,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: page.priority,
    });
  }

  // ─── Articles : content/[langue]/[categorie]/[slug].md ───
  // URL finale : /articles/[langue]/[categorie]/[slug]
  const contentDir = path.join(process.cwd(), 'content');
  if (fs.existsSync(contentDir)) {
    const langues = fs.readdirSync(contentDir).filter(f => {
      try {
        return fs.statSync(path.join(contentDir, f)).isDirectory() && f !== 'boutique';
      } catch (e) { return false; }
    });

    for (const langue of langues) {
      // Page index articles par langue
      urls.push({
        url: `${BASE_URL}/articles/${langue}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
      });

      const langDir = path.join(contentDir, langue);
      const categories = fs.readdirSync(langDir).filter(f => {
        try { return fs.statSync(path.join(langDir, f)).isDirectory(); }
        catch (e) { return false; }
      });

      for (const cat of categories) {
        // Page index articles par catégorie
        urls.push({
          url: `${BASE_URL}/articles/${langue}/${cat}`,
          lastModified: new Date(),
          changeFrequency: 'weekly',
          priority: 0.65,
        });

        const files = fs.readdirSync(path.join(langDir, cat)).filter(f => f.endsWith('.md'));
        for (const file of files) {
          urls.push({
            url: `${BASE_URL}/articles/${langue}/${cat}/${file.replace('.md', '')}`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.6,
          });
        }
      }
    }
  }

  // ─── Boutique : content/boutique/[langue]/[slug].md ───
  // URL finale : /boutique/[langue]/[slug]
  const boutiqueDir = path.join(process.cwd(), 'content', 'boutique');
  if (fs.existsSync(boutiqueDir)) {
    const langues = fs.readdirSync(boutiqueDir).filter(f => {
      try { return fs.statSync(path.join(boutiqueDir, f)).isDirectory(); }
      catch (e) { return false; }
    });

    for (const langue of langues) {
      // Page index boutique par langue
      urls.push({
        url: `${BASE_URL}/boutique/${langue}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.75,
      });

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
