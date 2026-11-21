'use client';

import { useState } from 'react';

/* ── Translations for 13 languages ── */
const emailT = {
  en: {
    title: "Get Free Reading Recommendations",
    subtitle: "Join our community and receive curated book picks, exclusive guides, and insider tips — straight to your inbox.",
    placeholder: "Your email",
    namePlaceholder: "Your first name",
    cta: "Subscribe — It's Free",
    sending: "Subscribing...",
    success: "Welcome! Check your inbox.",
    already: "You're already subscribed!",
    error: "Something went wrong. Try again.",
    privacy: "No spam. Unsubscribe anytime.",
  },
  fr: {
    title: "Recevez des recommandations gratuites",
    subtitle: "Rejoignez notre communauté et recevez des sélections de livres, des guides exclusifs et des conseils pratiques — directement dans votre boîte mail.",
    placeholder: "Votre email",
    namePlaceholder: "Votre prénom",
    cta: "S'inscrire — C'est gratuit",
    sending: "Inscription...",
    success: "Bienvenue ! Vérifiez votre boîte mail.",
    already: "Vous êtes déjà inscrit !",
    error: "Une erreur est survenue. Réessayez.",
    privacy: "Pas de spam. Désabonnement possible à tout moment.",
  },
  de: {
    title: "Kostenlose Leseempfehlungen erhalten",
    subtitle: "Treten Sie unserer Community bei und erhalten Sie kuratierte Buchempfehlungen und exklusive Guides — direkt in Ihr Postfach.",
    placeholder: "Ihre E-Mail",
    namePlaceholder: "Ihr Vorname",
    cta: "Abonnieren — Kostenlos",
    sending: "Wird abonniert...",
    success: "Willkommen! Prüfen Sie Ihr Postfach.",
    already: "Sie sind bereits abonniert!",
    error: "Etwas ist schiefgegangen. Versuchen Sie es erneut.",
    privacy: "Kein Spam. Jederzeit abmeldbar.",
  },
  es: {
    title: "Recibe recomendaciones gratuitas",
    subtitle: "Únete a nuestra comunidad y recibe selecciones de libros, guías exclusivas y consejos prácticos — directo a tu bandeja.",
    placeholder: "Tu email",
    namePlaceholder: "Tu nombre",
    cta: "Suscribirse — Es gratis",
    sending: "Suscribiendo...",
    success: "¡Bienvenido! Revisa tu bandeja.",
    already: "¡Ya estás suscrito!",
    error: "Algo salió mal. Inténtalo de nuevo.",
    privacy: "Sin spam. Cancela cuando quieras.",
  },
  it: {
    title: "Ricevi consigli di lettura gratuiti",
    subtitle: "Unisciti alla nostra community e ricevi selezioni di libri, guide esclusive e consigli pratici — nella tua casella email.",
    placeholder: "La tua email",
    namePlaceholder: "Il tuo nome",
    cta: "Iscriviti — È gratis",
    sending: "Iscrizione...",
    success: "Benvenuto! Controlla la tua casella.",
    already: "Sei già iscritto!",
    error: "Qualcosa è andato storto. Riprova.",
    privacy: "Niente spam. Cancellati quando vuoi.",
  },
  pt: {
    title: "Receba recomendações gratuitas",
    subtitle: "Junte-se à nossa comunidade e receba seleções de livros, guias exclusivos e dicas práticas — direto na sua caixa.",
    placeholder: "Seu email",
    namePlaceholder: "Seu nome",
    cta: "Inscrever-se — É grátis",
    sending: "Inscrevendo...",
    success: "Bem-vindo! Verifique sua caixa.",
    already: "Você já está inscrito!",
    error: "Algo deu errado. Tente novamente.",
    privacy: "Sem spam. Cancele a qualquer momento.",
  },
  el: {
    title: "Λάβετε δωρεάν προτάσεις",
    subtitle: "Γίνετε μέλος και λάβετε επιλεγμένα βιβλία, αποκλειστικούς οδηγούς και πρακτικές συμβουλές.",
    placeholder: "Το email σας",
    namePlaceholder: "Το όνομά σας",
    cta: "Εγγραφή — Δωρεάν",
    sending: "Εγγραφή...",
    success: "Καλώς ήρθατε!",
    already: "Είστε ήδη εγγεγραμμένοι!",
    error: "Κάτι πήγε στραβά. Δοκιμάστε ξανά.",
    privacy: "Χωρίς spam. Διαγραφή οποτεδήποτε.",
  },
  nl: {
    title: "Ontvang gratis leesaanbevelingen",
    subtitle: "Word lid van onze community en ontvang boekaanbevelingen, exclusieve gidsen en praktische tips.",
    placeholder: "Je e-mail",
    namePlaceholder: "Je voornaam",
    cta: "Abonneren — Gratis",
    sending: "Abonneren...",
    success: "Welkom! Check je inbox.",
    already: "Je bent al geabonneerd!",
    error: "Er ging iets mis. Probeer opnieuw.",
    privacy: "Geen spam. Altijd opzegbaar.",
  },
  pl: {
    title: "Otrzymuj darmowe rekomendacje",
    subtitle: "Dołącz do naszej społeczności i otrzymuj wybrane książki, ekskluzywne przewodniki i praktyczne porady.",
    placeholder: "Twój email",
    namePlaceholder: "Twoje imię",
    cta: "Zapisz się — Za darmo",
    sending: "Zapisywanie...",
    success: "Witamy! Sprawdź swoją skrzynkę.",
    already: "Już jesteś zapisany!",
    error: "Coś poszło nie tak. Spróbuj ponownie.",
    privacy: "Bez spamu. Wypisz się w dowolnym momencie.",
  },
  sv: {
    title: "Få gratis läsrekommendationer",
    subtitle: "Gå med i vår community och få utvalda böcker, exklusiva guider och praktiska tips.",
    placeholder: "Din e-post",
    namePlaceholder: "Ditt förnamn",
    cta: "Prenumerera — Gratis",
    sending: "Prenumererar...",
    success: "Välkommen! Kolla din inkorg.",
    already: "Du prenumererar redan!",
    error: "Något gick fel. Försök igen.",
    privacy: "Ingen spam. Avsluta när du vill.",
  },
  da: {
    title: "Få gratis læseanbefalinger",
    subtitle: "Bliv en del af vores fællesskab og modtag udvalgte bøger, eksklusive guider og praktiske tips.",
    placeholder: "Din e-mail",
    namePlaceholder: "Dit fornavn",
    cta: "Tilmeld dig — Gratis",
    sending: "Tilmelder...",
    success: "Velkommen! Tjek din indbakke.",
    already: "Du er allerede tilmeldt!",
    error: "Noget gik galt. Prøv igen.",
    privacy: "Ingen spam. Afmeld når som helst.",
  },
  fi: {
    title: "Saa ilmaisia lukusuosituksia",
    subtitle: "Liity yhteisöömme ja saa valikoituja kirjoja, eksklusiivisia oppaita ja käytännön vinkkejä.",
    placeholder: "Sähköpostisi",
    namePlaceholder: "Etunimesi",
    cta: "Tilaa — Ilmaiseksi",
    sending: "Tilataan...",
    success: "Tervetuloa! Tarkista postilaatikkosi.",
    already: "Olet jo tilaaja!",
    error: "Jokin meni pieleen. Yritä uudelleen.",
    privacy: "Ei roskapostia. Peru milloin tahansa.",
  },
  ja: {
    title: "無料のおすすめ本を受け取る",
    subtitle: "コミュニティに参加して、厳選された本、限定ガイド、実践的なヒントを受け取りましょう。",
    placeholder: "メールアドレス",
    namePlaceholder: "お名前",
    cta: "登録する — 無料",
    sending: "登録中...",
    success: "ようこそ！受信箱をご確認ください。",
    already: "すでに登録済みです！",
    error: "エラーが発生しました。もう一度お試しください。",
    privacy: "スパムなし。いつでも解除可能。",
  },
};

function getT(lang) {
  return emailT[lang] || emailT.en;
}

export default function EmailCapture({ lang = 'fr', source = 'general', variant = 'default' }) {
  const t = getT(lang);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState('idle'); // idle | sending | success | already | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setStatus('sending');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, lang, source }),
      });
      const data = await res.json();

      if (data.success) {
        setStatus(data.already ? 'already' : 'success');
        if (!data.already) {
          setEmail('');
          setName('');
        }
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const isCompact = variant === 'compact';

  return (
    <div className={`email-capture ${isCompact ? 'email-capture-compact' : ''}`}>
      <div className="email-capture-inner">
        {!isCompact && (
          <div className="email-capture-text">
            <h3>✉️ {t.title}</h3>
            <p>{t.subtitle}</p>
          </div>
        )}
        {isCompact && <h3 className="email-capture-compact-title">✉️ {t.title}</h3>}

        {status === 'success' ? (
          <div className="email-capture-msg email-capture-success">✅ {t.success}</div>
        ) : status === 'already' ? (
          <div className="email-capture-msg email-capture-already">👋 {t.already}</div>
        ) : (
          <form onSubmit={handleSubmit} className="email-capture-form">
            <input
              type="text"
              placeholder={t.namePlaceholder}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="email-capture-input"
            />
            <input
              type="email"
              placeholder={t.placeholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="email-capture-input"
            />
            <button
              type="submit"
              disabled={status === 'sending'}
              className="email-capture-btn"
            >
              {status === 'sending' ? t.sending : t.cta}
            </button>
            {status === 'error' && (
              <p className="email-capture-error">{t.error}</p>
            )}
          </form>
        )}

        <p className="email-capture-privacy">🔒 {t.privacy}</p>
      </div>
    </div>
  );
}
