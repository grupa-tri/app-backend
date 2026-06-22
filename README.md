# Shared Todo App — Backend

REST API for a simple anonymous shared todo list. Part of a 3-tier application (PostgreSQL, Backend, Frontend).

Multi-tenancy is handled at infrastructure level: each tenant gets its own isolated instance with a dedicated database (provisioned via Crossplane/GitOps). The application itself has no tenant logic.

## Tech Stack

- Node.js 22 + TypeScript
- Express
- Drizzle ORM + PostgreSQL
- Zod validation

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/health` | Health check |
| `GET` | `/api/todos` | List all todos |
| `POST` | `/api/todos` | Create todo `{ "title": "..." }` |
| `PATCH` | `/api/todos/:id` | Update todo `{ "title"?, "completed"? }` |
| `DELETE` | `/api/todos/:id` | Delete todo |

## Local Setup

### 1. Start PostgreSQL

```bash
docker compose -f dockerlocal/docker-compose.yml up -d
```

### 2. Configure environment

```bash
cp .env.example .env
```

### 3. Install dependencies and setup database

```bash
npm install
npm run db:seed   # optional: sample todos
```

Migrations are applied automatically when the server starts (`npm run dev` or `npm start`).

### 4. Start development server

```bash
npm run dev
```

Server runs at `http://localhost:3000`.

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | — |
| `PORT` | Server port | `3000` |
| `CORS_ORIGIN` | Allowed frontend origin | `http://localhost:5173` |

## Scripts

- `npm run dev` — Start with hot reload
- `npm run build` — Compile TypeScript
- `npm run start` — Run compiled output
- `npm run db:generate` — Generate migration from schema
- `npm run db:migrate` — Apply migrations manually (also runs automatically on start)
- `npm run db:seed` — Insert sample todos
- `npm run typecheck` — Type check without emit

## CI / GHCR
 
**Image:** `ghcr.io/grupa-tri/app-backend:latest` and `ghcr.io/grupa-tri/app-backend:VERSION` (from `package.json`)