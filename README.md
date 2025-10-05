# Homepilot Property Manager

Technical interview that implements a fullstack Nx workspace featuring a NestJS API, a React frontend, and shared UI components. 

## Tech Stack

- **Nx** for monorepo orchestration
- **NestJS + TypeORM** (`apps/api`) backed by **SQLite** (TypeORM is a natural Nest fit with strong docs, migrations, Postgres support / SQLite is the easiest ready to go setup)
- **React + Vite** (`apps/web`)
- **Yarn workspaces** for dependency management

## Prerequisites

- **Node.js** 18 (>= 18.0.0 < 19.0.0)
- **Yarn** >= 1.22 (npm usage is disabled in this repo)

Check your versions before moving on:

```bash
node -v
yarn -v
```

## 1. Clone & Install

```bash
git clone https://github.com/valentinllpz/iad-fullstack-technical-test
cd iad-fullstack-technical-test
yarn install
```

## 2. Environment Variables

Default values live in `.env.local`. For local development copy them to `.env`:

```bash
cp .env.local .env
```

For simplicity, both the backend and frontend read from this file.

## 3. Database & Seed Data

The API uses an SQLite file stored at `apps/api/data/db.sqlite` by default.

To reset the schema and load sample landlords & units, run:

```bash
yarn workspace api seed
```

The seed script wipes the database before inserting fixtures. Re-run it any time you want a clean dataset.

## 4. Run the Apps

Start both servers from the workspace root:

```bash
yarn dev
```

- API: http://localhost:8911
- Web: http://localhost:8910 (proxied by Vite, fetching data from the API)

> Tip: `yarn dev` calls `nx run-many --target=dev --all`. To run apps individually you can use `yarn workspace api dev` or `yarn workspace web dev`.

## 5. Testing

### API (NestJS)

- E2E tests: `yarn workspace api test:e2e`

### Web (React)

- Component tests (Vitest): `yarn workspace web test`

Given this is a technical interview exercise, the codebase favors broader end-to-end validation over a comprehensive unit-test suite.


