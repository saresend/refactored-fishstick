# Personal site

Minimal React + TypeScript + Vite scaffold with a SQLite-backed API and a coming-soon page.

**Live on this VM:** https://sam-resendez.exe.xyz/

```sh
npm ci
npm run dev
```

The systemd service `personal-site` already runs the dev server on port **8000**, including after reboot. Stop it before launching another server on the same port.

Edit `src/App.tsx` and `src/App.css` for the homepage. Add standalone HTML and other static files to `public/`. SQLite data lives in `data/site.sqlite` (not committed).

```sh
npm test
npm run lint
npm run build
```

See [AGENTS.md](AGENTS.md) for architecture, API, persistence, proxy configuration, and service management.
