import Link from 'next/link';
import { languages } from '../../../../../lib/config';
import { getArticle, getAllArticlePaths } from '../../../../../lib/articles';

export function generateStaticParams() {
  return getAllArticlePaths();
}

export function generateMetadata({ params }) {
  const article = getArticle(params.lang, params.category, params.slug);
  if (!article) return { title: 'Article — Solutions Directes Pro' };
  return {
    title: `${article.title} — Solutions Directes Pro`,
    description: article.excerpt || '',
  };
}

export default function ArticlePage({ params }) {
  const { lang, category, slug } = params;
  const langConfig = languages[lang];
  const article = getArticle(lang, category, slug);

  if (!article || !langConfig) {
    return (
      <div className="article-page">
        <h1>Article non trouvé</h1>
        <p><Link href="/">← Retour à l'accueil</Link></p>
      </div>
    );
  }

  const articleUrl = `https://solutionsdirectespro.com/articles/${lang}/${category}/${slug}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt || '',
    datePublished: article.date,
    dateModified: article.date,
    author: {
      '@type': 'Organization',
      name: 'Solutions Directes Pro',
      url: 'https://solutionsdirectespro.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Solutions Directes Pro',
      url: 'https://solutionsdirectespro.com',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': articleUrl,
    },
    inLanguage: lang,
    articleSection: article.categoryLabel || category,
  };

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Accueil',
        item: 'https://solutionsdirectespro.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: `Articles (${lang.toUpperCase()})`,
        item: `https://solutionsdirectespro.com/articles/${lang}`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: article.categoryLabel || category,
        item: `https://solutionsdirectespro.com/articles/${lang}/${category}`,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: article.title,
        item: articleUrl,
      },
    ],
  };

  return (
    <article className="article-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <Link href={`/articles/${lang}`} className="article-back">
        {langConfig.backToArticles}
      </Link>

      <span className="article-card-category" style={{ marginBottom: '16px', display: 'inline-block' }}>
        {article.categoryLabel}
      </span>

      <h1>{article.title}</h1>

      <div className="article-page-meta">
        <span>{langConfig.publishedOn} {article.date}</span>
        <span>{article.author}</span>
      </div>

      <div
        className="article-content"
        dangerouslySetInnerHTML={{ __html: article.html }}
      />

      <div style={{ marginTop: '48px', paddingTop: '24px', borderTop: '1px solid var(--color-border)' }}>
        <Link href={`/articles/${lang}/${category}`} className="article-back">
          {langConfig.backToArticles}
        </Link>
      </div>
    </article>
  );
}
