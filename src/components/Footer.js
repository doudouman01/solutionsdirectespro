export default function Footer() {
  return (
    <footer className="site-footer">
      <p>© {new Date().getFullYear()} Solutions Directes Pro — Des solutions directes, partout dans le monde.</p>
      <p style={{ marginTop: '8px' }}>
        <a href="/mentions-legales">Mentions légales</a> · <a href="/confidentialite">Confidentialité</a> · <a href="/contact">Contact</a>
      </p>
      <p style={{ marginTop: '12px', fontSize: '0.85em' }}>
        Nos Sites : <a href="https://toolcraftkit.com" target="_blank" rel="noopener noreferrer">ToolCraftKit</a> · <a href="https://aigradelab.com" target="_blank" rel="noopener noreferrer">AIGradeLab</a>
      </p>
      <p style={{ marginTop: '10px', fontSize: '0.75em', color: '#999' }}>
        As an Amazon Associate, we earn from qualifying purchases. En tant que Partenaire Amazon, nous percevons des commissions sur les achats qualifiés.
      </p>
    </footer>
  );
}
