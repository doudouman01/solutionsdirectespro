'use client';

import { useState } from 'react';
import Link from 'next/link';
import { quizUI, quizQuestions, langLabels } from '../../../data/quiz-manipulation';

/* ── Component ── */
export default function ManipulationQuiz() {
  const [lang, setLang] = useState('en');
  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [finished, setFinished] = useState(false);

  const t = quizUI[lang] || quizUI.en;
  const qs = quizQuestions[lang] || quizQuestions.en;
  const total = qs.length;
  const availableLangs = Object.keys(quizUI);

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

  function changeLang(newLang) {
    setLang(newLang);
    setAnswers([]);
    setCurrent(0);
    setFinished(false);
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
            {availableLangs.map((code) => (
              <button
                key={code}
                onClick={() => changeLang(code)}
                className={`quiz-lang-btn ${lang === code ? 'active' : ''}`}
              >
                {langLabels[code] || code}
              </button>
            ))}
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
