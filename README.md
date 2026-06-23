# Shared Todo App — Backend

REST API for a simple shared todo list. Part of the [grupa-tri](https://github.com/grupa-tri) Kubernetes platform. Main docs are in [platform-infra](https://github.com/grupa-tri/platform-infra). Contribution workflow is documented in [platform-infra](https://github.com/grupa-tri/platform-infra#how-to-contribute).

Each tenant runs its own backend instance. Crossplane sets `DATABASE_URL` and `CORS_ORIGIN` at deploy time.

## Tech Stack

- Node.js 22
- TypeScript
- Express
- Drizzle ORM
- PostgreSQL
- Zod

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/health` | Health check |
| GET | `/api/todos` | List all todos |
| POST | `/api/todos` | Create todo `{ "title": "..." }` |
| PATCH | `/api/todos/:id` | Update todo `{ "title"?, "completed"? }` |
| DELETE | `/api/todos/:id` | Delete todo |

## Deployed usage

Live tenants are served through the platform ingress.

- https://tenant-a.upondi.com/api
- https://tenant-b.upondi.com/api

Health check at `/health` on the backend service directly, or via the ingress at `/api/todos`.

## Local setup

**1. Start PostgreSQL**

```bash
docker compose -f dockerlocal/docker-compose.yml up -d
```

**2. Configure environment**

```bash
cp .env.example .env
```

**3. Install and seed**

```bash
npm install
npm run db:seed
```

Migrations run automatically on `npm run dev` or `npm start`.

**4. Start dev server**

```bash
npm run dev
```

Server runs at http://localhost:3000.

## Environment variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | required |
| `PORT` | Server port | `3000` |
| `CORS_ORIGIN` | Allowed frontend origin | `http://localhost:5173` |

## Scripts

- `npm run dev` start with hot reload
- `npm run build` compile TypeScript
- `npm run start` run compiled output
- `npm run db:generate` generate migration from schema
- `npm run db:migrate` apply migrations manually
- `npm run db:seed` insert sample todos
- `npm run typecheck` type check without emit

## Container image

Published to GHCR on merge to main.

- `ghcr.io/grupa-tri/app-backend:latest`
- `ghcr.io/grupa-tri/app-backend:VERSION` (from `package.json`)

## CI

Pull requests run typecheck and build. Merges to main publish the container image via GitHub Actions.