// ============================================================
// Composant JsonLd réutilisable
// ============================================================
// Usage dans une page article :
//   <JsonLd data={articleSchema} />
//
// Usage dans une page produit boutique :
//   <JsonLd data={productSchema} />
// ============================================================

export default function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// ─── Helper : générer le schema Article ───
export function buildArticleSchema({ title, description, url, datePublished, dateModified, language, category }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: description,
    url: url,
    datePublished: datePublished || new Date().toISOString(),
    dateModified: dateModified || new Date().toISOString(),
    inLanguage: language || 'en',
    articleSection: category || '',
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
      '@id': url,
    },
  };
}

// ─── Helper : générer le schema Product (boutique) ───
export function buildProductSchema({ title, description, url, price, currency, amazonLink, coverImage, language }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: title,
    description: description,
    url: url,
    image: coverImage || '',
    inLanguage: language || 'en',
    offers: {
      '@type': 'Offer',
      url: amazonLink || url,
      priceCurrency: currency || 'USD',
      price: price || '4.99',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'Amazon',
      },
    },
    author: {
      '@type': 'Person',
      name: 'Adrian Phoenix Vale',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Amazon KDP',
    },
  };
}

// ─── Helper : générer le schema BreadcrumbList ───
export function buildBreadcrumbSchema(items) {
  // items = [{ name: 'Accueil', url: '/' }, { name: 'Articles', url: '/articles/en' }, ...]
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `https://solutionsdirectespro.com${item.url}`,
    })),
  };
}
