import Link from 'next/link';
import { languages } from '../../../../lib/config';
import { getArticles, getCategoriesWithCounts } from '../../../../lib/articles';

const categoryDescriptions = {
  en: {
    health: "Evidence-based guides on women's health, perimenopause, pregnancy after 35, and natural wellness strategies. Practical information to help you make informed decisions about your body.",
    finances: "Understand the psychology behind your financial habits. From money anxiety to self-sabotage patterns, these guides help you build a healthier relationship with money.",
    relationships: "Explore the dynamics that shape your relationships — with partners, with family, and with yourself. From self-love to setting boundaries, find clarity here.",
    entertainment: "Book recommendations, genre deep-dives, and reading guides. Discover your next literary obsession across cozy mysteries, dark romance, psychological horror, and more.",
    law: "Understanding your legal rights and the justice system. From wrongful convictions to everyday legal questions, get clear information without the jargon.",
    housing: "Practical advice on housing, home security, and creating a safe living environment.",
    employment: "Career guidance, job search strategies, and professional development tips.",
  },
  fr: {
    sante: "Des guides pratiques sur la sante, la perte de poids apres 40 ans, et le bien-etre au quotidien. Des informations fiables pour prendre soin de vous a chaque etape de la vie.",
    logement: "Conseils pratiques sur le logement, la securite domestique et la protection de votre espace de vie.",
    relations: "Explorez les dynamiques familiales, les secrets de famille et les relations qui faconnent votre vie. Des cles pour comprendre et avancer.",
    finances: "Comprendre votre rapport a l'argent et developper des habitudes financieres saines.",
    emploi: "Conseils pour votre carriere, recherche d'emploi et developpement professionnel.",
    droit: "Comprendre vos droits et naviguer le systeme juridique avec clarte.",
  },
  de: {
    gesundheit: "Praktische Ratgeber zu Gesundheit, Ernaehrung, Meal Prep und Wohlbefinden. Evidenzbasierte Informationen fuer ein gesundes Leben in jedem Alter.",
    beziehungen: "Von toxischen Beziehungen bis zur Selbstliebe — verstehen Sie die Dynamiken, die Ihr Leben praegen, und finden Sie Wege zu gesunderen Beziehungen.",
    finanzen: "Verstehen Sie die Psychologie hinter Ihren finanziellen Entscheidungen und bauen Sie eine gesunde Beziehung zu Geld auf.",
    arbeit: "Karrieretipps, Bewerbungsstrategien und berufliche Weiterentwicklung.",
    recht: "Rechtliche Informationen klar und verstaendlich erklaert.",
    wohnen: "Praktische Ratgeber rund um Wohnen, Sicherheit und Lebensqualitaet.",
  },
  es: {
    relaciones: "Guias para entender las dinamicas de pareja, establecer limites sanos y construir relaciones que te hagan crecer en lugar de desaparecer.",
    entretenimiento: "Recomendaciones de libros, guias de generos literarios y descubrimientos para tu proxima lectura favorita.",
    salud: "Consejos practicos sobre salud, bienestar y calidad de vida.",
    finanzas: "Entiende tu relacion con el dinero y desarrolla habitos financieros saludables.",
    empleo: "Guias para tu carrera profesional y desarrollo laboral.",
    derecho: "Informacion legal clara y accesible.",
    vivienda: "Consejos sobre vivienda, seguridad del hogar y calidad de vida.",
  },
  pt: {
    entretenimento: "Mergulhe no folclore brasileiro, nas lendas amazonicas e descubra historias que vao muito alem do que voce conhece. Recomendacoes de leitura para quem busca algo diferente.",
    saude: "Guias praticos sobre saude, bem-estar e qualidade de vida.",
    relacionamentos: "Entenda as dinamicas que moldam seus relacionamentos e encontre caminhos para relacoes mais saudaveis.",
    financas: "Compreenda sua relacao com o dinheiro e desenvolva habitos financeiros saudaveis.",
    emprego: "Dicas de carreira, busca de emprego e desenvolvimento profissional.",
    moradia: "Conselhos praticos sobre moradia e seguranca residencial.",
    direito: "Informacoes juridicas claras e acessiveis.",
  },
  it: {
    relazioni: "Guide per comprendere le dinamiche relazionali, riconoscere i segnali tossici e costruire rapporti piu sani con gli altri e con se stessi.",
    salute: "Guide pratiche su salute, benessere e qualita della vita.",
    finanze: "Comprendi il tuo rapporto con il denaro e sviluppa abitudini finanziarie sane.",
    lavoro: "Consigli di carriera e sviluppo professionale.",
    diritto: "Informazioni legali chiare e accessibili.",
    alloggio: "Consigli pratici su alloggio e sicurezza domestica.",
  },
  nl: {
    entertainment: "Ontdek de duistere kant van Nederlandse folklore, vergeten geschiedenissen en boeken die je niet meer loslaten.",
    financien: "Begrijp uw relatie met geld en ontwikkel gezonde financiele gewoonten.",
    werk: "Carrieretips en professionele ontwikkeling.",
  },
  da: {
    underholdning: "Dyk ned i nordisk historie, vikingelegender og fortaellinger der fanger dig fra foerste side. Boganbefalinger og litteraere opdagelser.",
    arbejde: "Karrieretips og professionel udvikling.",
    finans: "Forstaa dit forhold til penge og udvikl sunde oekonomiske vaner.",
  },
  fi: {
    viihde: "Sukella suomalaiseen mytologiaan, metsan salaisuuksiin ja tarinoihin jotka jaeavat sinut valveille. Kirjasuosituksia ja kirjallisia loeytoejae.",
    talous: "Ymmaerrrae suhtautumisesi rahaan ja kehitae terveita taloudellisia tapoja.",
    tyo: "Uravinkkejae ja ammatillista kehitystae.",
  },
  sv: {
    underhallning: "Utforska svenska vattenlegender, nordisk folklore och berattelser som haaller dig vaken laengt efter sista sidan.",
    arbete: "Karriaertips och professionell utveckling.",
    ekonomi: "Foerstaa ditt foerhaallande till pengar och utveckla sunda ekonomiska vanor.",
  },
  pl: {
    rozrywka: "Zanurz sie w slowianskiej mitologii, polskich legendach i historiach, ktore nie pozwola ci odlozyc ksiazki. Rekomendacje czytelnicze i literackie odkrycia.",
    finanse: "Zrozum swoj stosunek do pieniedzy i rozwin zdrowe nawyki finansowe.",
    praca: "Wskazowki dotyczace kariery i rozwoju zawodowego.",
  },
};

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
  const desc = categoryDescriptions[params.lang]?.[params.category] || '';
  return {
    title: `${catLabel} — ${langConfig.articlesLabel} — Solutions Directes Pro`,
    description: desc || `${catLabel} — ${langConfig.articlesLabel}`,
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
  const description = categoryDescriptions[lang]?.[category] || '';

  return (
    <section className="section">
      <h1 className="section-title">{langConfig.flag} {catLabel}</h1>
      <p className="section-subtitle">{langConfig.articlesLabel}</p>

      {description && (
        <p style={{
          maxWidth: '720px',
          margin: '0 auto 32px',
          fontSize: '1.05rem',
          lineHeight: '1.7',
          color: '#555',
          textAlign: 'center',
        }}>
          {description}
        </p>
      )}

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
