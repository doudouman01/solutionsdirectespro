import Link from 'next/link';
import { languages } from '../../../../lib/config';
import { getArticles, getCategoriesWithCounts } from '../../../../lib/articles';

export function generateStaticParams() {
  const params = [];
  for (const [lang, config] of Object.entries(languages)) {
    for (const cat of Object.keys(config.categories)) {
      params.push({ lang, category: cat });
    }
  }
  return params;
}

export function generateMetadata({ params }) {
  const langConfig = languages[params.lang];
  if (!langConfig) return {};
  const catLabel = langConfig.categories[params.category] || params.category;
  return {
    title: `${catLabel} — ${langConfig.articlesLabel} — Solutions Directes Pro`,
  };
}

export default function CategoryPage({ params }) {
  const { lang, category } = params;
  const langConfig = languages[lang];

  if (!langConfig) {
    return (
      <div className="section">
        <h1 className="section-title">Page non trouvée</h1>
      </div>
    );
  }

  const catLabel = langConfig.categories[category] || category;
  const articles = getArticles(lang, category);
  const categories = getCategoriesWithCounts(lang);

  return (
    <section className="section">
      <h1 className="section-title">{langConfig.flag} {catLabel}</h1>
      <p className="section-subtitle">{langConfig.articlesLabel}</p>

      {/* Category tabs */}
      <div className="category-tabs">
        <Link href={`/articles/${lang}`} className="category-tab">
          {langConfig.allArticles}
        </Link>
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/articles/${lang}/${cat.slug}`}
            className={`category-tab ${cat.slug === category ? 'active' : ''}`}
          >
            {cat.label}
            <span className="count">({cat.count})</span>
          </Link>
        ))}
      </div>

      {articles.length > 0 ? (
        <div className="articles-grid">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/articles/${lang}/${category}/${article.slug}`}
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
        </div>
      )}
    </section>
  );
}
