'use client';

import { useState } from 'react';
import Link from 'next/link';

/* ── UI translations ── */
const ui = {
  en: { title: "Which Book Is Made for You?", subtitle: "5 questions to find your perfect read", start: "Find My Book", question: "Question", of: "of", yourMatch: "Your Perfect Match", tryAgain: "Try Again", seeAll: "Browse all books", seeAllLink: "/boutique/en", prev: "Back" },
  fr: { title: "Quel livre est fait pour vous ?", subtitle: "5 questions pour trouver votre lecture ideale", start: "Trouver mon livre", question: "Question", of: "sur", yourMatch: "Votre livre ideal", tryAgain: "Recommencer", seeAll: "Voir tous les livres", seeAllLink: "/boutique/fr", prev: "Retour" },
  de: { title: "Welches Buch passt zu Ihnen?", subtitle: "5 Fragen um Ihre perfekte Lekture zu finden", start: "Mein Buch finden", question: "Frage", of: "von", yourMatch: "Ihr perfektes Buch", tryAgain: "Nochmal", seeAll: "Alle Bucher", seeAllLink: "/boutique/de", prev: "Zuruck" },
  es: { title: "Que libro esta hecho para ti?", subtitle: "5 preguntas para encontrar tu lectura ideal", start: "Encontrar mi libro", question: "Pregunta", of: "de", yourMatch: "Tu libro ideal", tryAgain: "Intentar de nuevo", seeAll: "Ver todos", seeAllLink: "/boutique/es", prev: "Atras" },
  it: { title: "Quale libro fa per te?", subtitle: "5 domande per trovare la tua lettura ideale", start: "Trova il mio libro", question: "Domanda", of: "di", yourMatch: "Il tuo libro ideale", tryAgain: "Riprova", seeAll: "Vedi tutti", seeAllLink: "/boutique/it", prev: "Indietro" },
  pt: { title: "Qual livro e feito para voce?", subtitle: "5 perguntas para encontrar sua leitura ideal", start: "Encontrar meu livro", question: "Pergunta", of: "de", yourMatch: "Seu livro ideal", tryAgain: "Tentar novamente", seeAll: "Ver todos", seeAllLink: "/boutique/pt", prev: "Voltar" },
  el: { title: "Poio vivlio einai gia esena?", subtitle: "5 erotiseis gia na vreis to ideano vivlio", start: "Vres to vivlio mou", question: "Erotisi", of: "apo", yourMatch: "To ideano vivlio sou", tryAgain: "Xana", seeAll: "Ola ta vivlia", seeAllLink: "/boutique/el", prev: "Pisw" },
  nl: { title: "Welk boek past bij jou?", subtitle: "5 vragen om je ideale boek te vinden", start: "Vind mijn boek", question: "Vraag", of: "van", yourMatch: "Jouw perfecte boek", tryAgain: "Opnieuw", seeAll: "Alle boeken", seeAllLink: "/boutique/nl", prev: "Terug" },
  ja: { title: "あなたにぴったりの本は？", subtitle: "5つの質問で理想の一冊を", start: "本を見つける", question: "質問", of: "/", yourMatch: "あなたの本", tryAgain: "もう一度", seeAll: "すべての本", seeAllLink: "/boutique/ja", prev: "戻る" },
  pl: { title: "Ktora ksiazka jest dla Ciebie?", subtitle: "5 pytan aby znalezc lekture", start: "Znajdz ksiazke", question: "Pytanie", of: "z", yourMatch: "Twoja ksiazka", tryAgain: "Ponownie", seeAll: "Wszystkie", seeAllLink: "/boutique/pl", prev: "Wstecz" },
  sv: { title: "Vilken bok passar dig?", subtitle: "5 fragor for att hitta din bok", start: "Hitta min bok", question: "Fraga", of: "av", yourMatch: "Din perfekta bok", tryAgain: "Igen", seeAll: "Alla bocker", seeAllLink: "/boutique/sv", prev: "Tillbaka" },
  da: { title: "Hvilken bog passer til dig?", subtitle: "5 sporgsmal for at finde din bog", start: "Find min bog", question: "Sporgsmal", of: "af", yourMatch: "Din perfekte bog", tryAgain: "Igen", seeAll: "Alle boger", seeAllLink: "/boutique/da", prev: "Tilbage" },
  fi: { title: "Mika kirja sopii sinulle?", subtitle: "5 kysymysta loydetaksesi kirjasi", start: "Loyda kirjani", question: "Kysymys", of: "/", yourMatch: "Sinulle sopiva kirja", tryAgain: "Uudelleen", seeAll: "Kaikki kirjat", seeAllLink: "/boutique/fi", prev: "Takaisin" },
};

const langLabels = {
  en: "🇬🇧 English", fr: "🇫🇷 Francais", de: "🇩🇪 Deutsch", es: "🇪🇸 Espanol",
  it: "🇮🇹 Italiano", pt: "🇵🇹 Portugues", el: "🇬🇷 Ellinika", nl: "🇳🇱 Nederlands",
  pl: "🇵🇱 Polski", sv: "🇸🇪 Svenska", da: "🇩🇰 Dansk", fi: "🇫🇮 Suomi", ja: "🇯🇵 日本語",
};

/* ── Questions — ALL translated per language, tags: nf (nonfiction) or fic (fiction) ── */
const questions = {
  en: [
    { q: "What are you looking for right now?", a: [{ text: "Protect myself from toxic people", tags: ["nf"] }, { text: "Get my life organized", tags: ["nf"] }, { text: "Build mental strength and discipline", tags: ["nf"] }, { text: "Escape into a great story", tags: ["fic"] }, { text: "Grow my business or career", tags: ["nf"] }] },
    { q: "Which describes you best?", a: [{ text: "I react too quickly to emotions", tags: ["nf"] }, { text: "I struggle to start tasks", tags: ["nf"] }, { text: "I want practical tools, not theory", tags: ["nf"] }, { text: "I love getting lost in fictional worlds", tags: ["fic"] }, { text: "I want to understand people better", tags: ["nf"] }] },
    { q: "What kind of content do you prefer?", a: [{ text: "Step-by-step guides", tags: ["nf"] }, { text: "Psychology insights", tags: ["nf"] }, { text: "Romance, suspense, or adventure", tags: ["fic"] }, { text: "Philosophy and mindset", tags: ["nf"] }, { text: "Checklists and templates", tags: ["nf"] }] },
    { q: "What's your biggest challenge?", a: [{ text: "A manipulative person in my life", tags: ["nf"] }, { text: "Procrastination and overwhelm", tags: ["nf"] }, { text: "Stress or emotional control", tags: ["nf"] }, { text: "Need a break from reality", tags: ["fic"] }, { text: "Scaling without burning out", tags: ["nf"] }] },
    { q: "How much time do you have to read?", a: [{ text: "Quick reads — under 200 pages", tags: ["nf"] }, { text: "Medium — 200-350 pages", tags: ["nf"] }, { text: "400+ page novel, no problem", tags: ["fic"] }, { text: "Printable tools, not reading", tags: ["nf"] }, { text: "Digital format preferred", tags: ["nf"] }] },
  ],
  fr: [
    { q: "Que cherchez-vous en ce moment ?", a: [{ text: "Me proteger des personnes toxiques", tags: ["nf"] }, { text: "Organiser ma vie", tags: ["nf"] }, { text: "Renforcer ma force mentale", tags: ["nf"] }, { text: "M'evader dans une belle histoire", tags: ["fic"] }, { text: "Developper mon activite", tags: ["nf"] }] },
    { q: "Qu'est-ce qui vous decrit le mieux ?", a: [{ text: "Je reagis trop vite aux emotions", tags: ["nf"] }, { text: "J'ai du mal a demarrer", tags: ["nf"] }, { text: "Je veux des outils pratiques", tags: ["nf"] }, { text: "J'adore les mondes fictifs", tags: ["fic"] }, { text: "Je veux comprendre les gens", tags: ["nf"] }] },
    { q: "Quel contenu preferez-vous ?", a: [{ text: "Guides pas a pas", tags: ["nf"] }, { text: "Psychologie et comportement", tags: ["nf"] }, { text: "Romance, suspense ou aventure", tags: ["fic"] }, { text: "Philosophie et cadres mentaux", tags: ["nf"] }, { text: "Checklists et templates", tags: ["nf"] }] },
    { q: "Votre plus grand defi ?", a: [{ text: "Une personne manipulatrice", tags: ["nf"] }, { text: "Procrastination et surcharge", tags: ["nf"] }, { text: "Stress ou controle emotionnel", tags: ["nf"] }, { text: "Besoin d'une pause", tags: ["fic"] }, { text: "Faire croitre sans m'epuiser", tags: ["nf"] }] },
    { q: "Temps disponible pour lire ?", a: [{ text: "Court — moins de 200 pages", tags: ["nf"] }, { text: "Moyen — 200-350 pages", tags: ["nf"] }, { text: "Roman 400+ pages, aucun probleme", tags: ["fic"] }, { text: "Outils imprimables, pas de lecture", tags: ["nf"] }, { text: "Format digital prefere", tags: ["nf"] }] },
  ],
  de: [
    { q: "Was suchen Sie gerade?", a: [{ text: "Schutz vor toxischen Menschen", tags: ["nf"] }, { text: "Mein Leben organisieren", tags: ["nf"] }, { text: "Mentale Starke aufbauen", tags: ["nf"] }, { text: "In eine tolle Geschichte eintauchen", tags: ["fic"] }, { text: "Karriere mit KI voranbringen", tags: ["nf"] }] },
    { q: "Was beschreibt Sie am besten?", a: [{ text: "Ich reagiere zu schnell emotional", tags: ["nf"] }, { text: "Ich habe Schwierigkeiten anzufangen", tags: ["nf"] }, { text: "Ich will praktische Werkzeuge", tags: ["nf"] }, { text: "Ich liebe fiktive Welten", tags: ["fic"] }, { text: "Ich will Menschen besser verstehen", tags: ["nf"] }] },
    { q: "Welche Art Inhalt bevorzugen Sie?", a: [{ text: "Schritt-fur-Schritt-Anleitungen", tags: ["nf"] }, { text: "Psychologie und Verhalten", tags: ["nf"] }, { text: "Romantik, Spannung oder Abenteuer", tags: ["fic"] }, { text: "Philosophie und Denkrahmen", tags: ["nf"] }, { text: "Checklisten und Vorlagen", tags: ["nf"] }] },
    { q: "Ihre grosste Herausforderung?", a: [{ text: "Eine manipulative Person", tags: ["nf"] }, { text: "Prokrastination und Uberforderung", tags: ["nf"] }, { text: "Stress oder emotionale Kontrolle", tags: ["nf"] }, { text: "Brauche eine Pause", tags: ["fic"] }, { text: "Wachstum ohne Burnout", tags: ["nf"] }] },
    { q: "Wie viel Zeit zum Lesen?", a: [{ text: "Kurz — unter 200 Seiten", tags: ["nf"] }, { text: "Mittel — 200-350 Seiten", tags: ["nf"] }, { text: "400+ Seiten Roman, kein Problem", tags: ["fic"] }, { text: "Druckbare Werkzeuge", tags: ["nf"] }, { text: "Digitales Format bevorzugt", tags: ["nf"] }] },
  ],
  es: [
    { q: "Que estas buscando ahora?", a: [{ text: "Protegerme de personas toxicas", tags: ["nf"] }, { text: "Organizar mi vida", tags: ["nf"] }, { text: "Construir fuerza mental", tags: ["nf"] }, { text: "Escapar en una buena historia", tags: ["fic"] }, { text: "Hacer crecer mi carrera", tags: ["nf"] }] },
    { q: "Que te describe mejor?", a: [{ text: "Reacciono demasiado rapido", tags: ["nf"] }, { text: "Me cuesta empezar tareas", tags: ["nf"] }, { text: "Quiero herramientas practicas", tags: ["nf"] }, { text: "Me encanta la ficcion", tags: ["fic"] }, { text: "Quiero entender a la gente", tags: ["nf"] }] },
    { q: "Que contenido prefieres?", a: [{ text: "Guias paso a paso", tags: ["nf"] }, { text: "Psicologia y comportamiento", tags: ["nf"] }, { text: "Romance, suspenso o aventura", tags: ["fic"] }, { text: "Filosofia y marcos mentales", tags: ["nf"] }, { text: "Checklists y plantillas", tags: ["nf"] }] },
    { q: "Tu mayor desafio?", a: [{ text: "Una persona manipuladora", tags: ["nf"] }, { text: "Procrastinacion y agobio", tags: ["nf"] }, { text: "Estres o control emocional", tags: ["nf"] }, { text: "Necesito un descanso", tags: ["fic"] }, { text: "Crecer sin quemarme", tags: ["nf"] }] },
    { q: "Tiempo para leer?", a: [{ text: "Corto — menos de 200 paginas", tags: ["nf"] }, { text: "Medio — 200-350 paginas", tags: ["nf"] }, { text: "Novela 400+ paginas, sin problema", tags: ["fic"] }, { text: "Herramientas imprimibles", tags: ["nf"] }, { text: "Formato digital preferido", tags: ["nf"] }] },
  ],
  it: [
    { q: "Cosa cerchi in questo momento?", a: [{ text: "Proteggermi da persone tossiche", tags: ["nf"] }, { text: "Organizzare la mia vita", tags: ["nf"] }, { text: "Costruire forza mentale", tags: ["nf"] }, { text: "Perdermi in una bella storia", tags: ["fic"] }, { text: "Far crescere la mia carriera", tags: ["nf"] }] },
    { q: "Cosa ti descrive meglio?", a: [{ text: "Reagisco troppo in fretta", tags: ["nf"] }, { text: "Faccio fatica a iniziare", tags: ["nf"] }, { text: "Voglio strumenti pratici", tags: ["nf"] }, { text: "Adoro i mondi immaginari", tags: ["fic"] }, { text: "Voglio capire le persone", tags: ["nf"] }] },
    { q: "Che contenuto preferisci?", a: [{ text: "Guide passo passo", tags: ["nf"] }, { text: "Psicologia e comportamento", tags: ["nf"] }, { text: "Romanzi, suspense o avventura", tags: ["fic"] }, { text: "Filosofia e schemi mentali", tags: ["nf"] }, { text: "Checklist e template", tags: ["nf"] }] },
    { q: "La tua sfida piu grande?", a: [{ text: "Una persona manipolatrice", tags: ["nf"] }, { text: "Procrastinazione e sovraccarico", tags: ["nf"] }, { text: "Stress o controllo emotivo", tags: ["nf"] }, { text: "Ho bisogno di una pausa", tags: ["fic"] }, { text: "Crescere senza bruciarmi", tags: ["nf"] }] },
    { q: "Tempo per leggere?", a: [{ text: "Breve — meno di 200 pagine", tags: ["nf"] }, { text: "Medio — 200-350 pagine", tags: ["nf"] }, { text: "Romanzo 400+ pagine, nessun problema", tags: ["fic"] }, { text: "Strumenti stampabili", tags: ["nf"] }, { text: "Formato digitale", tags: ["nf"] }] },
  ],
  pt: [
    { q: "O que voce procura agora?", a: [{ text: "Proteger-me de pessoas toxicas", tags: ["nf"] }, { text: "Organizar minha vida", tags: ["nf"] }, { text: "Construir forca mental", tags: ["nf"] }, { text: "Mergulhar em uma boa historia", tags: ["fic"] }, { text: "Crescer minha carreira", tags: ["nf"] }] },
    { q: "O que te descreve melhor?", a: [{ text: "Reajo rapido demais", tags: ["nf"] }, { text: "Dificuldade em comecar tarefas", tags: ["nf"] }, { text: "Quero ferramentas praticas", tags: ["nf"] }, { text: "Adoro mundos ficticios", tags: ["fic"] }, { text: "Quero entender as pessoas", tags: ["nf"] }] },
    { q: "Que conteudo prefere?", a: [{ text: "Guias passo a passo", tags: ["nf"] }, { text: "Psicologia e comportamento", tags: ["nf"] }, { text: "Romance, suspense ou aventura", tags: ["fic"] }, { text: "Filosofia e frameworks", tags: ["nf"] }, { text: "Checklists e templates", tags: ["nf"] }] },
    { q: "Seu maior desafio?", a: [{ text: "Uma pessoa manipuladora", tags: ["nf"] }, { text: "Procrastinacao e sobrecarga", tags: ["nf"] }, { text: "Estresse ou controle emocional", tags: ["nf"] }, { text: "Preciso de uma pausa", tags: ["fic"] }, { text: "Crescer sem me esgotar", tags: ["nf"] }] },
    { q: "Tempo para ler?", a: [{ text: "Curto — menos de 200 paginas", tags: ["nf"] }, { text: "Medio — 200-350 paginas", tags: ["nf"] }, { text: "Romance 400+ paginas, sem problema", tags: ["fic"] }, { text: "Ferramentas imprimiveis", tags: ["nf"] }, { text: "Formato digital", tags: ["nf"] }] },
  ],
  el: [
    { q: "Ti psachneis afti ti stigmi?", a: [{ text: "Prostasia apo toxikous anthropous", tags: ["nf"] }, { text: "Na organoso ti zoi mou", tags: ["nf"] }, { text: "Na chtiso pnevmatiki dynami", tags: ["nf"] }, { text: "Na chaotho se mia istoria", tags: ["fic"] }, { text: "Na anaptykso tin kariera mou", tags: ["nf"] }] },
    { q: "Ti se perigrafel kalitera?", a: [{ text: "Antidro poly grigora", tags: ["nf"] }, { text: "Dyskoleyomai na xekiniso", tags: ["nf"] }, { text: "Thelo praktika ergaleia", tags: ["nf"] }, { text: "Latreyo tous plastous kosmous", tags: ["fic"] }, { text: "Thelo na katalavo tous anthropous", tags: ["nf"] }] },
    { q: "Ti eidos periechomenou protimas?", a: [{ text: "Odigous vima-vima", tags: ["nf"] }, { text: "Psychologia kai symperifora", tags: ["nf"] }, { text: "Romantzo, suspense i peripeteia", tags: ["fic"] }, { text: "Filosofia kai noitika plaisaia", tags: ["nf"] }, { text: "Checklists kai templates", tags: ["nf"] }] },
    { q: "Poia einai i megalyteri proklisi sou?", a: [{ text: "Enas cheiragoghts anthropos", tags: ["nf"] }, { text: "Anavathmisi kai yperfortosi", tags: ["nf"] }, { text: "Stress i synaisthimatikos elegchos", tags: ["nf"] }, { text: "Chreiazomai mia paysi", tags: ["fic"] }, { text: "Na megaloso choris exantlisi", tags: ["nf"] }] },
    { q: "Poso chrono echeis gia diavasma?", a: [{ text: "Syntoma — kato apo 200 selides", tags: ["nf"] }, { text: "Mesaia — 200-350 selides", tags: ["nf"] }, { text: "Mythistorima 400+ selides", tags: ["fic"] }, { text: "Ektypwsima ergaleia", tags: ["nf"] }, { text: "Psifiako format", tags: ["nf"] }] },
  ],
  nl: [
    { q: "Wat zoek je nu?", a: [{ text: "Bescherming tegen toxische mensen", tags: ["nf"] }, { text: "Mijn leven organiseren", tags: ["nf"] }, { text: "Mentale kracht opbouwen", tags: ["nf"] }, { text: "Ontsnappen in een verhaal", tags: ["fic"] }, { text: "Mijn carriere laten groeien", tags: ["nf"] }] },
    { q: "Wat beschrijft jou het best?", a: [{ text: "Ik reageer te snel", tags: ["nf"] }, { text: "Moeite om te beginnen", tags: ["nf"] }, { text: "Ik wil praktische tools", tags: ["nf"] }, { text: "Ik hou van fictie", tags: ["fic"] }, { text: "Ik wil mensen begrijpen", tags: ["nf"] }] },
    { q: "Welk soort inhoud?", a: [{ text: "Stap-voor-stap gidsen", tags: ["nf"] }, { text: "Psychologie en gedrag", tags: ["nf"] }, { text: "Romantiek of spanning", tags: ["fic"] }, { text: "Filosofie en denkraamwerken", tags: ["nf"] }, { text: "Checklists en templates", tags: ["nf"] }] },
    { q: "Je grootste uitdaging?", a: [{ text: "Een manipulatief persoon", tags: ["nf"] }, { text: "Uitstelgedrag", tags: ["nf"] }, { text: "Stress of emotionele controle", tags: ["nf"] }, { text: "Heb een pauze nodig", tags: ["fic"] }, { text: "Groeien zonder opbranden", tags: ["nf"] }] },
    { q: "Tijd om te lezen?", a: [{ text: "Kort — onder 200 pagina's", tags: ["nf"] }, { text: "Gemiddeld — 200-350", tags: ["nf"] }, { text: "Roman 400+ pagina's", tags: ["fic"] }, { text: "Printbare tools", tags: ["nf"] }, { text: "Digitaal format", tags: ["nf"] }] },
  ],
  pl: [
    { q: "Czego szukasz?", a: [{ text: "Ochrony przed toksycznymi ludzmi", tags: ["nf"] }, { text: "Organizacji zycia", tags: ["nf"] }, { text: "Budowania sily mentalnej", tags: ["nf"] }, { text: "Ucieczki w historie", tags: ["fic"] }, { text: "Rozwoju kariery", tags: ["nf"] }] },
    { q: "Co najlepiej Cie opisuje?", a: [{ text: "Reagujesz za szybko", tags: ["nf"] }, { text: "Trudnosci z rozpoczynaniem", tags: ["nf"] }, { text: "Chce praktycznych narzedzi", tags: ["nf"] }, { text: "Kocham fikcje", tags: ["fic"] }, { text: "Chce rozumiec ludzi", tags: ["nf"] }] },
    { q: "Jaki rodzaj tresci?", a: [{ text: "Przewodniki krok po kroku", tags: ["nf"] }, { text: "Psychologia i zachowanie", tags: ["nf"] }, { text: "Romans lub suspens", tags: ["fic"] }, { text: "Filozofia i ramy myslowe", tags: ["nf"] }, { text: "Listy kontrolne", tags: ["nf"] }] },
    { q: "Najwieksze wyzwanie?", a: [{ text: "Manipulacyjna osoba", tags: ["nf"] }, { text: "Prokrastynacja", tags: ["nf"] }, { text: "Stres lub kontrola emocji", tags: ["nf"] }, { text: "Potrzebuje przerwy", tags: ["fic"] }, { text: "Rozwoj bez wypalenia", tags: ["nf"] }] },
    { q: "Czas na czytanie?", a: [{ text: "Krotkie — ponizej 200 stron", tags: ["nf"] }, { text: "Srednie — 200-350 stron", tags: ["nf"] }, { text: "Powiesc 400+ stron", tags: ["fic"] }, { text: "Narzedzia do druku", tags: ["nf"] }, { text: "Format cyfrowy", tags: ["nf"] }] },
  ],
  sv: [
    { q: "Vad soker du?", a: [{ text: "Skydd mot toxiska manniskor", tags: ["nf"] }, { text: "Organisera mitt liv", tags: ["nf"] }, { text: "Bygga mental styrka", tags: ["nf"] }, { text: "Forsvinna i en historia", tags: ["fic"] }, { text: "Utveckla karriaren", tags: ["nf"] }] },
    { q: "Vad beskriver dig bast?", a: [{ text: "Reagerar for snabbt", tags: ["nf"] }, { text: "Svart att borja uppgifter", tags: ["nf"] }, { text: "Vill ha praktiska verktyg", tags: ["nf"] }, { text: "Alskar fiktiva varldar", tags: ["fic"] }, { text: "Vill forsta manniskor", tags: ["nf"] }] },
    { q: "Vilken typ av innehall?", a: [{ text: "Steg-for-steg guider", tags: ["nf"] }, { text: "Psykologi och beteende", tags: ["nf"] }, { text: "Romantik eller spanning", tags: ["fic"] }, { text: "Filosofi och tankeram", tags: ["nf"] }, { text: "Checklistor och mallar", tags: ["nf"] }] },
    { q: "Storsta utmaningen?", a: [{ text: "En manipulativ person", tags: ["nf"] }, { text: "Uppskjutande", tags: ["nf"] }, { text: "Stress eller kontroll", tags: ["nf"] }, { text: "Behover en paus", tags: ["fic"] }, { text: "Vaxa utan utbranndhet", tags: ["nf"] }] },
    { q: "Tid att lasa?", a: [{ text: "Kort — under 200 sidor", tags: ["nf"] }, { text: "Medel — 200-350 sidor", tags: ["nf"] }, { text: "Roman 400+ sidor", tags: ["fic"] }, { text: "Utskrivbara verktyg", tags: ["nf"] }, { text: "Digitalt format", tags: ["nf"] }] },
  ],
  da: [
    { q: "Hvad soger du?", a: [{ text: "Beskyttelse mod giftige mennesker", tags: ["nf"] }, { text: "Organisere mit liv", tags: ["nf"] }, { text: "Opbygge mental styrke", tags: ["nf"] }, { text: "Flygte ind i en historie", tags: ["fic"] }, { text: "Udvikle karrieren", tags: ["nf"] }] },
    { q: "Hvad beskriver dig bedst?", a: [{ text: "Reagerer for hurtigt", tags: ["nf"] }, { text: "Svaert ved at starte", tags: ["nf"] }, { text: "Vil have praktiske vaerktoejer", tags: ["nf"] }, { text: "Elsker fiktive verdener", tags: ["fic"] }, { text: "Vil forsta mennesker", tags: ["nf"] }] },
    { q: "Hvilken type indhold?", a: [{ text: "Trin-for-trin guider", tags: ["nf"] }, { text: "Psykologi og adfaerd", tags: ["nf"] }, { text: "Romantik eller spaending", tags: ["fic"] }, { text: "Filosofi og tankesaet", tags: ["nf"] }, { text: "Tjeklister og skabeloner", tags: ["nf"] }] },
    { q: "Stoerste udfordring?", a: [{ text: "En manipulerende person", tags: ["nf"] }, { text: "Udsaettelse", tags: ["nf"] }, { text: "Stress eller kontrol", tags: ["nf"] }, { text: "Har brug for en pause", tags: ["fic"] }, { text: "Vokse uden at braende ud", tags: ["nf"] }] },
    { q: "Tid til at laese?", a: [{ text: "Kort — under 200 sider", tags: ["nf"] }, { text: "Middel — 200-350 sider", tags: ["nf"] }, { text: "Roman 400+ sider", tags: ["fic"] }, { text: "Printbare vaerktoejer", tags: ["nf"] }, { text: "Digitalt format", tags: ["nf"] }] },
  ],
  fi: [
    { q: "Mita etsit?", a: [{ text: "Suojaa myrkyllisilta", tags: ["nf"] }, { text: "Jarjesta elamani", tags: ["nf"] }, { text: "Henkista vahvuutta", tags: ["nf"] }, { text: "Uppoutua tarinaan", tags: ["fic"] }, { text: "Kehittaa uraani", tags: ["nf"] }] },
    { q: "Mika kuvaa sinua?", a: [{ text: "Reagoin liian nopeasti", tags: ["nf"] }, { text: "Vaikea aloittaa", tags: ["nf"] }, { text: "Haluan tyokaluja", tags: ["nf"] }, { text: "Rakastan fiktiota", tags: ["fic"] }, { text: "Haluan ymmartaa ihmisia", tags: ["nf"] }] },
    { q: "Millaista sisaltoa?", a: [{ text: "Vaiheittaiset oppaat", tags: ["nf"] }, { text: "Psykologia ja kayttaytyminen", tags: ["nf"] }, { text: "Romanssi tai jannitysta", tags: ["fic"] }, { text: "Filosofia ja ajattelu", tags: ["nf"] }, { text: "Tarkistuslistat", tags: ["nf"] }] },
    { q: "Suurin haaste?", a: [{ text: "Manipuloiva henkilo", tags: ["nf"] }, { text: "Viivyttely", tags: ["nf"] }, { text: "Stressi tai tunnesaately", tags: ["nf"] }, { text: "Tarvitsen tauon", tags: ["fic"] }, { text: "Kasvaa ilman uupumista", tags: ["nf"] }] },
    { q: "Aikaa lukea?", a: [{ text: "Lyhyet — alle 200 sivua", tags: ["nf"] }, { text: "Keskipitkia — 200-350", tags: ["nf"] }, { text: "400+ sivun romaani", tags: ["fic"] }, { text: "Tulostettavia tyokaluja", tags: ["nf"] }, { text: "Digitaalinen", tags: ["nf"] }] },
  ],
  ja: [
    { q: "今、何を探していますか？", a: [{ text: "有害な人から身を守りたい", tags: ["nf"] }, { text: "生活を整理したい", tags: ["nf"] }, { text: "精神的な強さを築きたい", tags: ["nf"] }, { text: "物語に浸りたい", tags: ["fic"] }, { text: "キャリアを成長させたい", tags: ["nf"] }] },
    { q: "あなたを最もよく表すのは？", a: [{ text: "感情に素早く反応しすぎる", tags: ["nf"] }, { text: "タスクを始めるのが難しい", tags: ["nf"] }, { text: "実用的なツールが欲しい", tags: ["nf"] }, { text: "架空の世界が大好き", tags: ["fic"] }, { text: "人を理解したい", tags: ["nf"] }] },
    { q: "好きなコンテンツは？", a: [{ text: "ステップバイステップガイド", tags: ["nf"] }, { text: "心理学と行動", tags: ["nf"] }, { text: "ロマンス、サスペンス", tags: ["fic"] }, { text: "哲学と思考", tags: ["nf"] }, { text: "チェックリスト", tags: ["nf"] }] },
    { q: "最大の課題は？", a: [{ text: "操作的な人", tags: ["nf"] }, { text: "先延ばし", tags: ["nf"] }, { text: "ストレスや感情コントロール", tags: ["nf"] }, { text: "現実からの休憩", tags: ["fic"] }, { text: "燃え尽きずに成長", tags: ["nf"] }] },
    { q: "読書時間は？", a: [{ text: "短い — 200ページ未満", tags: ["nf"] }, { text: "中程度 — 200-350ページ", tags: ["nf"] }, { text: "400ページ以上OK", tags: ["fic"] }, { text: "ツールが欲しい", tags: ["nf"] }, { text: "デジタル形式", tags: ["nf"] }] },
  ],
};

/* ── Recommendations: ONLY products that exist in THAT language ── */
const recommendations = {
  en: { nf: { title: "The Manipulation Red Flags", desc: "41 red flags to spot manipulation — with neuroscience and defense strategies.", link: "/boutique/en/the-manipulation-red-flags", cover: "/covers/the-manipulation-red-flags.png" }, fic: { title: "The Glass Wife", desc: "A domestic thriller about a marriage built on secrets.", link: "/boutique/en/the-glass-wife", cover: "/covers/the-glass-wife.png" } },
  fr: { nf: { title: "L'Art de ne jamais reagir", desc: "Les 7 Lois du Pouvoir Silencieux — maitrise strategique.", link: "/boutique/fr/l-art-de-ne-jamais-reagir", cover: "/covers/l-art-de-ne-jamais-reagir.png" }, fic: { title: "Les Heritiers de Belmont", desc: "Les Belmont ont tout. Mais derriere les murs du domaine...", link: "/boutique/fr/heritiers-de-belmont", cover: "/covers/heritiers-belmont.png" } },
  de: { nf: { title: "Meal Prep zum Abnehmen", desc: "Der komplette Leitfaden fur gesundes Meal Prep.", link: "/boutique/de/meal-prep-abnehmen", cover: "/covers/meal-prep-abnehmen.png" }, fic: { title: "Die Stille Frau", desc: "Ein fesselnder Psychothriller.", link: "/boutique/de/die-stille-frau", cover: "/covers/die-stille-frau.png" } },
  es: { nf: { title: "Basta", desc: "Aprende a decir basta y protegerte.", link: "/boutique/es/basta", cover: "/covers/basta.png" }, fic: { title: "Sangre y Silencio", desc: "Dark romance en el Mexico del narcotrafico.", link: "/boutique/es/sangre-y-silencio", cover: "/covers/sangre-y-silencio.png" } },
  it: { nf: { title: "Detox dal Cortisolo", desc: "Guida per ridurre lo stress e il cortisolo.", link: "/boutique/it/detox-dal-cortisolo", cover: "/covers/detox-dal-cortisolo.png" }, fic: { title: "La Citta dei Ricordi Perduti", desc: "Un thriller psicologico avvincente.", link: "/boutique/it/la-citta-dei-ricordi-perduti", cover: "/covers/la-citta-dei-ricordi-perduti.png" } },
  pt: { nf: { title: "Liberdade Reconquistada", desc: "O guia para vencer a dependencia emocional.", link: "/boutique/pt/liberdade-reconquistada", cover: "/covers/liberdade-reconquistada.png" }, fic: { title: "O Boto", desc: "Romance amazonica baseada na lenda do Boto.", link: "/boutique/pt/o-boto", cover: "/covers/o-boto.png" } },
  el: { nf: { title: "SKOTEINI PSYCHOLOGIA", desc: "O Apolytos Odigos Aftoprostasias.", link: "/boutique/el/skoteini-psychologia", cover: "/covers/skoteini-psychologia.png" }, fic: { title: "SKOTEINI PSYCHOLOGIA", desc: "O Apolytos Odigos Aftoprostasias.", link: "/boutique/el/skoteini-psychologia", cover: "/covers/skoteini-psychologia.png" } },
  nl: { fic: { title: "De Verdronken Heks", desc: "Een duister verhaal uit Nederlandse folklore.", link: "/boutique/nl/de-verdronken-heks", cover: "/covers/de-verdronken-heks.png" }, nf: { title: "De Verdronken Heks", desc: "Een duister verhaal.", link: "/boutique/nl/de-verdronken-heks", cover: "/covers/de-verdronken-heks.png" } },
  pl: { fic: { title: "Corka Smierci", desc: "Mroczna historia z polskiej mitologii.", link: "/boutique/pl/corka-smierci", cover: "/covers/corka-smierci.png" }, nf: { title: "Corka Smierci", desc: "Mroczna historia.", link: "/boutique/pl/corka-smierci", cover: "/covers/corka-smierci.png" } },
  sv: { fic: { title: "Bruden till den Frusne Guden", desc: "En nordisk saga om offer och overlevnad.", link: "/boutique/sv/bruden-till-den-frusne-guden", cover: "/covers/bruden-till-den-frusne-guden.png" }, nf: { title: "Bruden till den Frusne Guden", desc: "En nordisk saga.", link: "/boutique/sv/bruden-till-den-frusne-guden", cover: "/covers/bruden-till-den-frusne-guden.png" } },
  da: { fic: { title: "Den Sidste Jarl", desc: "En vikinghistorie om magt og skaebne.", link: "/boutique/da/den-sidste-jarl", cover: "/covers/den-sidste-jarl.png" }, nf: { title: "Den Sidste Jarl", desc: "En vikinghistorie.", link: "/boutique/da/den-sidste-jarl", cover: "/covers/den-sidste-jarl.png" } },
  fi: { fic: { title: "Jaan alla", desc: "Nordic Noir jannitysta Suomesta.", link: "/boutique/fi/jaan-alla", cover: "/covers/jaan-alla.png" }, nf: { title: "Jaan alla", desc: "Nordic Noir.", link: "/boutique/fi/jaan-alla", cover: "/covers/jaan-alla.png" } },
  ja: { nf: { title: "ストイック・リセット", desc: "ストア哲学で感情をコントロール。", link: "/boutique/ja/stoic-reset", cover: "/covers/stoic-reset.png" }, fic: { title: "ストイック・リセット", desc: "ストア哲学で感情をコントロール。", link: "/boutique/ja/stoic-reset", cover: "/covers/stoic-reset.png" } },
};

function getReco(lang, tag) {
  if (recommendations[lang] && recommendations[lang][tag]) return recommendations[lang][tag];
  if (recommendations[lang]) return Object.values(recommendations[lang])[0];
  return recommendations.en[tag] || recommendations.en.nf;
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

  function handleAnswer(answer) {
    const newScores = { ...tagScores };
    answer.tags.forEach(tag => { newScores[tag] = (newScores[tag] || 0) + 1; });
    setTagScores(newScores);
    if (current + 1 < total) { setCurrent(current + 1); } else { setFinished(true); }
  }
  function goBack() { if (current > 0) setCurrent(current - 1); }
  function restart() { setTagScores({}); setCurrent(0); setFinished(false); setStarted(false); }
  function changeLang(newLang) { setLang(newLang); restart(); }

  const winningTag = Object.entries(tagScores).sort((a, b) => b[1] - a[1])[0]?.[0] || 'nf';
  const reco = getReco(lang, winningTag);

  if (!started) {
    return (
      <div className="quiz-page">
        <div className="quiz-landing">
          <div className="quiz-landing-icon">📚</div>
          <h1 className="quiz-landing-title">{t.title}</h1>
          <p className="quiz-landing-sub">{t.subtitle}</p>
          <div className="quiz-lang-switch">
            {Object.keys(ui).map((code) => (
              <button key={code} onClick={() => changeLang(code)} className={`quiz-lang-btn ${lang === code ? 'active' : ''}`}>{langLabels[code] || code}</button>
            ))}
          </div>
          <button onClick={() => setStarted(true)} className="quiz-start-btn">{t.start} →</button>
          <p className="quiz-landing-note">⏱ 1 min · 🔒 No data stored</p>
        </div>
      </div>
    );
  }

  if (finished) {
    return (
      <div className="quiz-page">
        <div className="quiz-result">
          <div className="quiz-result-icon">📖</div>
          <h2 className="quiz-result-label" style={{ color: '#e2b714' }}>{t.yourMatch}</h2>
          <div className="quiz-reco-box" style={{ textAlign: 'left' }}>
            {reco.cover && (<div style={{ textAlign: 'center', marginBottom: '16px' }}><img src={reco.cover} alt={reco.title} style={{ width: '140px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }} /></div>)}
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', marginBottom: '8px' }}>{reco.title}</h3>
            <p className="quiz-reco-text">{reco.desc}</p>
            <Link href={reco.link} className="quiz-reco-btn">{reco.title} →</Link>
          </div>
          <Link href={t.seeAllLink} className="quiz-bestof-link">📚 {t.seeAll} →</Link>
          <div className="quiz-actions"><button onClick={restart} className="quiz-retry-btn">↻ {t.tryAgain}</button></div>
        </div>
      </div>
    );
  }

  const q = qs[current];
  const progress = ((current) / total) * 100;

  return (
    <div className="quiz-page">
      <div className="quiz-container">
        <div className="quiz-progress-bar"><div className="quiz-progress-fill" style={{ width: `${progress}%` }} /></div>
        <p className="quiz-progress-text">{t.question} {current + 1} {t.of} {total}</p>
        <h2 className="quiz-question">{q.q}</h2>
        <div className="quiz-answers">
          {q.a.map((answer, i) => (<button key={i} className="quiz-answer-btn" onClick={() => handleAnswer(answer)}>{answer.text}</button>))}
        </div>
        {current > 0 && (<button onClick={goBack} className="quiz-back-btn">← {t.prev}</button>)}
      </div>
    </div>
  );
}
