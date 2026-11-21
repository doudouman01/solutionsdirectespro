import Link from 'next/link';

/* ── Translated quiz banners for all 13 languages ── */
const quizT = {
  en: {
    bookMatch: { title: "📚 Which Book Is Right for You?", desc: "Take our 1-minute quiz and get a personalized recommendation.", cta: "Find My Book →" },
    manipulation: { title: "🧠 Are You Vulnerable to Manipulation?", desc: "15 questions to discover your psychological defense level.", cta: "Take the Test →" },
    both: { title: "🎯 Free Interactive Quizzes", subtitle: "Discover something about yourself in under 2 minutes." },
  },
  fr: {
    bookMatch: { title: "📚 Quel livre est fait pour vous ?", desc: "Quiz d'1 minute pour une recommandation personnalisée.", cta: "Trouver mon livre →" },
    manipulation: { title: "🧠 Êtes-vous vulnérable à la manipulation ?", desc: "15 questions pour évaluer vos défenses psychologiques.", cta: "Faire le test →" },
    both: { title: "🎯 Quiz interactifs gratuits", subtitle: "Découvrez quelque chose sur vous-même en moins de 2 minutes." },
  },
  de: {
    bookMatch: { title: "📚 Welches Buch passt zu Ihnen?", desc: "1-Minuten-Quiz für eine persönliche Empfehlung.", cta: "Mein Buch finden →" },
    manipulation: { title: "🧠 Sind Sie anfällig für Manipulation?", desc: "15 Fragen um Ihr Verteidigungsniveau zu entdecken.", cta: "Test starten →" },
    both: { title: "🎯 Kostenlose interaktive Quizze", subtitle: "Entdecken Sie etwas über sich selbst in unter 2 Minuten." },
  },
  es: {
    bookMatch: { title: "📚 ¿Qué libro es para ti?", desc: "Quiz de 1 minuto para una recomendación personalizada.", cta: "Encontrar mi libro →" },
    manipulation: { title: "🧠 ¿Eres vulnerable a la manipulación?", desc: "15 preguntas para descubrir tu nivel de defensa.", cta: "Hacer el test →" },
    both: { title: "🎯 Quizzes interactivos gratis", subtitle: "Descubre algo sobre ti mismo en menos de 2 minutos." },
  },
  it: {
    bookMatch: { title: "📚 Quale libro fa per te?", desc: "Quiz di 1 minuto per una raccomandazione personalizzata.", cta: "Trova il mio libro →" },
    manipulation: { title: "🧠 Sei vulnerabile alla manipolazione?", desc: "15 domande per scoprire il tuo livello di difesa.", cta: "Fai il test →" },
    both: { title: "🎯 Quiz interattivi gratuiti", subtitle: "Scopri qualcosa su di te in meno di 2 minuti." },
  },
  pt: {
    bookMatch: { title: "📚 Qual livro é certo para você?", desc: "Quiz de 1 minuto para uma recomendação personalizada.", cta: "Encontrar meu livro →" },
    manipulation: { title: "🧠 Você é vulnerável à manipulação?", desc: "15 perguntas para descobrir seu nível de defesa.", cta: "Fazer o teste →" },
    both: { title: "🎯 Quizzes interativos grátis", subtitle: "Descubra algo sobre você em menos de 2 minutos." },
  },
  el: {
    bookMatch: { title: "📚 Ποιο βιβλίο σου ταιριάζει;", desc: "Quiz 1 λεπτού για προσωπική σύσταση.", cta: "Βρες το βιβλίο μου →" },
    manipulation: { title: "🧠 Είσαι ευάλωτος στη χειραγώγηση;", desc: "15 ερωτήσεις για το επίπεδο άμυνάς σου.", cta: "Κάνε το τεστ →" },
    both: { title: "🎯 Δωρεάν διαδραστικά κουίζ", subtitle: "Ανακάλυψε κάτι για τον εαυτό σου σε λιγότερο από 2 λεπτά." },
  },
  nl: {
    bookMatch: { title: "📚 Welk boek past bij jou?", desc: "1-minuut quiz voor een persoonlijk advies.", cta: "Vind mijn boek →" },
    manipulation: { title: "🧠 Ben jij kwetsbaar voor manipulatie?", desc: "15 vragen om je verdedigingsniveau te ontdekken.", cta: "Start de test →" },
    both: { title: "🎯 Gratis interactieve quizzen", subtitle: "Ontdek iets over jezelf in minder dan 2 minuten." },
  },
  pl: {
    bookMatch: { title: "📚 Która książka jest dla Ciebie?", desc: "1-minutowy quiz dla spersonalizowanej rekomendacji.", cta: "Znajdź moją książkę →" },
    manipulation: { title: "🧠 Czy jesteś podatny na manipulację?", desc: "15 pytań aby odkryć swój poziom obrony.", cta: "Rozpocznij test →" },
    both: { title: "🎯 Darmowe interaktywne quizy", subtitle: "Odkryj coś o sobie w mniej niż 2 minuty." },
  },
  sv: {
    bookMatch: { title: "📚 Vilken bok passar dig?", desc: "1-minuts quiz för en personlig rekommendation.", cta: "Hitta min bok →" },
    manipulation: { title: "🧠 Är du sårbar för manipulation?", desc: "15 frågor för att upptäcka din försvarsnivå.", cta: "Starta testet →" },
    both: { title: "🎯 Gratis interaktiva quiz", subtitle: "Upptäck något om dig själv på under 2 minuter." },
  },
  da: {
    bookMatch: { title: "📚 Hvilken bog passer til dig?", desc: "1-minuts quiz for en personlig anbefaling.", cta: "Find min bog →" },
    manipulation: { title: "🧠 Er du sårbar over for manipulation?", desc: "15 spørgsmål for at opdage dit forsvarsniveau.", cta: "Start testen →" },
    both: { title: "🎯 Gratis interaktive quizzer", subtitle: "Opdag noget om dig selv på under 2 minutter." },
  },
  fi: {
    bookMatch: { title: "📚 Mikä kirja sopii sinulle?", desc: "1 minuutin testi henkilökohtaiseen suositukseen.", cta: "Löydä kirjani →" },
    manipulation: { title: "🧠 Oletko altis manipulaatiolle?", desc: "15 kysymystä puolustustasosi selvittämiseksi.", cta: "Aloita testi →" },
    both: { title: "🎯 Ilmaiset interaktiiviset testit", subtitle: "Löydä jotain itsestäsi alle 2 minuutissa." },
  },
  ja: {
    bookMatch: { title: "📚 あなたにぴったりの本は？", desc: "1分のクイズでパーソナライズされた推薦を。", cta: "私の本を見つける →" },
    manipulation: { title: "🧠 操作されやすいですか？", desc: "心理的防御レベルを発見する15の質問。", cta: "テスト開始 →" },
    both: { title: "🎯 無料インタラクティブクイズ", subtitle: "2分以内に自分について何かを発見しましょう。" },
  },
};

function getT(lang) {
  return quizT[lang] || quizT.en;
}

/* ── Single quiz banner (for articles/boutique) ── */
export function QuizBannerSingle({ lang, type = 'bookMatch' }) {
  const t = getT(lang);
  const data = t[type];
  const href = type === 'manipulation' ? '/quiz/manipulation-test' : '/quiz/book-match';

  return (
    <div className="quiz-banner">
      <div className="quiz-banner-inner">
        <div className="quiz-banner-text">
          <h3>{data.title}</h3>
          <p>{data.desc}</p>
        </div>
        <Link href={href} className="quiz-banner-cta">{data.cta}</Link>
      </div>
    </div>
  );
}

/* ── Double quiz banner (for home page) ── */
export function QuizBannerDouble({ lang = 'fr' }) {
  const t = getT(lang);

  return (
    <div className="quiz-section">
      <h2 className="section-title">{t.both.title}</h2>
      <p className="section-subtitle">{t.both.subtitle}</p>
      <div className="quiz-cards">
        <Link href="/quiz/book-match" className="quiz-card quiz-card-book">
          <span className="quiz-card-icon">📚</span>
          <h3>{t.bookMatch.title.replace('📚 ', '')}</h3>
          <p>{t.bookMatch.desc}</p>
          <span className="quiz-card-cta">{t.bookMatch.cta}</span>
        </Link>
        <Link href="/quiz/manipulation-test" className="quiz-card quiz-card-manip">
          <span className="quiz-card-icon">🧠</span>
          <h3>{t.manipulation.title.replace('🧠 ', '')}</h3>
          <p>{t.manipulation.desc}</p>
          <span className="quiz-card-cta">{t.manipulation.cta}</span>
        </Link>
      </div>
    </div>
  );
}
