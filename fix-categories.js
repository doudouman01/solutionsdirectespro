/**
 * fix-categories.js
 * ==================
 * Script pour ajouter le champ "category" manquant dans tous les fichiers
 * boutique de SolutionsDirectesPro, toutes langues confondues.
 *
 * UTILISATION:
 *   1. Place ce fichier a la racine de ton projet (a cote de package.json)
 *   2. Ouvre un terminal dans le dossier du projet
 *   3. Tape:  node fix-categories.js
 *   4. Le script affiche tous les fichiers modifies
 *   5. Lance deploy.bat comme d'habitude
 */

const fs = require('fs');
const path = require('path');

// ============================================================
// MAPPING SLUG → CATEGORY (pour tous les produits connus)
// ============================================================
const SLUG_TO_CATEGORY = {
  // === LITERATURE (romans / fiction) ===
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
  'les-funerailles': 'literature',
  'linvisible-leveil': 'literature',
  'leveil': 'literature',
  'le-serment-des-gardiens-depine': 'literature',
  'lheritage-de-thornwood': 'literature',
  'voeu-depines': 'literature',

  // ES novels
  'sangre-y-silencio': 'literature',
  'la-ladrona-de-estrellas': 'literature',
  'la-esposa-de-cristal': 'literature',
  'la-esposa-sustituta': 'literature',
  'asesinato-en-la-libreria': 'literature',
  'el-cottage-de-los-cotswolds': 'literature',
  'el-hombre-equivocado': 'literature',
  'el-juramento-de-la-bruja-mayor': 'literature',
  'el-silencio-entre-nosotros': 'literature',
  'frecuencia-mortal': 'literature',
  'hechizos-y-homicidios': 'literature',
  'la-compañera-reluctante-del-alfa': 'literature',
  'la-primera-carta': 'literature',
  'la-libreria-de-seabrook': 'literature',
  'el-funeral': 'literature',
  'lo-invisible-el-despertar': 'literature',
  'el-despertar': 'literature',
  'el-juramento-de-los-guardianes-de-espinos': 'literature',
  'la-herencia-de-thornwood': 'literature',
  'juramento-de-espinas': 'literature',
  'deuda-de-sangre': 'literature',

  // DE novels
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

  // IT novels
  'la-moglie-sostituta': 'literature',
  'la-moglie-di-vetro': 'literature',
  'omicidio-in-libreria': 'literature',
  'il-cottage-dei-cotswolds': 'literature',
  'luomo-sbagliato': 'literature',
  'il-giuramento-della-strega-anziana': 'literature',
  'il-silenzio-tra-noi': 'literature',
  'frequenza-mortale': 'literature',
  'sortilegi-e-omicidi': 'literature',
  'la-compagna-riluttante-dellalfa': 'literature',
  'la-prima-lettera': 'literature',
  'la-libreria-di-seabrook': 'literature',
  'il-funerale': 'literature',
  'linvisibile-il-risveglio': 'literature',
  'il-risveglio': 'literature',
  'il-giuramento-dei-guardiani-di-spine': 'literature',
  'leredita-di-thornwood': 'literature',
  'giuramento-di-spine': 'literature',
  'debito-di-sangue': 'literature',

  // PT novels
  'a-esposa-substituta': 'literature',
  'a-esposa-de-vidro': 'literature',
  'assassinato-na-livraria': 'literature',
  'o-cottage-dos-cotswolds': 'literature',
  'o-homem-errado': 'literature',
  'o-juramento-da-bruxa-anciã': 'literature',
  'o-silencio-entre-nos': 'literature',
  'frequencia-mortal': 'literature',
  'feiticos-e-homicidios': 'literature',
  'a-companheira-relutante-do-alfa': 'literature',
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

  // JA novels
  'sutoikku-risetto': 'literature',

  // NL novels
  'de-vervangende-echtgenote': 'literature',
  'de-glazen-vrouw': 'literature',

  // === PERSONAL DEVELOPMENT ===
  'mastering-anger-through-stoicism': 'personal-development',
  'psychology-of-self-love': 'personal-development',
  'the-reckoning': 'personal-development',
  'rise-unapologetic': 'personal-development',
  // FR
  'maitriser-la-colere-par-le-stoicisme': 'personal-development',
  'la-psychologie-de-lamour-de-soi': 'personal-development',
  'le-bilan': 'personal-development',
  'debout-sans-excuses': 'personal-development',
  // ES
  'dominar-la-ira-con-estoicismo': 'personal-development',
  'la-psicologia-del-amor-propio': 'personal-development',
  'el-ajuste-de-cuentas': 'personal-development',
  'levantate-sin-disculpas': 'personal-development',
  // DE
  'wut-meistern-durch-stoizismus': 'personal-development',
  'die-psychologie-der-selbstliebe': 'personal-development',
  'die-abrechnung': 'personal-development',
  'steh-auf-ohne-entschuldigung': 'personal-development',

  // === HEALTH ===
  'aging-with-grace': 'health',
  'slow-aging': 'health',
  'the-14-day-dopamine-reset': 'health',
  'perimenopause-guide': 'health',
  'natural-snack-kitchen': 'health',
  // FR
  'vieillir-avec-grace': 'health',
  'ralentir-le-vieillissement': 'health',
  'reset-dopamine-14-jours': 'health',
  'guide-perimenopause': 'health',
  'cuisine-snacks-naturels': 'health',

  // === PERSONAL FINANCE ===
  'drive-smarter-spend-less': 'personal-finance',
  'rewire-your-money-mind': 'personal-finance',
  // FR
  'conduire-malin-depenser-moins': 'personal-finance',
  'reprogrammer-votre-esprit-financier': 'personal-finance',

  // === TRAVEL ===
  'road-trip-usa': 'travel',
  'travel-light': 'travel',
  'family-travel-planner': 'travel',

  // === WRITING & PUBLISHING ===
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
  // FR
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

  // === BUSINESS ===
  'ai-business-automation-toolkit': 'business',
  'client-onboarding-management-kit': 'business',
  'creator-business-dashboard-notion-template': 'business',
  'digital-product-launch-planner': 'business',
  'freelance-money-tracker-tax-prep-kit': 'business',
  'freelance-pricing-formula': 'business',
  'side-hustle-digital-products-playbook': 'business',
  'winning-proposals-pitch-pack': 'business',

  // === PLANNERS (ADHD) ===
  'adhd-brain-dump-planner': 'planners',
  'adhd-budget-planner': 'planners',
  'adhd-cleaning-planner': 'planners',
  'adhd-dopamine-menu-planner': 'planners',
  'adhd-meal-planner': 'planners',
  'adhd-planner-bundle': 'planners',
  'adhd-task-paralysis-breaker': 'planners',

  // === HALLOWEEN ===
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

  // === MEMORIAL (funeral templates) ===
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
  // FR
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

  // === HOLIDAY ===
  'the-absolute-art-of-christmas-cocktails': 'holiday',
  'christmas-cocktails-premium-guide': 'holiday',
  // FR
  'lart-absolu-des-cocktails-de-noel': 'holiday',
  'guide-premium-cocktails-noel': 'holiday',

  // === YOUNG MOTHERS ===
  'first-time-mom-after-35': 'young-mothers',
  // FR
  'premiere-maman-apres-35-ans': 'young-mothers',

  // === NATURAL MEDICINE ===
  'essential-natural-remedies': 'natural-medicine',
  // FR
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
  if (slug.includes('halloween') || slug.includes('haunted') || slug.includes('spooky') || slug.includes('ghost') || slug.includes('skull') || slug.includes('jack-o-lantern') || slug.includes('headless') || slug.includes('coloring-book-kids') || slug.includes('blood-moon') || slug.includes('curiosity-cabinet')) return 'halloween';
  if (slug.includes('adhd') || slug.includes('planner-bundle')) return 'planners';
  if (slug.includes('christmas') || slug.includes('cocktails-de-noel') || slug.includes('noel')) return 'holiday';
  if (slug.includes('kdp') || slug.includes('indiepress') || slug.includes('publishing') || slug.includes('auto-edition') || slug.includes('ia-express') || slug.includes('author') || slug.includes('auteur') || slug.includes('book-description') || slug.includes('blurb') || slug.includes('romance-toolkit') || slug.includes('series-bible')) return 'writing-publishing';
  if (slug.includes('freelance') || slug.includes('business') || slug.includes('onboarding') || slug.includes('proposal') || slug.includes('pitch') || slug.includes('dashboard') || slug.includes('side-hustle') || slug.includes('digital-product-launch')) return 'business';

  // 3. Type-based fallback from frontmatter
  if (frontmatter.includes('type: "roman"') || frontmatter.includes("type: 'roman'") || frontmatter.includes('type: roman')) return 'literature';

  // 4. Genre-based guess
  const genreMatch = frontmatter.match(/genre:\s*["']?([^"'\n]+)/);
  if (genreMatch) {
    const genre = genreMatch[1].toLowerCase();
    if (genre.includes('thriller') || genre.includes('romance') || genre.includes('mystery') || genre.includes('fantasy') || genre.includes('fiction') || genre.includes('gothic') || genre.includes('drama')) return 'literature';
    if (genre.includes('self-help') || genre.includes('psychology') || genre.includes('stoic')) return 'personal-development';
    if (genre.includes('health') || genre.includes('wellness') || genre.includes('aging') || genre.includes('dopamine') || genre.includes('perimenopause')) return 'health';
    if (genre.includes('finance') || genre.includes('money') || genre.includes('budget')) return 'personal-finance';
    if (genre.includes('travel')) return 'travel';
  }

  return null; // Pas de categorie trouvee
}

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

  // Lister toutes les langues
  const langs = fs.readdirSync(boutiqueDir).filter(f => {
    return fs.statSync(path.join(boutiqueDir, f)).isDirectory();
  });

  console.log(`\n===== FIX CATEGORIES - SolutionsDirectesPro =====`);
  console.log(`Langues trouvees: ${langs.join(', ')}\n`);

  let totalFixed = 0;
  let totalSkipped = 0;
  let totalAlreadyOk = 0;
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

      // Extraire le frontmatter
      const fmEnd = content.indexOf('---', 3);
      if (fmEnd === -1) {
        console.log(`  SKIP ${file} (frontmatter mal forme)`);
        totalSkipped++;
        continue;
      }

      const frontmatter = content.substring(0, fmEnd + 3);
      const body = content.substring(fmEnd + 3);

      // Verifier si category existe deja
      const hasCategoryLine = /^category:/m.test(frontmatter);

      if (hasCategoryLine) {
        // Verifier si la valeur est vide
        const catMatch = frontmatter.match(/^category:\s*["']?([^"'\n]*)["']?\s*$/m);
        if (catMatch && catMatch[1].trim()) {
          console.log(`  OK   ${file} (category: "${catMatch[1].trim()}")`);
          totalAlreadyOk++;
          continue;
        }
      }

      // Determiner la bonne categorie
      const category = guessCategory(slug, frontmatter);

      if (!category) {
        console.log(`  ???  ${file} (categorie inconnue - a verifier manuellement)`);
        unknowns.push(`${lang}/${file}`);
        totalSkipped++;
        continue;
      }

      // Ajouter ou corriger le champ category
      let newFrontmatter;
      if (hasCategoryLine) {
        // Remplacer la ligne category existante (vide)
        newFrontmatter = frontmatter.replace(/^category:.*$/m, `category: "${category}"`);
      } else {
        // Ajouter category avant la fermeture ---
        // On l'insere apres "type:" si present, sinon avant le ---
        const typeLineMatch = frontmatter.match(/^type:.*$/m);
        if (typeLineMatch) {
          newFrontmatter = frontmatter.replace(
            typeLineMatch[0],
            `${typeLineMatch[0]}\ncategory: "${category}"`
          );
        } else {
          // Ajouter juste avant le dernier ---
          newFrontmatter = frontmatter.substring(0, fmEnd) + `category: "${category}"\n---`;
        }
      }

      const newContent = newFrontmatter + body;
      fs.writeFileSync(filePath, newContent, 'utf8');
      console.log(`  FIX  ${file} -> category: "${category}"`);
      totalFixed++;
    }
    console.log('');
  }

  // Resume
  console.log('===== RESUME =====');
  console.log(`Fichiers corriges:   ${totalFixed}`);
  console.log(`Deja corrects:       ${totalAlreadyOk}`);
  console.log(`Ignores/inconnus:    ${totalSkipped}`);
  console.log(`Total traites:       ${totalFixed + totalAlreadyOk + totalSkipped}`);

  if (unknowns.length > 0) {
    console.log(`\n⚠️  Fichiers sans categorie determinee (a verifier):`);
    unknowns.forEach(u => console.log(`   - ${u}`));
  }

  console.log(`\n✅ Termine ! Lance deploy.bat pour deployer les changements.\n`);
}

main();
