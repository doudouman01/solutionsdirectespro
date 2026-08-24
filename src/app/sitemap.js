import fs from 'fs';
import path from 'path';

const BASE_URL = 'https://solutionsdirectespro.vercel.app';

export default function sitemap() {
  const urls = [];

  // Pages statiques
  const staticPages = [
    { path: '', priority: 1.0 },
    { path: '/a-propos', priority: 0.7 },
    { path: '/domaines', priority: 0.7 },
    { path: '/ressources', priority: 0.7 },
    { path: '/blogs', priority: 0.7 },
  ];

  staticPages.forEach(page => {
    urls.push({
      url: `${BASE_URL}${page.path}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: page.priority,
    });
  });

  // Articles depuis content/[langue]/[categorie]/[slug].md
  const contentDir = path.join(process.cwd(), 'content');
  if (fs.existsSync(contentDir)) {
    const langues = fs.readdirSync(contentDir).filter(f =>
      fs.statSync(path.join(contentDir, f)).isDirectory() && f !== 'boutique'
    );

    langues.forEach(langue => {
      const langDir = path.join(contentDir, langue);
      const categories = fs.readdirSync(langDir).filter(f =>
        fs.statSync(path.join(langDir, f)).isDirectory()
      );

      categories.forEach(categorie => {
        const catDir = path.join(langDir, categorie);
        const files = fs.readdirSync(catDir).filter(f => f.endsWith('.md'));

        files.forEach(file => {
          const slug = file.replace('.md', '');
          urls.push({
            url: `${BASE_URL}/${langue}/${categorie}/${slug}`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.6,
          });
        });
      });
    });
  }

  // Produits boutique depuis content/boutique/[langue]/[slug].md
  const boutiqueDir = path.join(process.cwd(), 'content', 'boutique');
  if (fs.existsSync(boutiqueDir)) {
    const langues = fs.readdirSync(boutiqueDir).filter(f =>
      fs.statSync(path.join(boutiqueDir, f)).isDirectory()
    );

    langues.forEach(langue => {
      const langDir = path.join(boutiqueDir, langue);
      const files = fs.readdirSync(langDir).filter(f => f.endsWith('.md'));

      files.forEach(file => {
        const slug = file.replace('.md', '');
        urls.push({
          url: `${BASE_URL}/boutique/${langue}/${slug}`,
          lastModified: new Date(),
          changeFrequency: 'monthly',
          priority: 0.8,
        });
      });
    });
  }

  return urls;
}
