
# source https://gohugo.io/hosting-and-deployment/hosting-on-github/
# usage "./deploy.sh "Your optional commit message"
# This script builds the current huge content and pushs changes to github

#!/bin/sh

# If a command fails then the deploy stops
set -e

printf "\033[0;32mDeploying updates to GitHub...\033[0m\n"

# Build the project.
hugo -t aafu

# Go To Public folder
cd public

# Add changes to git.
git add .

# Commit changes.
msg="rebuilding site $(date)"
if [ -n "$*" ]; then
	msg="$*"
fi
git commit -m "$msg"

# Push source and build repos.
git push origin master