'use client';

import { useState } from 'react';
import Link from 'next/link';

/* ── Quiz translations ── */
const ui = {
  en: {
    title: "Are You Vulnerable to Manipulation?",
    subtitle: "15 questions to discover your psychological defense level",
    start: "Start the Test",
    next: "Next",
    prev: "Back",
    seeResults: "See My Results",
    question: "Question",
    of: "of",
    yourScore: "Your Score",
    outOf: "out of",
    tryAgain: "Take the Test Again",
    shareText: "I scored {score}/60 on the Manipulation Vulnerability Test!",
    share: "Share My Result",
    readMore: "Read the full guide",
    guideLink: "/articles/en/relationships/dark-psychology-complete-guide-2026",
    levels: {
      high: { label: "High Vulnerability", color: "#dc3545", icon: "🔴", desc: "You are significantly exposed to manipulation tactics. Multiple areas of your psychological defenses need strengthening. The good news: awareness is the first step, and you just took it." },
      moderate: { label: "Moderate Vulnerability", color: "#fd7e14", icon: "🟠", desc: "You have some natural defenses but several blind spots that skilled manipulators can exploit. With targeted learning, you can close these gaps quickly." },
      low: { label: "Low Vulnerability", color: "#28a745", icon: "🟢", desc: "You have strong psychological defenses. You recognize most manipulation tactics and have strategies to counter them. Continue strengthening your skills." },
      minimal: { label: "Minimal Vulnerability", color: "#0d6efd", icon: "🔵", desc: "Excellent awareness and defense skills. You are very difficult to manipulate. Keep your skills sharp — the best defense is continuous learning." },
    },
    reco: {
      high: { text: "Start with the fundamentals — learn to identify the 41 red flags of manipulation before they escalate.", product: "The Manipulation Red Flags", link: "/boutique/en/the-manipulation-red-flags" },
      moderate: { text: "Build your strategic non-reaction skills — stop giving manipulators the emotional response they need.", product: "The Art of Never Reacting", link: "/boutique/en/the-art-of-never-reacting" },
      low: { text: "Advance your influence detection — master the 7 laws of ethical persuasion and their dark counterparts.", product: "The Influence Blueprint", link: "/boutique/en/the-influence-blueprint" },
      minimal: { text: "Complete your defense stack with nonverbal intelligence — read people before they even speak.", product: "The Body Language Decoder", link: "/boutique/en/the-body-language-decoder" },
    },
    bestOf: { text: "See all recommended books", link: "/articles/en/relationships/best-dark-psychology-books-2026" },
  },
  fr: {
    title: "Etes-vous vulnerable a la manipulation ?",
    subtitle: "15 questions pour decouvrir votre niveau de defense psychologique",
    start: "Commencer le test",
    next: "Suivant",
    prev: "Retour",
    seeResults: "Voir mes resultats",
    question: "Question",
    of: "sur",
    yourScore: "Votre score",
    outOf: "sur",
    tryAgain: "Refaire le test",
    shareText: "J'ai obtenu {score}/60 au test de vulnerabilite a la manipulation !",
    share: "Partager mon resultat",
    readMore: "Lire le guide complet",
    guideLink: "/articles/fr/relations/meilleurs-livres-psychologie-noire-2026",
    levels: {
      high: { label: "Vulnerabilite elevee", color: "#dc3545", icon: "🔴", desc: "Vous etes significativement expose aux tactiques de manipulation. Plusieurs zones de vos defenses psychologiques doivent etre renforcees. La bonne nouvelle : la prise de conscience est la premiere etape, et vous venez de la franchir." },
      moderate: { label: "Vulnerabilite moderee", color: "#fd7e14", icon: "🟠", desc: "Vous avez des defenses naturelles mais plusieurs angles morts que des manipulateurs habiles peuvent exploiter. Avec un apprentissage cible, vous pouvez combler ces lacunes rapidement." },
      low: { label: "Vulnerabilite faible", color: "#28a745", icon: "🟢", desc: "Vous avez des defenses psychologiques solides. Vous reconnaissez la plupart des tactiques de manipulation et avez des strategies pour y faire face." },
      minimal: { label: "Vulnerabilite minimale", color: "#0d6efd", icon: "🔵", desc: "Excellente conscience et competences de defense. Vous etes tres difficile a manipuler. Continuez a affuter vos competences." },
    },
    reco: {
      high: { text: "Commencez par les fondamentaux — apprenez a ne jamais reagir sous pression.", product: "L'Art de ne jamais reagir", link: "/boutique/fr/l-art-de-ne-jamais-reagir" },
      moderate: { text: "Renforcez votre maitrise strategique face aux tentatives de manipulation.", product: "L'Art de ne jamais reagir", link: "/boutique/fr/l-art-de-ne-jamais-reagir" },
      low: { text: "Perfectionnez votre arsenal avec notre guide complet de psychologie noire.", product: "L'Art de ne jamais reagir", link: "/boutique/fr/l-art-de-ne-jamais-reagir" },
      minimal: { text: "Gardez vos competences affutees avec le guide de reference.", product: "L'Art de ne jamais reagir", link: "/boutique/fr/l-art-de-ne-jamais-reagir" },
    },
    bestOf: { text: "Voir tous les livres recommandes", link: "/articles/fr/relations/meilleurs-livres-psychologie-noire-2026" },
  },
};

/* ── Questions (same in all languages, translated labels) ── */
const questions = {
  en: [
    { q: "When someone compliments you excessively early in a relationship, you:", a: ["Feel flattered and trust them more", "Enjoy it but don't think much about it", "Appreciate it while staying observant", "Recognize it as a potential love-bombing tactic"] },
    { q: "A friend repeatedly says 'That never happened' about something you clearly remember. You:", a: ["Start doubting your own memory", "Feel confused but eventually let it go", "Stand your ground but feel uneasy", "Recognize gaslighting and document what happened"] },
    { q: "Your boss asks you to work late again, saying 'No one else can do this.' You:", a: ["Feel special and immediately agree", "Agree reluctantly because you want to be helpful", "Agree but set a boundary for next time", "Recognize the flattery tactic and negotiate"] },
    { q: "Someone gives you an expensive gift early on, then asks for a 'small favor.' You:", a: ["Feel obligated to say yes", "Feel uncomfortable but agree anyway", "Consider it carefully before deciding", "Recognize the reciprocity trap and decide independently"] },
    { q: "During an argument, the other person suddenly starts crying. You:", a: ["Immediately apologize and drop the issue", "Feel guilty and soften your position significantly", "Pause to assess whether the emotions are proportional", "Continue the conversation calmly after acknowledging their feelings"] },
    { q: "A salesperson says 'This offer expires in 10 minutes.' You:", a: ["Rush to buy before you miss out", "Feel pressured but usually give in", "Take a moment to think but often cave", "Recognize artificial scarcity and walk away if unsure"] },
    { q: "Someone consistently interrupts you during meetings. You:", a: ["Stop speaking and defer to them", "Feel frustrated but say nothing", "Try to continue but often get talked over", "Address the pattern directly and hold your space"] },
    { q: "An ex texts 'I've changed, I miss you' after months of silence. You:", a: ["Feel a rush of emotion and respond immediately", "Think about it for days, torn between hope and caution", "Respond cautiously but keep the door open", "Evaluate the pattern objectively before deciding"] },
    { q: "You discover a friend has been talking about you behind your back. You:", a: ["Confront them emotionally, feeling betrayed", "Feel hurt and withdraw silently", "Address it directly but struggle with the confrontation", "Bring it up calmly and assess their response"] },
    { q: "Someone says 'If you really loved me, you would...' You:", a: ["Feel guilty and comply", "Feel conflicted but often give in", "Recognize the emotional pressure but struggle to resist", "Identify it as emotional blackmail and refuse to engage on those terms"] },
    { q: "A coworker takes credit for your work in front of management. You:", a: ["Say nothing to avoid conflict", "Feel angry but vent only to friends", "Mention it privately later but downplay it", "Document everything and address it strategically"] },
    { q: "Someone gives you the silent treatment after a disagreement. You:", a: ["Panic and repeatedly try to fix things", "Feel anxious and chase their attention", "Wait it out but feel unsettled", "Recognize it as a control tactic and maintain your position"] },
    { q: "You are asked to make an important decision 'right now, no time to think.' You:", a: ["Make the decision under pressure", "Feel stressed but usually comply", "Ask for a little time but accept if pushed", "Refuse to decide under artificial pressure"] },
    { q: "Someone consistently makes jokes at your expense in social settings. You:", a: ["Laugh along to fit in", "Feel hurt but say nothing", "Show discomfort but don't address it directly", "Call it out calmly and set a clear boundary"] },
    { q: "After reading these questions, how aware are you of manipulation tactics in your daily life?", a: ["I rarely think about whether I'm being manipulated", "I sometimes notice things feel 'off' but can't name why", "I recognize some tactics but struggle to respond effectively", "I can identify most tactics and have strategies to counter them"] },
  ],
  fr: [
    { q: "Quand quelqu'un vous couvre de compliments au debut d'une relation, vous :", a: ["Vous vous sentez flatte et lui faites confiance", "Vous appreciez mais n'y pensez pas trop", "Vous appreciez tout en restant vigilant", "Vous reconnaissez une tactique potentielle de love-bombing"] },
    { q: "Un ami repete 'Ca n'est jamais arrive' a propos de quelque chose dont vous vous souvenez clairement :", a: ["Vous commencez a douter de votre memoire", "Vous etes confus mais finissez par laisser tomber", "Vous maintenez votre position mais vous sentez mal a l'aise", "Vous reconnaissez le gaslighting et documentez ce qui s'est passe"] },
    { q: "Votre patron vous demande de rester tard encore une fois, en disant 'Personne d'autre ne peut faire ca' :", a: ["Vous vous sentez special et acceptez immediatement", "Vous acceptez a contrecoeur pour etre utile", "Vous acceptez mais posez une limite pour la prochaine fois", "Vous reconnaissez la tactique de flatterie et negociez"] },
    { q: "Quelqu'un vous offre un cadeau couteux puis demande une 'petite faveur' :", a: ["Vous vous sentez oblige de dire oui", "Vous etes mal a l'aise mais acceptez quand meme", "Vous y reflechissez avant de decider", "Vous reconnaissez le piege de la reciprocite et decidez librement"] },
    { q: "Pendant une dispute, l'autre personne se met soudainement a pleurer :", a: ["Vous vous excusez immediatement et abandonnez le sujet", "Vous vous sentez coupable et adoucissez votre position", "Vous faites une pause pour evaluer si les emotions sont proportionnees", "Vous continuez la conversation calmement apres avoir reconnu ses sentiments"] },
    { q: "Un vendeur dit 'Cette offre expire dans 10 minutes' :", a: ["Vous vous precipitez pour acheter", "Vous vous sentez presse mais cedez souvent", "Vous prenez un moment pour reflechir mais cedez parfois", "Vous reconnaissez la rarete artificielle et partez si vous n'etes pas sur"] },
    { q: "Quelqu'un vous interrompt systematiquement en reunion :", a: ["Vous arretez de parler et lui cedez la place", "Vous etes frustre mais ne dites rien", "Vous essayez de continuer mais vous faites souvent couper", "Vous adressez le probleme directement et tenez votre place"] },
    { q: "Un ex vous ecrit 'J'ai change, tu me manques' apres des mois de silence :", a: ["Vous ressentez un rush d'emotion et repondez immediatement", "Vous y pensez pendant des jours, tiraille entre espoir et prudence", "Vous repondez prudemment mais laissez la porte ouverte", "Vous evaluez le pattern objectivement avant de decider"] },
    { q: "Vous decouvrez qu'un ami parle de vous dans votre dos :", a: ["Vous le confrontez emotionnellement, vous sentant trahi", "Vous etes blesse et vous retirez silencieusement", "Vous en parlez directement mais peinez avec la confrontation", "Vous en parlez calmement et evaluez sa reaction"] },
    { q: "Quelqu'un dit 'Si tu m'aimais vraiment, tu ferais...' :", a: ["Vous vous sentez coupable et obtemperez", "Vous etes tiraille mais cedez souvent", "Vous reconnaissez la pression emotionnelle mais peinez a resister", "Vous identifiez le chantage emotionnel et refusez de jouer ce jeu"] },
    { q: "Un collegue s'attribue le merite de votre travail devant la direction :", a: ["Vous ne dites rien pour eviter le conflit", "Vous etes en colere mais n'en parlez qu'a vos amis", "Vous le mentionnez en prive mais minimisez", "Vous documentez tout et addressez le probleme strategiquement"] },
    { q: "Quelqu'un vous fait le traitement du silence apres un desaccord :", a: ["Vous paniquez et essayez de tout arranger", "Vous etes anxieux et cherchez son attention", "Vous attendez mais vous sentez destabilise", "Vous reconnaissez la tactique de controle et maintenez votre position"] },
    { q: "On vous demande de prendre une decision importante 'tout de suite, pas le temps de reflechir' :", a: ["Vous decidez sous la pression", "Vous etes stresse mais obtemperez", "Vous demandez un peu de temps mais acceptez si on insiste", "Vous refusez de decider sous pression artificielle"] },
    { q: "Quelqu'un fait regulierement des blagues a vos depens en public :", a: ["Vous riez pour vous integrer", "Vous etes blesse mais ne dites rien", "Vous montrez votre inconfort mais ne l'adressez pas", "Vous le signalez calmement et posez une limite claire"] },
    { q: "Apres avoir lu ces questions, a quel point etes-vous conscient des tactiques de manipulation dans votre vie quotidienne ?", a: ["Je pense rarement a savoir si on me manipule", "Je remarque parfois que quelque chose 'cloche' sans savoir pourquoi", "Je reconnais certaines tactiques mais peine a y repondre efficacement", "J'identifie la plupart des tactiques et j'ai des strategies pour y faire face"] },
  ],
};

/* ── Component ── */
export default function ManipulationQuiz() {
  const [lang, setLang] = useState('en');
  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [finished, setFinished] = useState(false);

  const t = ui[lang] || ui.en;
  const qs = questions[lang] || questions.en;
  const total = qs.length;

  function handleAnswer(answerIndex) {
    const newAnswers = [...answers, answerIndex];
    setAnswers(newAnswers);
    if (current + 1 < total) {
      setCurrent(current + 1);
    } else {
      setFinished(true);
    }
  }

  function goBack() {
    if (current > 0) {
      const newAnswers = [...answers];
      newAnswers.pop();
      setAnswers(newAnswers);
      setCurrent(current - 1);
    }
  }

  function restart() {
    setAnswers([]);
    setCurrent(0);
    setFinished(false);
    setStarted(false);
  }

  /* Score: each answer is 0-3 (index), total max = 15 * 3 = 45, scaled to 60 */
  const rawScore = answers.reduce((sum, a) => sum + a, 0);
  const score = Math.round((rawScore / (total * 3)) * 60);
  const level = score <= 15 ? 'high' : score <= 30 ? 'moderate' : score <= 45 ? 'low' : 'minimal';
  const pct = Math.round((score / 60) * 100);

  /* ── Landing page ── */
  if (!started) {
    return (
      <div className="quiz-page">
        <div className="quiz-landing">
          <div className="quiz-landing-icon">🧠</div>
          <h1 className="quiz-landing-title">{t.title}</h1>
          <p className="quiz-landing-sub">{t.subtitle}</p>
          <div className="quiz-lang-switch">
            <button onClick={() => setLang('en')} className={`quiz-lang-btn ${lang === 'en' ? 'active' : ''}`}>🇬🇧 English</button>
            <button onClick={() => setLang('fr')} className={`quiz-lang-btn ${lang === 'fr' ? 'active' : ''}`}>🇫🇷 Francais</button>
          </div>
          <button onClick={() => setStarted(true)} className="quiz-start-btn">{t.start} →</button>
          <p className="quiz-landing-note">⏱ 3-5 min · 🔒 No data stored</p>
        </div>
      </div>
    );
  }

  /* ── Results page ── */
  if (finished) {
    const lvl = t.levels[level];
    const reco = t.reco[level];
    return (
      <div className="quiz-page">
        <div className="quiz-result">
          <div className="quiz-result-icon">{lvl.icon}</div>
          <h2 className="quiz-result-label" style={{ color: lvl.color }}>{lvl.label}</h2>
          <div className="quiz-result-score">
            <div className="quiz-score-circle" style={{ background: `conic-gradient(${lvl.color} ${pct}%, #e0e0e0 ${pct}%)` }}>
              <span className="quiz-score-number">{score}<small>/60</small></span>
            </div>
          </div>
          <p className="quiz-result-desc">{lvl.desc}</p>

          <div className="quiz-reco-box">
            <p className="quiz-reco-text">📖 {reco.text}</p>
            <Link href={reco.link} className="quiz-reco-btn">
              {reco.product} →
            </Link>
          </div>

          <Link href={t.bestOf.link} className="quiz-bestof-link">
            📚 {t.bestOf.text} →
          </Link>

          <div className="quiz-actions">
            <button onClick={restart} className="quiz-retry-btn">↻ {t.tryAgain}</button>
            <Link href={t.guideLink} className="quiz-guide-link">📖 {t.readMore}</Link>
          </div>
        </div>
      </div>
    );
  }

  /* ── Question page ── */
  const q = qs[current];
  const progress = ((current) / total) * 100;

  return (
    <div className="quiz-page">
      <div className="quiz-container">
        {/* Progress bar */}
        <div className="quiz-progress-bar">
          <div className="quiz-progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <p className="quiz-progress-text">{t.question} {current + 1} {t.of} {total}</p>

        {/* Question */}
        <h2 className="quiz-question">{q.q}</h2>

        {/* Answers */}
        <div className="quiz-answers">
          {q.a.map((answer, i) => (
            <button key={i} className="quiz-answer-btn" onClick={() => handleAnswer(i)}>
              {answer}
            </button>
          ))}
        </div>

        {/* Back button */}
        {current > 0 && (
          <button onClick={goBack} className="quiz-back-btn">← {t.prev}</button>
        )}
      </div>
    </div>
  );
}
