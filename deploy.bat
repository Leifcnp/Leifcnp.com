:: modified from https://gohugo.io/hosting-and-deployment/hosting-on-github/
:: usage "./deploy.sh "Your optional commit message"
:: This script builds the current huge content and pushs changes to github


printf "Deploying updates to GitHub..."

:: Build the project.
hugo -t aafu
git add ./docs


if [%1]==[] GOTO NO_P

:: Commit changes.

git commit -m "%~1"
git push origin master

goto END

:NO_P
:: Commit changes.
git commit -m "Deployed website changes on %DATE:/=-%@%TIME::=-%"
git push origin master


:END
