import Link from 'next/link';
import { languages } from '../lib/config';
import { getArticles } from '../lib/articles';

export default function HomePage() {
  // Get latest 6 articles across all languages
  const allArticles = [];
  for (const lang of Object.keys(languages)) {
    const articles = getArticles(lang);
    allArticles.push(...articles);
  }
  allArticles.sort((a, b) => new Date(b.date) - new Date(a.date));
  const latest = allArticles.slice(0, 6);

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <h1>Des solutions directes,<br />partout dans le monde</h1>
        <p>
          Une plateforme multilingue qui vous guide pas à pas pour résoudre vos problèmes.
          Finances, emploi, santé, logement, droit, relations, luxe, retraite.
        </p>
        <Link href="/articles/fr" className="hero-cta">
          Découvrir les solutions
        </Link>
      </section>

      {/* LANGUAGES OVERVIEW */}
      <section className="section">
        <h2 className="section-title">Articles dans {Object.keys(languages).length} langues</h2>
        <p className="section-subtitle">
          Choisissez votre langue pour accéder aux articles et solutions adaptés à votre situation.
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
          gap: '12px'
        }}>
          {Object.entries(languages).map(([code, lang]) => {
            const count = getArticles(code).length;
            return (
              <Link
                key={code}
                href={`/articles/${code}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '14px 18px',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  transition: 'all 0.2s',
                }}
              >
                <span style={{ fontSize: '1.3rem' }}>{lang.flag}</span>
                <span>{lang.label}</span>
                {count > 0 && (
                  <span style={{
                    marginLeft: 'auto',
                    fontSize: '0.75rem',
                    background: 'var(--color-bg-alt)',
                    padding: '2px 8px',
                    borderRadius: '10px',
                    color: 'var(--color-text-muted)',
                  }}>
                    {count}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </section>

      {/* LATEST ARTICLES */}
      {latest.length > 0 && (
        <section className="section" style={{ background: 'var(--color-bg-alt)' }}>
          <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto' }}>
            <h2 className="section-title">Derniers articles publiés</h2>
            <p className="section-subtitle">Les articles les plus récents, toutes langues confondues.</p>
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
          </div>
        </section>
      )}
    </>
  );
}
