:: source https://gohugo.io/hosting-and-deployment/hosting-on-github/
:: usage "./deploy.sh "Your optional commit message"
:: This script builds the current huge content and pushs changes to github


printf "[0;32mDeploying updates to GitHub...[0m
"
:: Build the project.

hugo -t aafu
:: Go To Public folder

cd public
:: Add changes to git.

git add .
:: Commit changes.

git commit -m "%msg%"

:: Push source and build repos.

git push origin master
