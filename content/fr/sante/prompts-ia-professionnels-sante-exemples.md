---
title: "Prompts IA pour Professionnels de Sante : Exemples Concrets et Bonnes Pratiques"
description: "Exemples de prompts IA prets a l'emploi pour les professionnels de sante : redaction medicale, fiches patient, bilans et courriers. Structure CRISPE et erreurs a eviter."
date: "2026-10-01"
---

# Prompts IA pour Professionnels de Santé : Exemples Concrets et Bonnes Pratiques

Un prompt, c'est une instruction donnée à une intelligence artificielle. En médecine, la qualité du prompt détermine la qualité du résultat — exactement comme la qualité de l'anamnèse détermine la pertinence du raisonnement clinique. Pourtant, la plupart des soignants qui testent l'IA pour la première fois utilisent des requêtes trop vagues, obtiennent des résultats décevants, et concluent que l'outil n'est pas adapté à leur pratique.

Cet article présente les principes d'un prompt médical efficace, des exemples concrets pour les tâches les plus courantes, et les erreurs qui compromettent la fiabilité des résultats.

## Qu'est-ce qu'un bon prompt médical ?

### La différence entre un prompt générique et un prompt professionnel

Comparez ces deux requêtes :

**Prompt faible :** *"Écris un courrier pour un cardiologue."*

**Prompt structuré :** *"Rédige un courrier d'adressage d'un médecin généraliste vers un cardiologue pour un patient homme de 58 ans, hypertendu sous bithérapie (IEC + inhibiteur calcique), avec découverte récente d'une fibrillation auriculaire paroxystique à l'ECG de contrôle. Inclure : motif précis, traitements en cours avec posologies, résultats du dernier bilan biologique (créatinine, kaliémie, NFS), et la question clinique posée au correspondant. Ton professionnel, format courrier médical standard."*

Le second prompt produit un résultat exploitable en une seule génération. Le premier nécessitera trois à quatre allers-retours — et le médecin aura perdu plus de temps qu'en rédigeant lui-même.

### Les quatre piliers d'un prompt médical efficace

Un prompt médical performant repose sur quatre éléments :

1. **Le rôle** : préciser dans quel contexte professionnel l'IA doit se positionner
2. **Le contexte clinique** : fournir les données pertinentes (anonymisées)
3. **Le format attendu** : structure, longueur, ton, destinataire
4. **Les contraintes** : ce que le résultat ne doit PAS contenir (diagnostic différentiel non demandé, jargon inadapté au patient, etc.)

## La structure CRISPE : un cadre pour des prompts reproductibles

### Comment fonctionne CRISPE

La méthode CRISPE, détaillée dans le guide *IA Express — Professionnels de Santé*, fournit un cadre mnémotechnique pour construire des prompts de qualité professionnelle :

- **C** — Capacité : quel rôle l'IA doit-elle jouer ? (assistant médical, rédacteur médical, vulgarisateur santé)
- **R** — Requête : quelle est la tâche précise demandée ?
- **I** — Informations : quelles données cliniques fournir ?
- **S** — Style : quel registre de langue, quel format ?
- **P** — Public : qui lira le résultat ? (confrère, patient, organisme)
- **E** — Exclusions : que faut-il explicitement écarter ?

Ce cadre n'alourdit pas la rédaction du prompt — il l'accélère en supprimant les oublis qui provoquent des résultats inutilisables.

## Exemples de prompts par tâche courante

### Compte rendu de consultation

```
Capacité : Assistant de rédaction médicale.
Requête : Rédiger un compte rendu de consultation structuré.
Informations : Patient [âge, sexe], motif de consultation [symptôme principal],
examen clinique [constantes, observations], hypothèse retenue,
plan de prise en charge [prescriptions, examens complémentaires, suivi].
Style : Format SOAP (Subjectif, Objectif, Analyse, Plan), ton médical concis.
Public : Dossier médical du patient.
Exclusions : Pas de données nominatives, pas de diagnostic différentiel étendu.
```

Ce type de prompt permet de passer de 8-10 minutes de rédaction à 2-3 minutes de relecture et ajustement.

### Courrier d'adressage à un spécialiste

```
Rédige un courrier d'adressage professionnel d'un médecin généraliste
vers un [spécialité]. Patient : [âge, sexe, antécédents pertinents].
Motif d'adressage : [raison clinique précise]. Traitements actuels :
[liste avec posologies]. Résultats d'examens récents : [données pertinentes].
Question posée au confrère : [question clinique précise].
Format : courrier médical standard avec en-tête, formule de politesse confraternelle.
```

### Fiche d'éducation thérapeutique patient

```
Crée une fiche d'information patient sur [pathologie/traitement].
Niveau de langage : accessible, sans jargon médical. Inclure :
explication simple de la maladie, objectifs du traitement,
règles hygiéno-diététiques, signes d'alerte nécessitant une consultation,
et un tableau de suivi que le patient peut remplir.
Format : une page A4, avec titres et puces pour faciliter la lecture.
```

Les fiches produites avec ce type de prompt contribuent directement à l'observance thérapeutique. Les retours terrain montrent une amélioration de **35 à 62 %** de l'observance quand les patients reçoivent des supports personnalisés et adaptés.

### Revue de médication pour patient polymédiqué

```
Analyse cette liste de médicaments pour un patient de [âge] ans
présentant [comorbidités] : [liste complète des traitements avec posologies].
Identifie : interactions médicamenteuses potentielles, doublons thérapeutiques,
médicaments potentiellement inappropriés selon les critères de Beers/STOPP-START,
et suggestions d'optimisation. Présente sous forme de tableau avec
niveau de risque (faible/modéré/élevé) et recommandation d'action.
```

**Attention** : ce type de prompt sert d'aide à la réflexion, jamais de décision thérapeutique. Le médecin valide systématiquement chaque suggestion contre son jugement clinique et les référentiels en vigueur. La [base de données publique des médicaments](https://base-donnees-publique.medicaments.gouv.fr/) reste la référence officielle pour les interactions et contre-indications.

## Les erreurs qui compromettent les résultats

### Erreur n°1 : le prompt trop vague

"Aide-moi avec ce patient" ne produit rien d'exploitable. L'IA a besoin de contexte structuré pour générer un résultat pertinent. Plus le prompt est précis, moins il faut de corrections.

### Erreur n°2 : inclure des données nominatives

C'est la faute la plus grave. **Aucune donnée permettant d'identifier un patient** ne doit être saisie dans un outil d'IA générative grand public. Utilisez des descriptions anonymisées : "patient homme, 62 ans, diabétique de type 2" — jamais de nom, prénom, numéro de sécurité sociale ou date de naissance. La [CNIL](https://www.cnil.fr/fr/intelligence-artificielle) rappelle régulièrement ces obligations dans ses recommandations sur l'IA en santé.

### Erreur n°3 : accepter le premier résultat sans relecture

L'IA peut produire des informations plausibles mais incorrectes — ce qu'on appelle des hallucinations. En contexte médical, chaque sortie doit être relue avec le même esprit critique qu'un résumé rédigé par un interne. Le praticien reste le garant de l'exactitude.

### Erreur n°4 : ne pas itérer

Un prompt est rarement parfait du premier coup. L'approche recommandée consiste à affiner progressivement : générer un premier résultat, identifier ce qui manque ou ce qui est en trop, ajuster les instructions, régénérer. En deux ou trois itérations, on obtient un prompt réutilisable pour toutes les situations similaires.

## Construire sa bibliothèque de prompts

L'intérêt à long terme n'est pas d'utiliser l'IA ponctuellement, mais de constituer une **bibliothèque de prompts validés** couvrant les tâches récurrentes de sa pratique. Un médecin généraliste peut typiquement couvrir 80 % de ses besoins rédactionnels avec 10 à 15 prompts bien conçus.

Le guide *IA Express — Professionnels de Santé* fournit 50 prompts prêts à l'emploi, testés en conditions réelles de cabinet, couvrant l'ensemble des besoins des professionnels de santé — médecins, infirmiers, kinésithérapeutes, pharmaciens et psychologues. Chaque prompt est accompagné de son contexte d'utilisation, de ses variantes et des points de vigilance spécifiques.

**À lire aussi :**

- [Intelligence Artificielle pour Médecins : Comment Transformer sa Pratique Quotidienne](/articles/fr/sante/intelligence-artificielle-medecins-pratique)
- [RGPD et IA en Cabinet Médical : Le Guide de Conformité pour les Soignants](/articles/fr/sante/rgpd-ia-cabinet-medical-conformite)
- [Automatiser les Tâches Administratives Médicales avec l'IA](/articles/fr/sante/automatiser-taches-administratives-medecin-ia)

---

## 50 Prompts IA Prêts à l'Emploi pour Votre Cabinet

Pourquoi repartir de zéro quand 50 prompts testés en cabinet vous attendent ? Le guide *IA Express — Professionnels de Santé* par Adrian Phoenix Vale inclut la méthode CRISPE complète, 5 workflows clés en main et le cadre réglementaire pour utiliser l'IA en toute conformité. 353 pages.

**[>>> Découvrir le guide <<<](/boutique/fr/ia-express-professionnels-de-sante)**
