import Link from 'next/link';
import { languages } from '../../../lib/config';
import { getArticles, getCategoriesWithCounts } from '../../../lib/articles';

export function generateStaticParams() {
  return Object.keys(languages).map((lang) => ({ lang }));
}

export function generateMetadata({ params }) {
  const lang = languages[params.lang];
  if (!lang) return { title: 'Articles — Solutions Directes Pro' };
  return {
    title: `${lang.articlesLabel} — Solutions Directes Pro`,
    description: `${lang.articlesLabel} — Solutions Directes Pro`,
  };
}

export default function ArticlesLangPage({ params }) {
  const { lang } = params;
  const langConfig = languages[lang];

  if (!langConfig) {
    return (
      <div className="section">
        <h1 className="section-title">Langue non trouvée</h1>
        <p><Link href="/">← Retour à l'accueil</Link></p>
      </div>
    );
  }

  const articles = getArticles(lang);
  const categories = getCategoriesWithCounts(lang);

  return (
    <section className="section">
      <h1 className="section-title">{langConfig.flag} {langConfig.articlesLabel}</h1>
      <p className="section-subtitle">
        {articles.length} article{articles.length !== 1 ? 's' : ''} · {Object.keys(langConfig.categories).length} catégories
      </p>

      {/* Category tabs */}
      <div className="category-tabs">
        <Link href={`/articles/${lang}`} className="category-tab active">
          {langConfig.allArticles}
          <span className="count">({articles.length})</span>
        </Link>
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/articles/${lang}/${cat.slug}`}
            className="category-tab"
          >
            {cat.label}
            <span className="count">({cat.count})</span>
          </Link>
        ))}
      </div>

      {/* Articles grid */}
      {articles.length > 0 ? (
        <div className="articles-grid">
          {articles.map((article) => (
            <Link
              key={`${article.category}-${article.slug}`}
              href={`/articles/${lang}/${article.category}/${article.slug}`}
              className="article-card"
            >
              <div className="article-card-body">
                <span className="article-card-category">{article.categoryLabel}</span>
                <h3>{article.title}</h3>
                <p className="article-card-excerpt">{article.excerpt}</p>
                <div className="article-card-meta">
                  <span>{langConfig.publishedOn} {article.date}</span>
                  <span className="article-card-link">{langConfig.readMore} →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <p>{langConfig.noArticles}</p>
          <p style={{ marginTop: '12px', fontSize: '0.85rem' }}>
            Ajoutez des fichiers .md dans <code>content/{lang}/[catégorie]/</code>
          </p>
        </div>
      )}
    </section>
  );
}
