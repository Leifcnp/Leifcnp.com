# Repository guide

## Project

- This repository contains the Hugo source for `https://www.leifcnp.com/`.
- The site uses the `aafu` theme from the `themes/aafu` Git submodule.
- Hugo publishes generated output to `docs/`, which is tracked for GitHub Pages.
- Preserve `docs/CNAME` and the custom-domain configuration.

## Working conventions

- Treat `config.toml`, `content/`, `static/`, and the theme submodule as source files.
- Do not edit generated files under `docs/` by hand; regenerate them with Hugo.
- Initialize dependencies after cloning with `git submodule update --init --recursive`.
- Preview changes locally with Hugo before committing.
- Build the published site with `hugo -t aafu` and review the resulting `docs/` changes.
- Keep commits focused and do not push or deploy unrelated changes.
