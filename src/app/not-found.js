import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '60vh',
      textAlign: 'center',
      padding: '2rem'
    }}>
      <h1 style={{ fontSize: '4rem', marginBottom: '0.5rem', color: '#1a1a2e' }}>404</h1>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#1a1a2e' }}>Page introuvable</h2>
      <p style={{ fontSize: '1.1rem', color: '#666', marginBottom: '2rem', maxWidth: '500px' }}>
        La page que vous cherchez n'existe pas ou a été déplacée.
      </p>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link href="/" style={{
          display: 'inline-block',
          padding: '0.75rem 1.5rem',
          backgroundColor: '#1a1a2e',
          color: '#fff',
          borderRadius: '8px',
          textDecoration: 'none',
          fontSize: '1rem'
        }}>
          Retour à l'accueil
        </Link>
        <Link href="/blogs" style={{
          display: 'inline-block',
          padding: '0.75rem 1.5rem',
          backgroundColor: '#f0f0f0',
          color: '#1a1a2e',
          borderRadius: '8px',
          textDecoration: 'none',
          fontSize: '1rem'
        }}>
          Voir le blog
        </Link>
      </div>
    </div>
  );
}
