import Link from 'next/link';
import { languages } from '../lib/config';

export default function Header() {
  const langEntries = Object.entries(languages);

  return (
    <header className="site-header">
      <div className="header-main">
        <Link href="/" className="logo">
          <span className="logo-icon">⚡</span>
          <span>Solutions Directes Pro</span>
        </Link>

        <nav className="nav-main">
          <Link href="/">Accueil</Link>
          <Link href="/a-propos">À propos</Link>
          <Link href="/domaines">Domaines</Link>
          <Link href="/ressources">Ressources</Link>

          {/* Articles dropdown */}
          <div className="nav-dropdown">
            <span className="nav-dropdown-trigger">Articles</span>
            <div className="nav-dropdown-menu">
              {langEntries.map(([code, lang]) => (
                <Link key={code} href={`/articles/${code}`}>
                  {lang.flag} {lang.articlesLabel}
                </Link>
              ))}
            </div>
          </div>

          {/* Boutique dropdown */}
          <div className="nav-dropdown">
            <span className="nav-dropdown-trigger">Boutique</span>
            <div className="nav-dropdown-menu">
              {langEntries.map(([code, lang]) => (
                <Link key={code} href={`/boutique/${code}`}>
                  {lang.flag} {lang.label}
                </Link>
              ))}
            </div>
          </div>

          <Link href="/blogs">Blogs</Link>
        </nav>
      </div>

      {/* Language bar */}
      <div className="lang-bar">
        <div className="lang-bar-inner">
          {langEntries.map(([code, lang]) => (
            <Link key={code} href={`/articles/${code}`} className="lang-pill">
              {lang.flag} {lang.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
