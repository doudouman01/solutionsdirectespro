@echo off
chcp 65001 >nul
echo Ajout des liens croisés entre articles EN...

powershell -Command "$f='content\en\health\perimenopause-symptoms-guide.md'; $c=Get-Content $f -Raw -Encoding UTF8; if($c -notmatch 'Also read'){$c=$c -replace '(\r?\n---\r?\n\r?\n## Go Deeper)','`n`n**Also read:**`n- [First-Time Mom After 35: What No One Tells You](/en/health/first-time-mom-after-35-guide)`n- [Natural Remedies That Actually Work](/en/health/natural-remedies-that-actually-work)`n$1'; Set-Content $f $c -Encoding UTF8; Write-Host 'OK: perimenopause'} else {Write-Host 'SKIP: perimenopause (deja fait)'}"

powershell -Command "$f='content\en\health\first-time-mom-after-35-guide.md'; $c=Get-Content $f -Raw -Encoding UTF8; if($c -notmatch 'Also read'){$c=$c -replace '(\r?\n---\r?\n\r?\n## Your Complete)','`n`n**Also read:**`n- [Perimenopause Symptoms at 40](/en/health/perimenopause-symptoms-guide)`n- [Why You Struggle With Self-Love](/en/relationships/why-you-struggle-with-self-love)`n$1'; Set-Content $f $c -Encoding UTF8; Write-Host 'OK: first-time-mom'} else {Write-Host 'SKIP: first-time-mom (deja fait)'}"

powershell -Command "$f='content\en\finances\rewire-your-money-mind-guide.md'; $c=Get-Content $f -Raw -Encoding UTF8; if($c -notmatch 'Also read'){$c=$c -replace '(\r?\n---\r?\n\r?\n## Ready to Rewire)','`n`n**Also read:**`n- [Why You Struggle With Self-Love](/en/relationships/why-you-struggle-with-self-love)`n- [Why So Many Men Feel Lost](/en/relationships/why-men-feel-lost-guide)`n$1'; Set-Content $f $c -Encoding UTF8; Write-Host 'OK: rewire-money'} else {Write-Host 'SKIP: rewire-money (deja fait)'}"

powershell -Command "$f='content\en\relationships\stop-shrinking-yourself-women-guide.md'; $c=Get-Content $f -Raw -Encoding UTF8; if($c -notmatch 'Also read'){$c=$c -replace '(\r?\n---\r?\n\r?\n## Ready to Rise)','`n`n**Also read:**`n- [Why You Struggle With Self-Love](/en/relationships/why-you-struggle-with-self-love)`n- [Perimenopause Symptoms at 40](/en/health/perimenopause-symptoms-guide)`n$1'; Set-Content $f $c -Encoding UTF8; Write-Host 'OK: rise-unapologetic'} else {Write-Host 'SKIP: rise-unapologetic (deja fait)'}"

powershell -Command "$f='content\en\relationships\why-men-feel-lost-guide.md'; $c=Get-Content $f -Raw -Encoding UTF8; if($c -notmatch 'Also read'){$c=$c -replace '(\r?\n---\r?\n\r?\n## Ready for The Reckoning)','`n`n**Also read:**`n- [Why You Self-Sabotage With Money](/en/finances/rewire-your-money-mind-guide)`n- [Why You Struggle With Self-Love](/en/relationships/why-you-struggle-with-self-love)`n$1'; Set-Content $f $c -Encoding UTF8; Write-Host 'OK: reckoning'} else {Write-Host 'SKIP: reckoning (deja fait)'}"

powershell -Command "$f='content\en\health\natural-remedies-that-actually-work.md'; $c=Get-Content $f -Raw -Encoding UTF8; if($c -notmatch 'Also read'){$c=$c -replace '(\r?\n---\r?\n\r?\n## Your Complete Guide)','`n`n**Also read:**`n- [Perimenopause Symptoms at 40](/en/health/perimenopause-symptoms-guide)`n- [First-Time Mom After 35](/en/health/first-time-mom-after-35-guide)`n$1'; Set-Content $f $c -Encoding UTF8; Write-Host 'OK: natural-remedies'} else {Write-Host 'SKIP: natural-remedies (deja fait)'}"

powershell -Command "$f='content\en\relationships\why-you-struggle-with-self-love.md'; $c=Get-Content $f -Raw -Encoding UTF8; if($c -notmatch 'Also read'){$c=$c -replace '(\r?\n---\r?\n\r?\n## Go Deeper)','`n`n**Also read:**`n- [Why Women Shrink Themselves](/en/relationships/stop-shrinking-yourself-women-guide)`n- [Why So Many Men Feel Lost](/en/relationships/why-men-feel-lost-guide)`n$1'; Set-Content $f $c -Encoding UTF8; Write-Host 'OK: self-love'} else {Write-Host 'SKIP: self-love (deja fait)'}"

echo.
echo Termine ! 7 articles mis a jour avec liens croises.
echo Lancez deploy.bat pour mettre en ligne.
pause
