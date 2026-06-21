# AI Usage — Backend

## Prompt

Erstelle ein TypeScript Express REST-Backend für eine anonyme Shared-Todo-App mit Drizzle ORM und PostgreSQL. Schema: nur todos (id, title, completed, created_at, updated_at), keine Tenant-Tabelle, Multi-Tenancy erfolgt später pro Instanz mit eigener DB. Endpunkte: GET /health, CRUD /api/todos mit Zod-Validierung. Lege dockerlocal/docker-compose.yml für lokales Postgres 16, .env.example, .gitignore und Drizzle-Migrations an. Migrations sollen beim App-Start automatisch laufen. Optional: db:seed für Demo-Todos. GitHub Actions verify.yml für PRs (npm ci, typecheck, build).

## Validierung

- Postgres gestartet: docker compose -f dockerlocal/docker-compose.yml up -d
- .env aus .env.example kopiert, npm install, npm run dev
- API getestet: GET /health, GET/POST/PATCH/DELETE /api/todos
- DB geprüft via pgadmin
- Optional: npm run db:seed und erneute DB-Abfrage
- Build: npm run typecheck und npm run build
