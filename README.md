# Solutions Directes Pro — Site Multilingue

## Workflow : Publier un article

### 1. Créer le fichier Markdown

Créez un fichier `.md` dans le bon dossier langue/catégorie :

```
content/
  fr/
    finances/
      mon-article.md       ← Article FR catégorie Finances
    emploi/
      autre-article.md     ← Article FR catégorie Emploi
  en/
    finances/
      my-article.md        ← Article EN catégorie Finances
  de/
    finanzen/
      mein-artikel.md      ← Article DE catégorie Finanzen
  es/
    finanzas/
      mi-articulo.md       ← Article ES catégorie Finanzas
  ... (18 langues au total)
```

### 2. Format du fichier Markdown

```markdown
---
title: "Le titre de votre article"
date: "2026-08-22"
excerpt: "Un résumé court qui apparaît sur la carte de l'article."
author: "Solutions Directes Pro"
---

## Premier sous-titre

Votre contenu ici. Vous pouvez utiliser tout le Markdown :

- Listes
- **Gras**
- *Italique*
- [Liens](https://example.com)

> Citations

### Sous-sous-titre

Plus de contenu...
```

### 3. Déployer

Double-cliquez sur `deploy.bat` — c'est tout !

Le fichier est poussé vers GitHub → Vercel détecte le changement → le site est mis à jour en 30-60 secondes.

---

## Structure des langues et catégories

| Langue | Code | Catégories |
|--------|------|------------|
| Français | fr | finances, emploi, sante, logement, droit, relations, luxe, retraite |
| English | en | finances, employment, health, housing, law, relationships, luxury, retirement |
| Deutsch | de | finanzen, arbeit, gesundheit, wohnen, recht, beziehungen, luxus, rente |
| Español | es | finanzas, empleo, salud, vivienda, derecho, relaciones, lujo, jubilacion |
| Italiano | it | finanze, lavoro, salute, alloggio, diritto, relazioni, lusso, pensione |
| Dansk | da | finans, arbejde, sundhed, bolig, jura, relationer |
| Nederlands | nl | financien, werk, gezondheid, huisvesting, recht, relaties |
| Svenska | sv | ekonomi, arbete, halsa, bostad, ratt, relationer |
| Polski | pl | finanse, praca, zdrowie, mieszkanie, prawo, relacje |
| Português | pt | financas, emprego, saude, moradia, direito, relacionamentos |
| Suomi | fi | talous, tyo, terveys, asuminen, oikeus, suhteet |
| Indonesia | id | keuangan, pekerjaan, kesehatan, perumahan, hukum, hubungan |
| Melayu | ms | kewangan, pekerjaan, kesihatan, perumahan, undangundang, perhubungan |
| Română | ro | finante, munca, sanatate, locuinta, drept, relatii |
| Ελληνικά | el | oikonomika, ergasia, ygeia, stegasi, dikaio, sxeseis |
| Čeština | cs | finance, prace, zdravi, bydleni, pravo, vztahy |
| Tiếng Việt | vi | tai-chinh, viec-lam, suc-khoe, nha-o, phap-luat, quan-he |
| Íslenska | is | fjarmal, vinna, heilsa, husnaedi, rettur, samband |

## Ajouter une nouvelle catégorie

1. Ajouter la catégorie dans `src/lib/config.js` sous la langue concernée
2. Créer le dossier correspondant dans `content/[langue]/[nouvelle-categorie]/`
3. Y déposer vos articles .md
4. Double-cliquer `deploy.bat`

## Setup initial (une seule fois)

```bash
npm install
git init
git remote add origin https://github.com/VOTRE-USERNAME/solutionsdirectespro.git
git add -A
git commit -m "Initial commit"
git push -u origin main
```

Puis sur Vercel : Import du repo GitHub → le site est live.
