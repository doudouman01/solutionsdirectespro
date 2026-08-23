import Link from 'next/link';
import { languages } from '../../lib/config';

export const metadata = {
  title: 'Ressources — Solutions Directes Pro',
  description: 'Accédez à toutes nos ressources : articles, ebooks, guides pratiques dans 18 langues.',
};

const resourceTypes = [
  {
    icon: '📝',
    title: 'Articles gratuits',
    desc: 'Des articles pratiques et informatifs dans 18 langues. Finances, emploi, santé, logement, droit et relations.',
    cta: 'Voir les articles',
    link: '/articles/fr',
  },
  {
    icon: '📚',
    title: 'Boutique — Romans et ebooks',
    desc: 'Nos romans, thrillers, romances et ebooks de développement personnel. Disponibles sur Amazon en plusieurs langues.',
    cta: 'Visiter la boutique',
    link: '/boutique/en',
  },
];

const socialLinks = [
  { name: 'Facebook', url: 'https://www.facebook.com/adrianphoenixvale', icon: '📘' },
  { name: 'TikTok', url: 'https://www.tiktok.com/@adrianphoenixvale.books', icon: '🎵' },
  { name: 'Instagram', url: 'https://www.instagram.com/adrianphoenixvale', icon: '📷' },
  { name: 'Pinterest', url: 'https://www.pinterest.com/adrianphoenixvale', icon: '📌' },
  { name: 'Beacons', url: 'https://beacons.ai/adrianphoenixvale', icon: '🔗' },
];

export default function RessourcesPage() {
  const langEntries = Object.entries(languages);

  return (
    <>
      <section className="hero" style={{ padding: '60px 24px' }}>
        <h1 style={{ fontSize: '2.4rem', marginBottom: '16px' }}>Ressources</h1>
        <p style={{ maxWidth: '600px', margin: '0 auto' }}>
          Accédez à toutes nos ressources : articles gratuits, ebooks et guides pratiques dans 18 langues.
        </p>
      </section>

      {/* Resource types */}
      <section className="section">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', maxWidth: '800px', margin: '0 auto' }}>
          {resourceTypes.map((r, i) => (
            <Link
              key={i}
              href={r.link}
              className="article-card"
              style={{ padding: '32px', textAlign: 'center', display: 'block' }}
            >
              <div style={{ fontSize: '3rem', marginBottom: '16px' }}>{r.icon}</div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.3rem', fontWeight: '700', marginBottom: '10px', color: '#1a1a2e' }}>
                {r.title}
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#555', lineHeight: '1.6', marginBottom: '16px' }}>
                {r.desc}
              </p>
              <span style={{ color: '#e2b714', fontWeight: '600', fontSize: '0.95rem' }}>
                {r.cta} →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Browse by language */}
      <section style={{ background: '#f8f9fa', padding: '60px 24px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 className="section-title">Parcourir par langue</h2>
          <p className="section-subtitle">Choisissez votre langue pour accéder aux articles et à la boutique.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '10px' }}>
            {langEntries.map(([code, lang]) => (
              <div
                key={code}
                style={{
                  padding: '16px',
                  border: '1px solid #e0e0e0',
                  borderRadius: '8px',
                  background: '#fff',
                }}
              >
                <p style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '8px' }}>
                  {lang.flag} {lang.label}
                </p>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <Link
                    href={`/articles/${code}`}
                    style={{ fontSize: '0.78rem', color: '#e2b714', fontWeight: '500' }}
                  >
                    Articles
                  </Link>
                  <Link
                    href={`/boutique/${code}`}
                    style={{ fontSize: '0.78rem', color: '#1a1a2e', fontWeight: '500' }}
                  >
                    Boutique
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social links */}
      <section className="section">
        <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
          <h2 className="section-title" style={{ textAlign: 'center' }}>Suivez-nous</h2>
          <p className="section-subtitle" style={{ textAlign: 'center' }}>Retrouvez Adrian Phoenix Vale sur les réseaux sociaux.</p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {socialLinks.map((s, i) => (
              <a
                key={i}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 20px',
                  border: '1px solid #e0e0e0',
                  borderRadius: '8px',
                  fontSize: '0.9rem',
                  fontWeight: '500',
                  color: '#1a1a2e',
                  transition: 'border-color 0.2s',
                }}
              >
                <span>{s.icon}</span> {s.name}
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
