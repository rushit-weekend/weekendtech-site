# weekendtech.org

Static website for Weekend Tech. No build step: `docs/` is served as-is.

- `docs/` — the website (HTML, CSS, JS, brand assets)
- `WEEKENDtech-logo/` — logo pack and design tokens (source of `docs/assets` and `docs/css/tokens.css`)

Preview locally: `python3 -m http.server 8765 -d docs`, then open http://localhost:8765

GitHub Pages serves `docs/` from the `main` branch, so every push to `main` goes live within a minute or two. Custom domain: `docs/CNAME`.
