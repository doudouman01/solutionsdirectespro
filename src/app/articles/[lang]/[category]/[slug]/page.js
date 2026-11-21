import Link from 'next/link';
import { languages } from '../../../../../lib/config';
import { getArticle, getAllArticlePaths } from '../../../../../lib/articles';
import { getProduct } from '../../../../../lib/boutique';
import ProductBox from '../../../../../components/ProductBox';
import { QuizBannerSingle } from '../../../../../components/QuizBanner';
import EmailCapture from '../../../../../components/EmailCapture';

export function generateStaticParams() {
  return getAllArticlePaths();
}

/* ── Locale mapping ── */
const localeMap = {
  fr: 'fr_FR', en: 'en_US', de: 'de_DE', es: 'es_ES', it: 'it_IT',
  pt: 'pt_PT', nl: 'nl_NL', sv: 'sv_SE', da: 'da_DK', pl: 'pl_PL',
  fi: 'fi_FI', ja: 'ja_JP', hi: 'hi_IN', vi: 'vi_VN', id: 'id_ID',
  ms: 'ms_MY', ro: 'ro_RO', el: 'el_GR', cs: 'cs_CZ', is: 'is_IS',
};

export function generateMetadata({ params }) {
  const article = getArticle(params.lang, params.category, params.slug);
  if (!article) return { title: 'Article — Solutions Directes Pro' };

  /* ── Optimized title: article title only (no site name wasting characters) ── */
  const pageTitle = article.title;
  /* ── Optimized description: excerpt trimmed to ~155 chars for Google display ── */
  const rawDesc = article.excerpt || article.title;
  const pageDescription = rawDesc.length > 155 ? rawDesc.substring(0, 152) + '...' : rawDesc;
  const articleUrl = `https://solutionsdirectespro.com/articles/${params.lang}/${params.category}/${params.slug}`;

  return {
    title: {
      absolute: pageTitle,
    },
    description: pageDescription,
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: articleUrl,
      siteName: 'Solutions Directes Pro',
      locale: localeMap[params.lang] || 'fr_FR',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: pageDescription,
    },
    alternates: {
      canonical: articleUrl,
    },
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

  /* ── Auto-detect linked boutique product from CTA in article content ── */
  let linkedProduct = null;
  const ctaMatch = article.content?.match(/\]\(\/boutique\/([a-z]{2})\/([a-z0-9-]+)\)/);
  if (ctaMatch) {
    const productLang = ctaMatch[1];
    const productSlug = ctaMatch[2];
    try {
      linkedProduct = getProduct(productLang, productSlug);
    } catch (e) {
      // Product not found — no box displayed
    }
  }

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

  /* ── Schema.org FAQPage — auto-generated from H3 questions ── */
  const faqLd = (article.faqs && article.faqs.length >= 2) ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: article.faqs.slice(0, 10).map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer.substring(0, 500),
      },
    })),
  } : null;

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
      {faqLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
      )}

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

      {/* Product Display Box — above the fold */}
      {linkedProduct && (
        <ProductBox product={linkedProduct} lang={lang} variant="full" />
      )}

      <div
        className="article-content"
        dangerouslySetInnerHTML={{ __html: article.html }}
      />

      {/* Product Display Box — bottom (compact) */}
      {linkedProduct && (
        <ProductBox product={linkedProduct} lang={lang} variant="compact" />
      )}

      {/* Quiz Banner — contextual: manipulation for psychology/relationships, book-match for others */}
      <QuizBannerSingle
        lang={lang}
        type={['relations', 'relationships', 'relaciones', 'psychagogia', 'beziehungen', 'relazioni', 'relacionamentos', 'relaties', 'relationer', 'suhteet', 'forhold'].includes(category) ? 'manipulation' : 'bookMatch'}
      />

      {/* Email Capture */}
      <EmailCapture lang={lang} source="article" variant="compact" />

      <div style={{ marginTop: '48px', paddingTop: '24px', borderTop: '1px solid var(--color-border)' }}>
        <Link href={`/articles/${lang}/${category}`} className="article-back">
          {langConfig.backToArticles}
        </Link>
      </div>
    </article>
  );
}
