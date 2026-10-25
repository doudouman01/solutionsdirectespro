/**
 * fix-categories.js — v2 (STRUCTURE FINALE VALIDEE)
 * ====================================================
 * Corrige le champ "category" dans TOUS les fichiers boutique
 * de SolutionsDirectesPro, toutes langues confondues.
 *
 * 14 CATEGORIES :
 *   literature, employment, writing-publishing, health,
 *   halloween, memorial, personal-development, travel,
 *   personal-finance, holiday, natural-medicine, young-mothers,
 *   seniors, relationships
 *
 * UTILISATION :
 *   1. Place ce fichier a la racine de ton projet (a cote de package.json)
 *   2. Ouvre un terminal dans le dossier du projet
 *   3. Tape:  node fix-categories.js
 *   4. Le script affiche tous les fichiers modifies
 *   5. Lance deploy.bat comme d'habitude
 */

const fs = require('fs');
const path = require('path');

// ============================================================
// MAPPING SLUG → CATEGORY
// ============================================================
const SLUG_TO_CATEGORY = {

  // ==========================================================
  // LITERATURE (romans / fiction) — toutes langues
  // ==========================================================

  // EN novels
  'blood-debt-the-fall': 'literature',
  'dead-frequency': 'literature',
  'hexes-and-homicides': 'literature',
  'murder-at-the-bookshop': 'literature',
  'the-alphas-reluctant-mate': 'literature',
  'unseen-the-awakening': 'literature',
  'the-awakening': 'literature',
  'cotswold-cottage': 'literature',
  'the-elder-witchs-oath': 'literature',
  'the-first-letter': 'literature',
  'the-funeral': 'literature',
  'the-glass-wife': 'literature',
  'the-replacement-wife': 'literature',
  'the-seabrook-bookshop': 'literature',
  'the-silence-between-us': 'literature',
  'the-thornwardens-oath': 'literature',
  'the-thornwood-inheritance': 'literature',
  'the-wrong-man': 'literature',
  'vow-of-thorns': 'literature',

  // FR novels
  'l-ange-des-cendres': 'literature',
  'l-epouse-de-cendre': 'literature',
  'le-contrat': 'literature',
  'heritiers-de-belmont': 'literature',
  'le-mensonge-des-brillants': 'literature',
  'le-murmure-des-pierres': 'literature',
  'le-prix-du-secret': 'literature',
  'le-prix-du-secret-chroniques-valdris-tome-2': 'literature',
  'le-sang-du-diable': 'literature',
  'le-voile-dechire-les-veines-du-diable-tome-2': 'literature',
  'les-funerailles': 'literature',
  'protection-rapprochee-tome-1': 'literature',
  'quelquun-est-entre-chez-moi': 'literature',
  'protection-rapprochee': 'literature',
  'les-chroniques-de-valdris': 'literature',
  'la-femme-de-remplacement': 'literature',
  'la-femme-de-verre': 'literature',
  'le-cottage-des-cotswolds': 'literature',
  'le-mauvais-candidat': 'literature',
  'le-serment-de-lainess-des-sorcieres': 'literature',
  'le-silence-entre-nous': 'literature',
  'lhomme-ideal': 'literature',
  'meurtre-a-la-librairie': 'literature',
  'sort-mortel': 'literature',
  'dette-de-sang': 'literature',
  'frequence-mortelle': 'literature',
  'la-premiere-lettre': 'literature',
  'la-librairie-de-seabrook': 'literature',
  'linvisible-leveil': 'literature',
  'leveil': 'literature',
  'le-serment-des-gardiens-depine': 'literature',
  'lheritage-de-thornwood': 'literature',
  'voeu-depines': 'literature',

  // DE novels
  'die-erwaehlte': 'literature',
  'die-stille-frau': 'literature',
  'die-tochter-des-schweigens': 'literature',
  'flammenblut': 'literature',
  'persephones-wahl': 'literature',
  'die-ersatzfrau': 'literature',
  'die-glaserne-ehefrau': 'literature',
  'mord-im-buchladen': 'literature',
  'das-cottage-in-den-cotswolds': 'literature',
  'der-falsche-mann': 'literature',
  'der-schwur-der-alten-hexe': 'literature',
  'die-stille-zwischen-uns': 'literature',
  'todliche-frequenz': 'literature',
  'hexenfluch-und-mord': 'literature',
  'die-widerwillige-gefahrtin-des-alphas': 'literature',
  'der-erste-brief': 'literature',
  'die-buchhandlung-von-seabrook': 'literature',
  'die-beerdigung': 'literature',
  'unsichtbar-das-erwachen': 'literature',
  'das-erwachen': 'literature',
  'der-schwur-der-dornenwachter': 'literature',
  'das-erbe-von-thornwood': 'literature',
  'schwur-der-dornen': 'literature',
  'blutschuld': 'literature',

  // ES novels
  'sangre-y-silencio': 'literature',
  'la-ladrona-de-estrellas': 'literature',
  'la-profecia-de-las-alas': 'literature',
  'el-detective-de-sangre': 'literature',
  'la-esposa-de-cristal': 'literature',
  'la-esposa-sustituta': 'literature',
  'asesinato-en-la-libreria': 'literature',
  'el-cottage-de-los-cotswolds': 'literature',
  'el-hombre-equivocado': 'literature',
  'el-juramento-de-la-bruja-mayor': 'literature',
  'el-silencio-entre-nosotros': 'literature',
  'frecuencia-mortal': 'literature',
  'hechizos-y-homicidios': 'literature',
  'la-primera-carta': 'literature',
  'la-libreria-de-seabrook': 'literature',
  'el-funeral': 'literature',
  'lo-invisible-el-despertar': 'literature',
  'el-despertar': 'literature',
  'el-juramento-de-los-guardianes-de-espinos': 'literature',
  'la-herencia-de-thornwood': 'literature',
  'juramento-de-espinas': 'literature',
  'deuda-de-sangre': 'literature',

  // IT novels
  'il-patto': 'literature',
  'l-appartamento-vuoto': 'literature',
  'l-incatenata': 'literature',
  'la-citta-dei-ricordi-perduti': 'literature',
  'la-preda': 'literature',
  'la-moglie-sostituta': 'literature',
  'la-moglie-di-vetro': 'literature',
  'omicidio-in-libreria': 'literature',
  'il-cottage-dei-cotswolds': 'literature',
  'luomo-sbagliato': 'literature',
  'il-giuramento-della-strega-anziana': 'literature',
  'il-silenzio-tra-noi': 'literature',
  'frequenza-mortale': 'literature',
  'sortilegi-e-omicidi': 'literature',
  'la-prima-lettera': 'literature',
  'la-libreria-di-seabrook': 'literature',
  'il-funerale': 'literature',
  'linvisibile-il-risveglio': 'literature',
  'il-risveglio': 'literature',
  'il-giuramento-dei-guardiani-di-spine': 'literature',
  'leredita-di-thornwood': 'literature',
  'giuramento-di-spine': 'literature',
  'debito-di-sangue': 'literature',

  // NL novels
  'de-verdronken-heks': 'literature',
  'de-watergeest': 'literature',
  'het-stille-water': 'literature',
  'de-vervangende-echtgenote': 'literature',
  'de-glazen-vrouw': 'literature',

  // PT novels
  'o-boto': 'literature',
  'o-contrato': 'literature',
  'a-esposa-substituta': 'literature',
  'a-esposa-de-vidro': 'literature',
  'assassinato-na-livraria': 'literature',
  'o-cottage-dos-cotswolds': 'literature',
  'o-homem-errado': 'literature',
  'o-silencio-entre-nos': 'literature',
  'a-primeira-carta': 'literature',
  'a-livraria-de-seabrook': 'literature',
  'o-funeral': 'literature',
  'o-invisivel-o-despertar': 'literature',
  'o-despertar': 'literature',
  'o-juramento-dos-guardioes-de-espinhos': 'literature',
  'a-heranca-de-thornwood': 'literature',
  'juramento-de-espinhos': 'literature',
  'divida-de-sangue': 'literature',

  // FI novels
  'jaan-alla': 'literature',
  'lasimurskka': 'literature',

  // ID novels
  'kebangkitan': 'literature',
  'kos-putri-no-7': 'literature',
  'tari-terakhir-di-ubud': 'literature',

  // VI novels
  'su-thuc-tinh': 'literature',

  // JA
  'sutoikku-risetto': 'literature',

  // ==========================================================
  // EMPLOYMENT (Emploi et carriere) — IA Express + Business/Freelance
  // ==========================================================

  // EN business & freelance tools
  'ai-business-automation-toolkit': 'employment',
  'client-onboarding-management-kit': 'employment',
  'creator-business-dashboard-notion-template': 'employment',
  'digital-product-launch-planner': 'employment',
  'freelance-money-tracker-tax-prep-kit': 'employment',
  'freelance-pricing-formula': 'employment',
  'side-hustle-digital-products-playbook': 'employment',
  'winning-proposals-pitch-pack': 'employment',

  // FR — IA Express (outils pro par metier)
  'ia-express-coachs-consultants': 'employment',
  'ia-express-comptables-experts-comptables': 'employment',
  'ia-express-enseignants': 'employment',
  'ia-express-entrepreneurs-solopreneurs': 'employment',
  'ia-express-professionnels-de-sante': 'employment',
  'ia-express-agents-immobiliers': 'employment',

  // ==========================================================
  // WRITING-PUBLISHING (Ecriture et edition) — Outils auteurs/KDP
  // ==========================================================

  '10-free-ai-prompts-that-make-you-money': 'writing-publishing',
  'ai-book-production-workflow': 'writing-publishing',
  'ai-content-machine-201-prompts': 'writing-publishing',
  'author-series-bible-template': 'writing-publishing',
  'book-description-blurb-templates': 'writing-publishing',
  'kdp-keywords-cheat-sheet': 'writing-publishing',
  'kdp-multilingual-mastery': 'writing-publishing',
  'romance-author-toolkit': 'writing-publishing',
  'self-publishing-launch-playbook': 'writing-publishing',
  'complete-indiepress-toolkit': 'writing-publishing',

  // FR writing tools
  'ia-express-creer-un-livre': 'writing-publishing',
  'ia-express-description-de-livre': 'writing-publishing',
  'ia-express-mots-cles-kdp': 'writing-publishing',
  'ia-express-serie-bible': 'writing-publishing',
  'boite-a-outils-indiepress': 'writing-publishing',
  'playbook-lancement-auto-edition': 'writing-publishing',
  'maitrise-multilingue-kdp': 'writing-publishing',
  'boite-a-outils-auteur-romance': 'writing-publishing',
  'machine-a-contenu-ia-201-prompts': 'writing-publishing',
  'workflow-production-livre-ia': 'writing-publishing',
  '10-prompts-ia-gratuits-qui-rapportent': 'writing-publishing',
  'modeles-description-livre': 'writing-publishing',

  // ==========================================================
  // HEALTH (Sante et bien-etre) — sante + ADHD planners
  // ==========================================================

  // EN health books
  'aging-with-grace': 'health',
  'slow-aging': 'health',
  'the-14-day-dopamine-reset': 'health',
  'perimenopause-guide': 'health',
  'natural-snack-kitchen': 'health',

  // EN ADHD planners (→ health)
  'adhd-brain-dump-planner': 'health',
  'adhd-budget-planner': 'health',
  'adhd-cleaning-planner': 'health',
  'adhd-dopamine-menu-planner': 'health',
  'adhd-meal-planner': 'health',
  'adhd-planner-bundle': 'health',
  'adhd-task-paralysis-breaker': 'health',

  // FR health
  'perte-de-poids-apres-40': 'health',
  'vieillir-avec-grace': 'health',
  'ralentir-le-vieillissement': 'health',
  'reset-dopamine-14-jours': 'health',
  'guide-perimenopause': 'health',
  'cuisine-snacks-naturels': 'health',

  // DE health
  'meal-prep-abnehmen': 'health',

  // IT health
  'detox-dal-cortisolo': 'health',

  // ==========================================================
  // PERSONAL DEVELOPMENT (Developpement personnel)
  // ==========================================================

  'mastering-anger-through-stoicism': 'personal-development',
  'psychology-of-self-love': 'personal-development',
  'the-reckoning': 'personal-development',
  'rise-unapologetic': 'personal-development',

  // ES
  'basta': 'personal-development',

  // PT
  'liberdade-reconquistada': 'personal-development',

  // FR
  'maitriser-la-colere-par-le-stoicisme': 'personal-development',
  'la-psychologie-de-lamour-de-soi': 'personal-development',
  'le-bilan': 'personal-development',
  'debout-sans-excuses': 'personal-development',

  // DE
  'wut-meistern-durch-stoizismus': 'personal-development',
  'die-psychologie-der-selbstliebe': 'personal-development',
  'die-abrechnung': 'personal-development',
  'steh-auf-ohne-entschuldigung': 'personal-development',

  // ==========================================================
  // PERSONAL FINANCE (Finances personnelles)
  // ==========================================================

  'drive-smarter-spend-less': 'personal-finance',
  'rewire-your-money-mind': 'personal-finance',
  'conduire-malin-depenser-moins': 'personal-finance',
  'reprogrammer-votre-esprit-financier': 'personal-finance',

  // ==========================================================
  // TRAVEL (Voyage)
  // ==========================================================

  'road-trip-usa': 'travel',
  'travel-light': 'travel',
  'family-travel-planner': 'travel',

  // ==========================================================
  // HALLOWEEN
  // ==========================================================

  'blood-moon-wolf-art-set': 'halloween',
  'creepy-halloween-wall-art-set': 'halloween',
  'curiosity-cabinet-art-set': 'halloween',
  'dark-halloween-wall-art-bundle': 'halloween',
  'elegant-skull-art-set': 'halloween',
  'ghost-banquet-art-set': 'halloween',
  'gothic-halloween-art-prints-bundle': 'halloween',
  'gothic-haunted-mansion-art-set': 'halloween',
  'halloween-gothic-printable-art-bundle': 'halloween',
  'halloween-printable-art-set': 'halloween',
  'halloween-wall-art-bundle': 'halloween',
  'haunted-halloween-prints': 'halloween',
  'haunted-lighthouse-art-set': 'halloween',
  'haunted-room-art-set': 'halloween',
  'headless-horseman-art-set': 'halloween',
  'jack-o-lantern-path-art-set': 'halloween',
  'spooky-halloween-wall-art-set': 'halloween',
  'spooky-season-wall-art-bundle': 'halloween',
  'cute-halloween-monster-coloring-book-kids': 'halloween',
  'halloween-abc-coloring-book-kids': 'halloween',
  'halloween-color-by-number-kids': 'halloween',
  'haunted-wonders-halloween-coloring-book': 'halloween',
  'mega-halloween-coloring-bundle-kids': 'halloween',
  'scary-girls-halloween-coloring-book': 'halloween',
  'trick-or-treat-halloween-coloring-book-kids': 'halloween',

  // ==========================================================
  // MEMORIAL (Funerailles et memorial)
  // ==========================================================

  'funeral-welcome-sign-religious-cross': 'memorial',
  'funeral-prayer-card-religious-cross': 'memorial',
  'funeral-bookmark-religious-cross': 'memorial',
  'funeral-bundle-religious-cross': 'memorial',
  'funeral-prayer-card-nature-sunset': 'memorial',
  'funeral-bookmark-nature-sunset': 'memorial',
  'funeral-bundle-nature-sunset': 'memorial',
  'funeral-bookmark-modern-minimal': 'memorial',
  'funeral-bundle-modern-minimal': 'memorial',
  'funeral-bookmark-elegant-floral': 'memorial',
  'funeral-photo-collage-elegant-floral': 'memorial',
  'funeral-bundle-elegant-floral': 'memorial',
  'funeral-bookmark-classic-dark': 'memorial',
  'funeral-bundle-classic-dark': 'memorial',
  // FR memorial
  'funerailles-signet-croix-religieuse': 'memorial',
  'funerailles-carte-priere-croix-religieuse': 'memorial',
  'funerailles-panneau-bienvenue-croix-religieuse': 'memorial',
  'funerailles-bundle-croix-religieuse': 'memorial',
  'funerailles-signet-nature-coucher-soleil': 'memorial',
  'funerailles-carte-priere-nature-coucher-soleil': 'memorial',
  'funerailles-bundle-nature-coucher-soleil': 'memorial',
  'funerailles-signet-moderne-minimal': 'memorial',
  'funerailles-bundle-moderne-minimal': 'memorial',
  'funerailles-signet-floral-elegant': 'memorial',
  'funerailles-collage-photo-floral-elegant': 'memorial',
  'funerailles-bundle-floral-elegant': 'memorial',
  'funerailles-signet-classique-sombre': 'memorial',
  'funerailles-bundle-classique-sombre': 'memorial',

  // ==========================================================
  // HOLIDAY (Fetes et saisons)
  // ==========================================================

  'the-absolute-art-of-christmas-cocktails': 'holiday',
  'christmas-cocktails-premium-guide': 'holiday',
  'lart-absolu-des-cocktails-de-noel': 'holiday',
  'guide-premium-cocktails-noel': 'holiday',

  // ==========================================================
  // YOUNG MOTHERS (Jeunes mamans)
  // ==========================================================

  'first-time-mom-after-35': 'young-mothers',
  'premiere-maman-apres-35-ans': 'young-mothers',

  // ==========================================================
  // NATURAL MEDICINE (Medecine naturelle)
  // ==========================================================

  'essential-natural-remedies': 'natural-medicine',
  'remedes-naturels-essentiels': 'natural-medicine',
};

// ============================================================
// FALLBACK RULES (pour les slugs non mappes)
// ============================================================
function guessCategory(slug, frontmatter) {
  // 1. Explicit mapping
  if (SLUG_TO_CATEGORY[slug]) return SLUG_TO_CATEGORY[slug];

  // 2. Pattern-based fallback
  if (slug.includes('funeral') || slug.includes('funerailles') || slug.includes('memorial')) return 'memorial';
  if (slug.includes('halloween') || slug.includes('haunted') || slug.includes('spooky') || slug.includes('ghost') || slug.includes('skull') || slug.includes('jack-o-lantern') || slug.includes('headless') || slug.includes('blood-moon') || slug.includes('curiosity-cabinet')) return 'halloween';
  if (slug.includes('coloring-book-kids') || slug.includes('coloring-bundle-kids')) return 'halloween';
  if (slug.includes('adhd')) return 'health';
  if (slug.includes('christmas') || slug.includes('cocktails-de-noel') || slug.includes('noel')) return 'holiday';
  if (slug.includes('ia-express')) return 'employment';
  if (slug.includes('kdp') || slug.includes('indiepress') || slug.includes('auto-edition') || slug.includes('author') || slug.includes('auteur') || slug.includes('book-description') || slug.includes('blurb') || slug.includes('romance-toolkit') || slug.includes('series-bible') || slug.includes('publishing') || slug.includes('prompts')) return 'writing-publishing';
  if (slug.includes('freelance') || slug.includes('business') || slug.includes('onboarding') || slug.includes('proposal') || slug.includes('pitch') || slug.includes('dashboard') || slug.includes('side-hustle') || slug.includes('digital-product-launch')) return 'employment';

  // 3. Type-based fallback from frontmatter
  if (frontmatter.includes('type: "roman"') || frontmatter.includes("type: 'roman'") || frontmatter.includes('type: roman')) return 'literature';

  // 4. Genre-based guess
  const genreMatch = frontmatter.match(/genre:\s*["']?([^"'\n]+)/);
  if (genreMatch) {
    const genre = genreMatch[1].toLowerCase();
    if (genre.includes('thriller') || genre.includes('romance') || genre.includes('mystery') || genre.includes('fantasy') || genre.includes('fiction') || genre.includes('gothic') || genre.includes('drama') || genre.includes('noir') || genre.includes('horror')) return 'literature';
    if (genre.includes('self-help') || genre.includes('psychology') || genre.includes('stoic') || genre.includes('desarrollo') || genre.includes('developpement')) return 'personal-development';
    if (genre.includes('health') || genre.includes('wellness') || genre.includes('aging') || genre.includes('dopamine') || genre.includes('perimenopause') || genre.includes('salute') || genre.includes('sante') || genre.includes('cortisol') || genre.includes('nutrition') || genre.includes('abnehmen') || genre.includes('poids')) return 'health';
    if (genre.includes('finance') || genre.includes('money') || genre.includes('budget') || genre.includes('fuel')) return 'personal-finance';
    if (genre.includes('travel') || genre.includes('voyage')) return 'travel';
  }

  return null;
}

// ============================================================
// VALEURS ACCEPTEES (pour corriger les anciennes valeurs)
// ============================================================
const VALID_CATEGORIES = new Set([
  'literature', 'employment', 'writing-publishing', 'health',
  'halloween', 'memorial', 'personal-development', 'travel',
  'personal-finance', 'holiday', 'natural-medicine', 'young-mothers',
  'seniors', 'relationships', 'housing', 'law', 'entertainment'
]);

// Mapping des anciennes valeurs vers les nouvelles
const CATEGORY_MIGRATION = {
  'finances': 'personal-finance',
  'finance': 'personal-finance',
  'business': 'employment',
  'planners': 'health',
  'planner': 'health',
  'developpement-personnel': 'personal-development',
  'dev-perso': 'personal-development',
  'sante': 'health',
  'roman': 'literature',
  'romans': 'literature',
  'nonfiction': null, // needs slug-based resolution
  'funeraire': 'memorial',
  'noel': 'holiday',
};

// ============================================================
// MAIN
// ============================================================
function main() {
  const boutiqueDir = path.join(process.cwd(), 'content', 'boutique');

  if (!fs.existsSync(boutiqueDir)) {
    console.error('ERREUR: Dossier content/boutique/ introuvable.');
    console.error('Assure-toi de lancer ce script depuis la racine de ton projet SDP.');
    process.exit(1);
  }

  const langs = fs.readdirSync(boutiqueDir).filter(f => {
    return fs.statSync(path.join(boutiqueDir, f)).isDirectory();
  });

  console.log(`\n===== FIX CATEGORIES v2 — SolutionsDirectesPro =====`);
  console.log(`Structure: 14 categories validees`);
  console.log(`Langues trouvees: ${langs.join(', ')}\n`);

  let totalFixed = 0;
  let totalSkipped = 0;
  let totalAlreadyOk = 0;
  let totalMigrated = 0;
  let unknowns = [];

  for (const lang of langs) {
    const langDir = path.join(boutiqueDir, lang);
    const files = fs.readdirSync(langDir).filter(f => f.endsWith('.md'));

    console.log(`--- ${lang.toUpperCase()} (${files.length} fichiers) ---`);

    for (const file of files) {
      const filePath = path.join(langDir, file);
      const content = fs.readFileSync(filePath, 'utf8');
      const slug = file.replace('.md', '');

      // Verifier si le fichier a du frontmatter
      if (!content.startsWith('---')) {
        console.log(`  SKIP ${file} (pas de frontmatter)`);
        totalSkipped++;
        continue;
      }

      const fmEnd = content.indexOf('---', 3);
      if (fmEnd === -1) {
        console.log(`  SKIP ${file} (frontmatter mal forme)`);
        totalSkipped++;
        continue;
      }

      const frontmatter = content.substring(0, fmEnd + 3);
      const body = content.substring(fmEnd + 3);

      // Extraire la categorie actuelle
      const catMatch = frontmatter.match(/^category:\s*["']?([^"'\n]*)["']?\s*$/m);
      const currentCat = catMatch ? catMatch[1].trim() : null;

      // Determiner la bonne categorie
      let targetCategory = null;

      if (currentCat) {
        // Verifier si la valeur actuelle est valide
        if (VALID_CATEGORIES.has(currentCat)) {
          // Verifier quand meme si le slug a un mapping explicite different
          const explicitCat = SLUG_TO_CATEGORY[slug];
          if (explicitCat && explicitCat !== currentCat) {
            targetCategory = explicitCat;
            console.log(`  MIG  ${file} : "${currentCat}" -> "${targetCategory}" (correction)`);
            totalMigrated++;
          } else {
            console.log(`  OK   ${file} (category: "${currentCat}")`);
            totalAlreadyOk++;
            continue;
          }
        } else if (CATEGORY_MIGRATION[currentCat]) {
          // Ancienne valeur connue → migrer
          targetCategory = CATEGORY_MIGRATION[currentCat];
          console.log(`  MIG  ${file} : "${currentCat}" -> "${targetCategory}"`);
          totalMigrated++;
        } else {
          // Valeur inconnue → essayer le mapping slug
          targetCategory = guessCategory(slug, frontmatter);
          if (targetCategory) {
            console.log(`  MIG  ${file} : "${currentCat}" -> "${targetCategory}"`);
            totalMigrated++;
          }
        }
      } else {
        // Pas de category → en ajouter une
        targetCategory = guessCategory(slug, frontmatter);
        if (targetCategory) {
          console.log(`  ADD  ${file} -> category: "${targetCategory}"`);
          totalFixed++;
        }
      }

      if (!targetCategory) {
        console.log(`  ???  ${file} (categorie inconnue - verifier manuellement)`);
        unknowns.push(`${lang}/${file}`);
        totalSkipped++;
        continue;
      }

      // Appliquer la modification
      let newFrontmatter;
      if (catMatch) {
        // Remplacer la ligne category existante
        newFrontmatter = frontmatter.replace(/^category:.*$/m, `category: "${targetCategory}"`);
      } else {
        // Ajouter category
        const typeLineMatch = frontmatter.match(/^type:.*$/m);
        if (typeLineMatch) {
          newFrontmatter = frontmatter.replace(
            typeLineMatch[0],
            `${typeLineMatch[0]}\ncategory: "${targetCategory}"`
          );
        } else {
          newFrontmatter = frontmatter.substring(0, fmEnd) + `category: "${targetCategory}"\n---`;
        }
      }

      const newContent = newFrontmatter + body;
      fs.writeFileSync(filePath, newContent, 'utf8');
    }
    console.log('');
  }

  // Resume
  console.log('===== RESUME =====');
  console.log(`Categories ajoutees:    ${totalFixed}`);
  console.log(`Categories migrees:     ${totalMigrated}`);
  console.log(`Deja corrects:          ${totalAlreadyOk}`);
  console.log(`Ignores/inconnus:       ${totalSkipped}`);
  console.log(`Total traites:          ${totalFixed + totalMigrated + totalAlreadyOk + totalSkipped}`);

  if (unknowns.length > 0) {
    console.log(`\n⚠️  Fichiers sans categorie determinee (a verifier):`);
    unknowns.forEach(u => console.log(`   - ${u}`));
  }

  console.log(`\n✅ Termine ! Lance deploy.bat pour deployer les changements.\n`);
}

main();
