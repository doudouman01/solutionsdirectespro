import Link from 'next/link';

export const metadata = {
  title: 'Domaines — Solutions Directes Pro',
  description: 'Découvrez nos domaines : finances, emploi, santé, logement, droit, relations, développement personnel et plus.',
};

const domaines = [
  {
    icon: '💰',
    title: 'Finances personnelles',
    desc: 'Guides et conseils pour gérer vos finances efficacement et sereinement. Budget, épargne, investissement et liberté financière.',
    link: '/articles/fr/finances',
  },
  {
    icon: '💼',
    title: 'Emploi et carrière',
    desc: "Plans d'action pour trouver un emploi ou évoluer professionnellement avec succès. CV, entretiens, reconversion.",
    link: '/articles/fr/emploi',
  },
  {
    icon: '🏥',
    title: 'Santé et bien-être',
    desc: 'Informations claires pour préserver votre santé et améliorer votre qualité de vie. Nutrition, sommeil, gestion du stress.',
    link: '/articles/fr/sante',
  },
  {
    icon: '📚',
    title: 'Littérature et romans',
    desc: "Découvrez nos romans pour des voyages immersifs. Thriller, romance, fantasy, saga familiale — en plusieurs langues.",
    link: '/boutique/fr',
  },
  {
    icon: '🧠',
    title: 'Développement personnel',
    desc: 'Reprenez le contrôle de votre vie. Valorisation de soi, confiance, limites saines et croissance personnelle.',
    link: '/boutique/en?category=personal-development',
  },
  {
    icon: '🏠',
    title: 'Logement',
    desc: "Solutions pratiques pour vos questions de logement. Location, achat, déménagement, droits des locataires.",
    link: '/articles/fr/logement',
  },
  {
    icon: '⚖️',
    title: 'Droit et juridique',
    desc: "Comprendre vos droits simplement. Droit du travail, droit familial, démarches administratives expliquées clairement.",
    link: '/articles/fr/droit',
  },
  {
    icon: '❤️',
    title: 'Relations et amour de soi',
    desc: "Construire des relations saines et apprendre à s'aimer. Communication, limites, guérison émotionnelle.",
    link: '/articles/fr/relations',
  },
  {
    icon: '🌿',
    title: 'Médecine naturelle',
    desc: "Remèdes naturels et approches alternatives pour prendre soin de vous au quotidien.",
    link: '/boutique/en?category=natural-medicine',
  },
  {
    icon: '👶',
    title: 'Jeunes mamans',
    desc: "Guides pratiques pour la grossesse, la maternité et les premiers mois avec bébé. Conseils honnêtes et sans jugement.",
    link: '/boutique/en?category=young-mothers',
  },
  {
    icon: '🧓',
    title: 'Pour nos seniors',
    desc: "Forme et sérénité après 60 ans. Santé, bien-être, nutrition et vie active pour profiter pleinement de chaque jour.",
    link: '/boutique/en?category=seniors',
  },
  {
    icon: '✈️',
    title: 'Voyage',
    desc: "Planifiez vos voyages intelligemment. Guides pratiques, astuces budget et planificateurs pour voyager léger et malin.",
    link: '/boutique/en?category=travel',
  },
];

export default function DomainesPage() {
  return (
    <>
      <section className="hero" style={{ padding: '60px 24px' }}>
        <h1 style={{ fontSize: '2.4rem', marginBottom: '16px' }}>Nos domaines</h1>
        <p style={{ maxWidth: '600px', margin: '0 auto' }}>
          Des solutions pratiques et accessibles pour améliorer votre quotidien dans plusieurs domaines essentiels.
        </p>
      </section>

      <section className="section">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: '20px',
          maxWidth: '1100px',
          margin: '0 auto',
        }}>
          {domaines.map((d, i) => (
            <Link
              key={i}
              href={d.link}
              style={{
                display: 'block',
                padding: '28px',
                border: '1px solid #e0e0e0',
                borderRadius: '12px',
                transition: 'box-shadow 0.2s, transform 0.15s',
                background: '#fff',
              }}
              className="article-card"
            >
              <div style={{ fontSize: '2rem', marginBottom: '12px' }}>{d.icon}</div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.2rem', fontWeight: '700', marginBottom: '8px', color: '#1a1a2e' }}>
                {d.title}
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#555', lineHeight: '1.6' }}>
                {d.desc}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
