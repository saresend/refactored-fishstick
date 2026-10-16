# Personal site conventions

## Project
- Root: `/home/exedev/personal-site`. React + TypeScript + Vite, using npm and its committed lockfile.
- Node.js 24+ required; this VM uses `/home/exedev/node/bin/node`.
- This is an intentionally minimal coming-soon page, not a finished personal site.
- `src/App.tsx` and `src/App.css`: page content and styling. `src/index.css`: global styling.
- `index.html`: React entry document and metadata. Put static files, images, and standalone HTML pages in `public/`; e.g. `public/about.html` is served at `/about.html`.
- Don't replace the React root in `index.html` unless deliberately moving away from React.

## Persistence and API
- `server/storage.ts`: Node's built-in SQLite driver, schema initialization, and queries.
- `server/api.ts`: same-origin JSON API mounted by a Vite plugin in dev and preview.
- `GET /api/health` checks database access. `GET /api/site` reads persisted site settings.
- No public write endpoint is exposed. Add validation/authentication before introducing writes.
- Default database: `data/site.sqlite`; override with `DATABASE_PATH`.
- `data/`, secrets, and build outputs must remain untracked. Never import server modules into browser code.
- Schema creation/seeding must be idempotent and must not overwrite existing content. Use parameterized SQL.
- Add explicit migrations before evolving existing schemas. Do not delete user data to resolve schema differences.
- Back up a running database with SQLite's backup API/CLI; don't copy only the main file while WAL writes are active. Alternatively stop the service before copying the database files.

## Commands
```sh
npm ci                # install exact dependencies
npm run dev           # 0.0.0.0:8000, strict port; Ctrl-C to stop
npm test              # SQLite persistence and HTTP API tests using temporary databases
npm run lint          # oxlint
npm run build         # TypeScript checks and optimized dist/ build
npm run preview       # serve dist/ plus SQLite API on port 8000
```
The persistent systemd dev server already owns port 8000. Stop it before manually running dev/preview, then restart it afterward.

## Persistent service
```sh
sudo systemctl status personal-site --no-pager
sudo systemctl restart personal-site
sudo systemctl stop personal-site
sudo systemctl start personal-site
journalctl -u personal-site -n 100 --no-pager
```
Unit source: `deploy/personal-site.service`. To update it:
```sh
sudo install -m 644 deploy/personal-site.service /etc/systemd/system/personal-site.service
sudo systemctl daemon-reload
sudo systemctl enable --now personal-site
```
The service starts at boot and restarts on failure. Page edits use Vite HMR; restart after server/config changes if needed.

## Proxy and deployment
- Browser URL: `https://sam-resendez.exe.xyz/`; local checks: `http://localhost:8000/`.
- HTTPS is terminated by the exe.dev proxy. Vite binds HTTP on `0.0.0.0:8000`.
- Keep an explicit Vite host allowlist; do not use `allowedHosts: true`. HMR uses secure WebSockets through external port 443 when `PUBLIC_HMR_HOST` is set (the systemd unit sets it); leave it unset for local development.
- This is the requested development server, not a hardened production deployment. The exe.dev proxy controls access; don't assume the site is publicly anonymous. Before a public launch, use a production application/static server and review authentication and exposure.

## Change workflow
- Prefer small typed React components and plain CSS; avoid adding dependencies for simple tasks.
- Run `npm test`, `npm run lint`, and `npm run build` after changes.
- Smoke-test `/`, `/api/health`, and `/api/site`; verify the UI in a browser when changing it.
- Commit source, documentation, and package-lock.json; never commit node_modules, dist, or database files.
