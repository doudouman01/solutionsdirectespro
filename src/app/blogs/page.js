import Link from 'next/link';
import { languages } from '../../lib/config';
import { getArticles } from '../../lib/articles';

export const metadata = {
  title: 'Blogs — Solutions Directes Pro',
  description: 'Lisez nos derniers articles de blog dans 18 langues. Finances, santé, emploi, développement personnel et plus.',
};

export default function BlogsPage() {
  // Get latest articles across all languages
  const allArticles = [];
  for (const lang of Object.keys(languages)) {
    const articles = getArticles(lang);
    allArticles.push(...articles);
  }
  allArticles.sort((a, b) => new Date(b.date) - new Date(a.date));
  const latest = allArticles.slice(0, 9);

  const langEntries = Object.entries(languages);

  return (
    <>
      <section className="hero" style={{ padding: '60px 24px' }}>
        <h1 style={{ fontSize: '2.4rem', marginBottom: '16px' }}>Blog</h1>
        <p style={{ maxWidth: '600px', margin: '0 auto' }}>
          Nos derniers articles et conseils pratiques dans 18 langues.
          Finances, santé, emploi, développement personnel et bien plus.
        </p>
      </section>

      {/* Language quick access */}
      <section style={{ background: '#f8f9fa', padding: '24px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {langEntries.map(([code, lang]) => (
            <Link
              key={code}
              href={`/articles/${code}`}
              style={{
                padding: '6px 16px',
                borderRadius: '20px',
                fontSize: '0.82rem',
                fontWeight: '500',
                color: '#1a1a2e',
                border: '1px solid #e0e0e0',
                background: '#fff',
              }}
            >
              {lang.flag} {lang.label}
            </Link>
          ))}
        </div>
      </section>

      {/* Latest articles */}
      <section className="section">
        <h2 className="section-title">Derniers articles publiés</h2>
        <p className="section-subtitle">Les articles les plus récents, toutes langues confondues.</p>

        {latest.length > 0 ? (
          <div className="articles-grid">
            {latest.map((article) => (
              <Link
                key={`${article.lang}-${article.category}-${article.slug}`}
                href={`/articles/${article.lang}/${article.category}/${article.slug}`}
                className="article-card"
              >
                <div className="article-card-body">
                  <span className="article-card-category">
                    {languages[article.lang]?.flag} {article.categoryLabel}
                  </span>
                  <h3>{article.title}</h3>
                  <p className="article-card-excerpt">{article.excerpt}</p>
                  <div className="article-card-meta">
                    <span>{article.date}</span>
                    <span className="article-card-link">
                      {languages[article.lang]?.readMore} →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <p>Aucun article publié pour le moment.</p>
            <p style={{ marginTop: '8px', fontSize: '0.85rem', color: '#888' }}>
              Les articles arrivent bientôt dans toutes les langues.
            </p>
          </div>
        )}

        {/* Browse all by language */}
        <div style={{ marginTop: '48px', textAlign: 'center' }}>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.3rem', marginBottom: '16px' }}>
            Parcourir tous les articles par langue
          </h3>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {langEntries.map(([code, lang]) => (
              <Link
                key={code}
                href={`/articles/${code}`}
                className="category-tab"
              >
                {lang.flag} {lang.label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
