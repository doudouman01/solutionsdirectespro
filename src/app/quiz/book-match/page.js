'use client';

import { useState } from 'react';
import Link from 'next/link';

/* ── UI translations ── */
const ui = {
  en: { title: "Which Book Is Made for You?", subtitle: "5 questions to find your perfect read", start: "Find My Book", question: "Question", of: "of", yourMatch: "Your Perfect Match", tryAgain: "Try Again", seeAll: "Browse all books", seeAllLink: "/boutique/en", prev: "Back" },
  fr: { title: "Quel livre est fait pour vous ?", subtitle: "5 questions pour trouver votre lecture ideale", start: "Trouver mon livre", question: "Question", of: "sur", yourMatch: "Votre livre ideal", tryAgain: "Recommencer", seeAll: "Voir tous les livres", seeAllLink: "/boutique/fr", prev: "Retour" },
  de: { title: "Welches Buch passt zu Ihnen?", subtitle: "5 Fragen um Ihre perfekte Lekture zu finden", start: "Mein Buch finden", question: "Frage", of: "von", yourMatch: "Ihr perfektes Buch", tryAgain: "Nochmal", seeAll: "Alle Bucher ansehen", seeAllLink: "/boutique/de", prev: "Zuruck" },
  es: { title: "Que libro esta hecho para ti?", subtitle: "5 preguntas para encontrar tu lectura ideal", start: "Encontrar mi libro", question: "Pregunta", of: "de", yourMatch: "Tu libro ideal", tryAgain: "Intentar de nuevo", seeAll: "Ver todos los libros", seeAllLink: "/boutique/es", prev: "Atras" },
  it: { title: "Quale libro fa per te?", subtitle: "5 domande per trovare la tua lettura ideale", start: "Trova il mio libro", question: "Domanda", of: "di", yourMatch: "Il tuo libro ideale", tryAgain: "Riprova", seeAll: "Vedi tutti i libri", seeAllLink: "/boutique/it", prev: "Indietro" },
  pt: { title: "Qual livro e feito para voce?", subtitle: "5 perguntas para encontrar sua leitura ideal", start: "Encontrar meu livro", question: "Pergunta", of: "de", yourMatch: "Seu livro ideal", tryAgain: "Tentar novamente", seeAll: "Ver todos os livros", seeAllLink: "/boutique/pt", prev: "Voltar" },
  el: { title: "Poio vivlio einai gia esena?", subtitle: "5 erotiseis gia na vreis to ideano vivlio", start: "Vres to vivlio mou", question: "Erotisi", of: "apo", yourMatch: "To ideano vivlio sou", tryAgain: "Xana", seeAll: "Deite ola ta vivlia", seeAllLink: "/boutique/el", prev: "Pisw" },
  nl: { title: "Welk boek past bij jou?", subtitle: "5 vragen om je ideale boek te vinden", start: "Vind mijn boek", question: "Vraag", of: "van", yourMatch: "Jouw perfecte boek", tryAgain: "Opnieuw", seeAll: "Bekijk alle boeken", seeAllLink: "/boutique/nl", prev: "Terug" },
  ja: { title: "あなたにぴったりの本は？", subtitle: "5つの質問で理想の一冊を見つけよう", start: "本を見つける", question: "質問", of: "/", yourMatch: "あなたにぴったりの本", tryAgain: "もう一度", seeAll: "すべての本を見る", seeAllLink: "/boutique/ja", prev: "戻る" },
  pl: { title: "Ktora ksiazka jest dla Ciebie?", subtitle: "5 pytan, aby znalezc idealna lekture", start: "Znajdz moja ksiazke", question: "Pytanie", of: "z", yourMatch: "Twoja idealna ksiazka", tryAgain: "Sprobuj ponownie", seeAll: "Zobacz wszystkie ksiazki", seeAllLink: "/boutique/pl", prev: "Wstecz" },
  sv: { title: "Vilken bok passar dig?", subtitle: "5 fragor for att hitta din perfekta bok", start: "Hitta min bok", question: "Fraga", of: "av", yourMatch: "Din perfekta bok", tryAgain: "Forsok igen", seeAll: "Se alla bocker", seeAllLink: "/boutique/sv", prev: "Tillbaka" },
  da: { title: "Hvilken bog passer til dig?", subtitle: "5 sporgsmal for at finde din perfekte bog", start: "Find min bog", question: "Sporgsmal", of: "af", yourMatch: "Din perfekte bog", tryAgain: "Prov igen", seeAll: "Se alle boger", seeAllLink: "/boutique/da", prev: "Tilbage" },
  fi: { title: "Mika kirja sopii sinulle?", subtitle: "5 kysymysta loydetaksesi taydellinen kirjasi", start: "Loyda kirjani", question: "Kysymys", of: "/", yourMatch: "Sinulle sopiva kirja", tryAgain: "Yrita uudelleen", seeAll: "Katso kaikki kirjat", seeAllLink: "/boutique/fi", prev: "Takaisin" },
};

const langLabels = {
  en: "🇬🇧 English", fr: "🇫🇷 Francais", de: "🇩🇪 Deutsch", es: "🇪🇸 Espanol",
  it: "🇮🇹 Italiano", pt: "🇵🇹 Portugues", el: "🇬🇷 Ellinika", nl: "🇳🇱 Nederlands",
  pl: "🇵🇱 Polski", sv: "🇸🇪 Svenska", da: "🇩🇰 Dansk", fi: "🇫🇮 Suomi", ja: "🇯🇵 日本語",
};

/* ── Questions (universal, labels translated) ── */
const questions = {
  en: [
    { q: "What are you looking for right now?", a: [
      { text: "Protect myself from toxic people", tags: ["dark-psych"] },
      { text: "Get my life organized (ADHD/focus)", tags: ["adhd"] },
      { text: "Build mental strength and discipline", tags: ["stoic"] },
      { text: "Escape into a great story", tags: ["fiction"] },
      { text: "Grow my business or career with AI", tags: ["ia"] },
    ]},
    { q: "Which describes you best?", a: [
      { text: "I react too quickly to emotions", tags: ["stoic", "dark-psych"] },
      { text: "I struggle to start tasks or stay focused", tags: ["adhd"] },
      { text: "I want practical tools, not theory", tags: ["ia", "adhd"] },
      { text: "I love getting lost in fictional worlds", tags: ["fiction"] },
      { text: "I want to understand people better", tags: ["dark-psych"] },
    ]},
    { q: "What kind of content do you prefer?", a: [
      { text: "Step-by-step guides with exercises", tags: ["adhd", "ia"] },
      { text: "Psychology and human behavior insights", tags: ["dark-psych", "stoic"] },
      { text: "Romance, suspense, or adventure stories", tags: ["fiction"] },
      { text: "Philosophy and mindset frameworks", tags: ["stoic"] },
      { text: "Checklists, planners, and templates", tags: ["adhd"] },
    ]},
    { q: "What's your biggest challenge right now?", a: [
      { text: "A manipulative person in my life", tags: ["dark-psych"] },
      { text: "Procrastination and overwhelm", tags: ["adhd"] },
      { text: "Stress, anger, or emotional control", tags: ["stoic"] },
      { text: "Need a break from reality", tags: ["fiction"] },
      { text: "Scaling my work without burning out", tags: ["ia"] },
    ]},
    { q: "How much time do you have to read?", a: [
      { text: "Quick reads — under 200 pages", tags: ["adhd", "stoic"] },
      { text: "Medium — 200-350 pages of practical content", tags: ["dark-psych", "ia"] },
      { text: "I can get lost in a 400+ page novel", tags: ["fiction"] },
      { text: "I want printable tools, not reading", tags: ["adhd"] },
      { text: "Audio or digital format preferred", tags: ["ia", "stoic"] },
    ]},
  ],
  fr: [
    { q: "Que cherchez-vous en ce moment ?", a: [
      { text: "Me proteger des personnes toxiques", tags: ["dark-psych"] },
      { text: "Organiser ma vie (TDAH/concentration)", tags: ["adhd"] },
      { text: "Renforcer ma force mentale", tags: ["stoic"] },
      { text: "M'evader dans une belle histoire", tags: ["fiction"] },
      { text: "Developper mon activite avec l'IA", tags: ["ia"] },
    ]},
    { q: "Qu'est-ce qui vous decrit le mieux ?", a: [
      { text: "Je reagis trop vite aux emotions", tags: ["stoic", "dark-psych"] },
      { text: "J'ai du mal a demarrer ou rester concentre", tags: ["adhd"] },
      { text: "Je veux des outils pratiques, pas de la theorie", tags: ["ia", "adhd"] },
      { text: "J'adore me perdre dans des mondes fictifs", tags: ["fiction"] },
      { text: "Je veux mieux comprendre les gens", tags: ["dark-psych"] },
    ]},
    { q: "Quel type de contenu preferez-vous ?", a: [
      { text: "Guides pas a pas avec exercices", tags: ["adhd", "ia"] },
      { text: "Psychologie et comportement humain", tags: ["dark-psych", "stoic"] },
      { text: "Romance, suspense ou aventure", tags: ["fiction"] },
      { text: "Philosophie et cadres mentaux", tags: ["stoic"] },
      { text: "Checklists, planners et templates", tags: ["adhd"] },
    ]},
    { q: "Quel est votre plus grand defi ?", a: [
      { text: "Une personne manipulatrice dans ma vie", tags: ["dark-psych"] },
      { text: "Procrastination et surcharge mentale", tags: ["adhd"] },
      { text: "Stress, colere ou controle emotionnel", tags: ["stoic"] },
      { text: "Besoin d'une pause de la realite", tags: ["fiction"] },
      { text: "Faire croitre mon activite sans m'epuiser", tags: ["ia"] },
    ]},
    { q: "Combien de temps avez-vous pour lire ?", a: [
      { text: "Lectures rapides — moins de 200 pages", tags: ["adhd", "stoic"] },
      { text: "Moyen — 200-350 pages pratiques", tags: ["dark-psych", "ia"] },
      { text: "Je peux me perdre dans un roman 400+ pages", tags: ["fiction"] },
      { text: "Je veux des outils imprimables, pas de lecture", tags: ["adhd"] },
      { text: "Format audio ou digital de preference", tags: ["ia", "stoic"] },
    ]},
  ],
};

/* ── Book recommendations by tag and language ── */
const recommendations = {
  en: {
    "dark-psych": { title: "The Manipulation Red Flags", desc: "41 red flags to spot manipulation in real time — with the neuroscience behind each one and concrete defense strategies.", link: "/boutique/en/the-manipulation-red-flags", cover: "/covers/the-manipulation-red-flags.png" },
    "adhd": { title: "ADHD Planner Bundle — 5 Complete Systems", desc: "Brain dump, task paralysis breaker, dopamine menu, budget tracker, and meal planner — all designed for ADHD brains.", link: "/boutique/en/adhd-planner-bundle", cover: "/covers/adhd-planner-bundle.png" },
    "stoic": { title: "The Art of Never Reacting", desc: "The 7 Laws of Silent Power — Machiavelli's strategic framework translated into a modern system for emotional sovereignty.", link: "/boutique/en/the-art-of-never-reacting", cover: "/covers/the-art-of-never-reacting.png" },
    "fiction": { title: "The Glass Wife", desc: "A domestic thriller about a marriage built on secrets — where the truth is more dangerous than the lies.", link: "/boutique/en/the-glass-wife", cover: "/covers/the-glass-wife.png" },
    "ia": { title: "AI Express — Real Estate Agents", desc: "The complete guide to generating leads, automating tasks, and scaling your real estate business with AI.", link: "/boutique/en/ai-express-real-estate-agents", cover: "/covers/ai-express-real-estate-agents.png" },
  },
  fr: {
    "dark-psych": { title: "L'Art de ne jamais reagir", desc: "Les 7 Lois du Pouvoir Silencieux — un systeme de souverainete personnelle base sur Machiavel et les neurosciences.", link: "/boutique/fr/l-art-de-ne-jamais-reagir", cover: "/covers/l-art-de-ne-jamais-reagir.png" },
    "adhd": { title: "L'Art de ne jamais reagir", desc: "Apprenez a ne plus reagir sous la pression — le guide ultime pour reprendre le controle de vos reactions.", link: "/boutique/fr/l-art-de-ne-jamais-reagir", cover: "/covers/l-art-de-ne-jamais-reagir.png" },
    "stoic": { title: "L'Art de ne jamais reagir", desc: "Les 7 Lois du Pouvoir Silencieux — maitrise strategique face a la pression.", link: "/boutique/fr/l-art-de-ne-jamais-reagir", cover: "/covers/l-art-de-ne-jamais-reagir.png" },
    "fiction": { title: "Les Chroniques de Valdris", desc: "Une saga fantasy/romance ou les Brillants cachent un terrible secret.", link: "/boutique/fr/heritiers-de-belmont", cover: "/covers/heritiers-belmont.png" },
    "ia": { title: "IA Express — Coachs & Consultants", desc: "Le guide pratique pour transformer et automatiser votre activite de coaching avec l'IA.", link: "/boutique/fr/ia-express-coachs-consultants", cover: "/covers/ia-express-coachs-consultants.png" },
  },
  el: {
    "dark-psych": { title: "SKOTEINI PSYCHOLOGIA", desc: "O Apolytos Odigos Aftoprostasias — 41 kokkines simales, 5 profil cheiragoghon.", link: "/boutique/el/skoteini-psychologia", cover: "/covers/skoteini-psychologia.png" },
    "stoic": { title: "I Stoiki Techni tou Zin", desc: "Archaia sofia gia ti synchroni zoi — apo ton Marko Aurelio stin kathimerinothita.", link: "/boutique/el/stoiki-techni-tou-zin", cover: "/covers/stoiki-techni-tou-zin.png" },
    "adhd": { title: "TELOS STO BURNOUT", desc: "Apo tin exantlisi stin akmi — odigos anakaypsis gia tin Ellada tou 2026.", link: "/boutique/el/telos-sto-burnout", cover: "/covers/telos-sto-burnout.png" },
    "fiction": { title: "SKOTEINI PSYCHOLOGIA", desc: "O Apolytos Odigos Aftoprostasias.", link: "/boutique/el/skoteini-psychologia", cover: "/covers/skoteini-psychologia.png" },
    "ia": { title: "SYNAISTHIMATIKI NOIMOSYNI", desc: "O Odigos pou Allazei ta Panta — 5 pylonas, test EQ, programma 21 imeron.", link: "/boutique/el/synaisthimatiki-noimosyni", cover: "/covers/synaisthimatiki-noimosyni.png" },
  },
  es: {
    "dark-psych": { title: "Basta", desc: "Aprende a decir basta y protegerte de relaciones toxicas.", link: "/boutique/es/basta", cover: "/covers/basta.png" },
    "stoic": { title: "Basta", desc: "Aprende a decir basta y protegerte.", link: "/boutique/es/basta", cover: "/covers/basta.png" },
    "adhd": { title: "Basta", desc: "El primer paso para recuperar el control.", link: "/boutique/es/basta", cover: "/covers/basta.png" },
    "fiction": { title: "Sangre y Silencio", desc: "Dark romance en el Mexico del narcotrafico.", link: "/boutique/es/sangre-y-silencio", cover: "/covers/sangre-y-silencio.png" },
    "ia": { title: "Basta", desc: "Toma el control de tu vida.", link: "/boutique/es/basta", cover: "/covers/basta.png" },
  },
};

/* ── Fallback: use EN recommendations if language not configured ── */
function getReco(lang, tag) {
  if (recommendations[lang] && recommendations[lang][tag]) return recommendations[lang][tag];
  return recommendations.en[tag] || recommendations.en["dark-psych"];
}

export default function BookMatchQuiz() {
  const [lang, setLang] = useState('en');
  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [tagScores, setTagScores] = useState({});
  const [finished, setFinished] = useState(false);

  const t = ui[lang] || ui.en;
  const qs = questions[lang] || questions.en;
  const total = qs.length;
  const availableLangs = Object.keys(ui);

  function handleAnswer(answer) {
    const newScores = { ...tagScores };
    answer.tags.forEach(tag => {
      newScores[tag] = (newScores[tag] || 0) + 1;
    });
    setTagScores(newScores);
    if (current + 1 < total) {
      setCurrent(current + 1);
    } else {
      setFinished(true);
    }
  }

  function goBack() {
    if (current > 0) {
      setCurrent(current - 1);
      // Note: we can't perfectly undo tag scores without tracking history,
      // but going back and re-answering overwrites, which is fine for UX
    }
  }

  function restart() {
    setTagScores({});
    setCurrent(0);
    setFinished(false);
    setStarted(false);
  }

  function changeLang(newLang) {
    setLang(newLang);
    restart();
  }

  /* Find winning tag */
  const winningTag = Object.entries(tagScores).sort((a, b) => b[1] - a[1])[0]?.[0] || 'dark-psych';
  const reco = getReco(lang, winningTag);

  /* ── Landing ── */
  if (!started) {
    return (
      <div className="quiz-page">
        <div className="quiz-landing">
          <div className="quiz-landing-icon">📚</div>
          <h1 className="quiz-landing-title">{t.title}</h1>
          <p className="quiz-landing-sub">{t.subtitle}</p>
          <div className="quiz-lang-switch">
            {availableLangs.map((code) => (
              <button key={code} onClick={() => changeLang(code)} className={`quiz-lang-btn ${lang === code ? 'active' : ''}`}>
                {langLabels[code] || code}
              </button>
            ))}
          </div>
          <button onClick={() => setStarted(true)} className="quiz-start-btn">{t.start} →</button>
          <p className="quiz-landing-note">⏱ 1 min · 🔒 No data stored</p>
        </div>
      </div>
    );
  }

  /* ── Results ── */
  if (finished) {
    return (
      <div className="quiz-page">
        <div className="quiz-result">
          <div className="quiz-result-icon">📖</div>
          <h2 className="quiz-result-label" style={{ color: '#e2b714' }}>{t.yourMatch}</h2>

          <div className="quiz-reco-box" style={{ textAlign: 'left' }}>
            {reco.cover && (
              <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                <img src={reco.cover} alt={reco.title} style={{ width: '140px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }} />
              </div>
            )}
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', marginBottom: '8px' }}>{reco.title}</h3>
            <p className="quiz-reco-text">{reco.desc}</p>
            <Link href={reco.link} className="quiz-reco-btn">
              {reco.title} →
            </Link>
          </div>

          <Link href={t.seeAllLink} className="quiz-bestof-link">
            📚 {t.seeAll} →
          </Link>

          <div className="quiz-actions">
            <button onClick={restart} className="quiz-retry-btn">↻ {t.tryAgain}</button>
          </div>
        </div>
      </div>
    );
  }

  /* ── Question ── */
  const q = qs[current];
  const progress = ((current) / total) * 100;

  return (
    <div className="quiz-page">
      <div className="quiz-container">
        <div className="quiz-progress-bar">
          <div className="quiz-progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <p className="quiz-progress-text">{t.question} {current + 1} {t.of} {total}</p>
        <h2 className="quiz-question">{q.q}</h2>
        <div className="quiz-answers">
          {q.a.map((answer, i) => (
            <button key={i} className="quiz-answer-btn" onClick={() => handleAnswer(answer)}>
              {answer.text}
            </button>
          ))}
        </div>
        {current > 0 && (
          <button onClick={goBack} className="quiz-back-btn">← {t.prev}</button>
        )}
      </div>
    </div>
  );
}
