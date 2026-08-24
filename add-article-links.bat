@echo off
chcp 65001 >nul

echo Ajout des liens articles dans les pages boutique...

powershell -Command "Add-Content 'content\boutique\en\perimenopause-guide.md' \"`n`nRead our free guide: [Perimenopause Symptoms at 40 - What You Need to Know](/en/health/perimenopause-symptoms-guide)\""

powershell -Command "Add-Content 'content\boutique\en\first-time-mom-after-35.md' \"`n`nRead our free guide: [First-Time Mom After 35 - What No One Tells You](/en/health/first-time-mom-after-35-guide)\""

powershell -Command "Add-Content 'content\boutique\en\rewire-your-money-mind.md' \"`n`nRead our free guide: [Why You Self-Sabotage With Money](/en/finances/rewire-your-money-mind-guide)\""

powershell -Command "Add-Content 'content\boutique\en\rise-unapologetic.md' \"`n`nRead our free guide: [Why Women Shrink Themselves And How to Stop](/en/relationships/stop-shrinking-yourself-women-guide)\""

powershell -Command "Add-Content 'content\boutique\en\the-reckoning.md' \"`n`nRead our free guide: [Why So Many Men Feel Lost](/en/relationships/why-men-feel-lost-guide)\""

powershell -Command "Add-Content 'content\boutique\en\essential-natural-remedies.md' \"`n`nRead our free guide: [Natural Remedies That Actually Work](/en/health/natural-remedies-that-actually-work)\""

powershell -Command "Add-Content 'content\boutique\en\psychology-of-self-love.md' \"`n`nRead our free guide: [Why You Struggle With Self-Love](/en/relationships/why-you-struggle-with-self-love)\""

powershell -Command "Add-Content 'content\boutique\en\hexes-and-homicides.md' \"`n`nRead our free guide: [Why Cozy Mysteries Are So Addictive](/en/entertainment/cozy-mystery-books-guide)\""

powershell -Command "Add-Content 'content\boutique\fr\perte-de-poids-apres-40.md' \"`n`nLire notre guide gratuit : [Perdre du poids apres 40 ans - Le guide complet](/fr/sante/perte-de-poids-apres-40-guide)\""

powershell -Command "Add-Content 'content\boutique\fr\quelquun-est-entre-chez-moi.md' \"`n`nLire notre guide gratuit : [Quelqu'un est entre chez vous - Les signes et comment reagir](/fr/logement/cambriolage-signes-que-faire)\""

powershell -Command "Add-Content 'content\boutique\de\meal-prep-abnehmen.md' \"`n`nKostenlosen Ratgeber lesen: [Meal Prep zum Abnehmen - Der komplette Leitfaden](/de/gesundheit/meal-prep-abnehmen-guide)\""

powershell -Command "Add-Content 'content\boutique\de\die-stille-frau.md' \"`n`nKostenlosen Ratgeber lesen: [Gaslighting erkennen - Wenn dein Partner dich manipuliert](/de/beziehungen/gaslighting-erkennen-psychische-manipulation)\""

powershell -Command "Add-Content 'content\boutique\es\basta.md' \"`n`nLee nuestra guia gratuita: [Cuando decir basta - Como reconocer una relacion toxica](/es/relaciones/cuando-decir-basta-relaciones-toxicas)\""

powershell -Command "Add-Content 'content\boutique\pt\o-boto.md' \"`n`nLeia nosso guia gratuito: [A Lenda do Boto - O Misterio Mais Sedutor da Amazonia](/pt/entretenimento/lenda-do-boto-amazonia)\""

echo.
echo Termine ! Les 14 liens ont ete ajoutes.
echo Lancez deploy.bat pour mettre en ligne.
pause
