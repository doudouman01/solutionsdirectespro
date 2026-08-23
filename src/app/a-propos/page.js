import Link from 'next/link';

export const metadata = {
  title: 'À propos — Solutions Directes Pro',
  description: 'Découvrez Solutions Directes Pro, une plateforme multilingue qui vous guide pas à pas pour résoudre vos problèmes quotidiens.',
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="hero" style={{ padding: '60px 24px' }}>
        <h1 style={{ fontSize: '2.4rem', marginBottom: '16px' }}>
          À propos de Solutions Directes Pro
        </h1>
        <p style={{ maxWidth: '600px', margin: '0 auto' }}>
          Une plateforme internationale offrant des solutions concrètes et accessibles
          pour améliorer votre quotidien dans divers domaines essentiels.
        </p>
      </section>

      {/* Mission */}
      <section className="section">
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 className="section-title">Notre mission</h2>
          <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: '#555', marginBottom: '20px' }}>
            Chez Solutions Directes Pro, nous croyons que chaque personne mérite un accès
            simple et direct aux informations qui peuvent changer sa vie. Que ce soit pour
            gérer ses finances, trouver un emploi, prendre soin de sa santé ou améliorer
            ses relations, nous proposons des guides pratiques, des plans d'action concrets
            et des ebooks adaptés à vos besoins.
          </p>
          <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: '#555', marginBottom: '20px' }}>
            Notre plateforme est disponible en 18 langues pour toucher un public international.
            Chaque contenu est pensé pour être actionnable — pas de théorie vague, que des
            solutions que vous pouvez appliquer aujourd'hui.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section style={{ background: '#f8f9fa', padding: '60px 24px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '32px', textAlign: 'center' }}>
          <div>
            <p style={{ fontSize: '2.5rem', fontWeight: '800', color: '#1a1a2e', fontFamily: "'Playfair Display', serif" }}>18</p>
            <p style={{ color: '#555', fontSize: '0.95rem' }}>Langues disponibles</p>
          </div>
          <div>
            <p style={{ fontSize: '2.5rem', fontWeight: '800', color: '#1a1a2e', fontFamily: "'Playfair Display', serif" }}>40+</p>
            <p style={{ color: '#555', fontSize: '0.95rem' }}>Livres et ebooks publiés</p>
          </div>
          <div>
            <p style={{ fontSize: '2.5rem', fontWeight: '800', color: '#1a1a2e', fontFamily: "'Playfair Display', serif" }}>8</p>
            <p style={{ color: '#555', fontSize: '0.95rem' }}>Domaines couverts</p>
          </div>
          <div>
            <p style={{ fontSize: '2.5rem', fontWeight: '800', color: '#1a1a2e', fontFamily: "'Playfair Display', serif" }}>12+</p>
            <p style={{ color: '#555', fontSize: '0.95rem' }}>Marchés Amazon</p>
          </div>
        </div>
      </section>

      {/* L'auteur */}
      <section className="section">
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 className="section-title">L'auteur</h2>
          <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: '#555', marginBottom: '20px' }}>
            Adrian Phoenix Vale est un auteur francophone international qui explore à travers
            ses écrits les zones d'ombre et de lumière de l'âme humaine. Ses récits mêlent
            émotion, réflexion et mystère, invitant chaque lecteur à une plongée intérieure.
          </p>
          <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: '#555', marginBottom: '20px' }}>
            Son écriture se nourrit des silences, des regards et des instants suspendus.
            Chaque roman est une exploration de la condition humaine — entre la force du destin,
            la beauté de la vulnérabilité et la quête de sens.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background: '#f8f9fa', padding: '60px 24px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 className="section-title">Questions fréquentes</h2>
          <div style={{ marginTop: '24px' }}>
            {[
              { q: "Qu'est-ce que Solutions Directes Pro ?", a: "Une plateforme internationale offrant des solutions concrètes pour les défis quotidiens en finances, emploi, santé, et plus." },
              { q: "Comment utiliser la plateforme ?", a: "Vous pouvez accéder à des guides pratiques, plans d'action et ebooks clairs pour agir efficacement dans plusieurs domaines essentiels." },
              { q: "Quels domaines sont couverts ?", a: "Finances, emploi, santé, logement, droit, relations, bien-être et retraite — pour un accompagnement complet et accessible." },
              { q: "En quelles langues le site est-il disponible ?", a: "Le site est disponible en 18 langues : français, anglais, allemand, espagnol, italien, portugais, néerlandais, suédois, danois, finnois, polonais, et bien d'autres." },
              { q: "Les ressources sont-elles gratuites ?", a: "Une grande partie des articles et guides sont accessibles gratuitement. Nos ebooks et romans sont disponibles à l'achat sur Amazon." },
              { q: "Comment contacter l'équipe ?", a: "Vous pouvez nous joindre via les réseaux sociaux ou par email pour toute question ou demande." },
            ].map((item, i) => (
              <div key={i} style={{ marginBottom: '20px', padding: '20px', background: '#fff', borderRadius: '8px', border: '1px solid #e0e0e0' }}>
                <p style={{ fontWeight: '600', fontSize: '1rem', marginBottom: '8px', color: '#1a1a2e' }}>{item.q}</p>
                <p style={{ fontSize: '0.92rem', color: '#555', lineHeight: '1.6' }}>{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{ textAlign: 'center' }}>
        <h2 className="section-title" style={{ textAlign: 'center' }}>Prêt à commencer ?</h2>
        <p className="section-subtitle" style={{ textAlign: 'center' }}>Explorez nos articles et notre boutique dans votre langue.</p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/articles/fr" className="hero-cta">Voir les articles</Link>
          <Link href="/boutique/en" className="hero-cta" style={{ background: '#1a1a2e', color: '#fff' }}>Visiter la boutique</Link>
        </div>
      </section>
    </>
  );
}
