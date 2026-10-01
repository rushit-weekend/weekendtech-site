# weekendtech.org

Static website for Weekend Tech. No build step: `docs/` is served as-is.

- `docs/` — the website (HTML, CSS, JS, brand assets)
- `WEEKENDtech-logo/` — logo pack and design tokens (source of `docs/assets` and `docs/css/tokens.css`)

Preview locally: `python3 -m http.server 8765 -d docs`, then open http://localhost:8765

GitHub Pages serves `docs/` from the `main` branch, so every push to `main` goes live within a minute or two. Custom domain: `docs/CNAME`.

## Contact form

The form posts to a Google Apps Script web app (`apps-script/contact-form.gs`) that runs in the
weekendtech.org Workspace as rushit@weekendtech.org. Each enquiry is:

- appended to the **Enquiries** tab of the "Weekend Tech — website enquiries" Google Sheet, and
- emailed to **hello@weekendtech.org** (a Google Group: Rushit + Priyanka), with Reply-To set to the visitor.
  Rushit also gets a direct copy, because Gmail hides your own messages to a group from your inbox.

To change the script: edit `apps-script/contact-form.gs`, paste it into the Apps Script editor
(Sheet → Extensions → Apps Script), then Deploy → Manage deployments → Edit → New version.
The web app URL (`FORM_ENDPOINT` in `docs/js/main.js`) stays the same.
