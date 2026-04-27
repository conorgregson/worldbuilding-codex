# Worldbuilding Codex

A full-stack lore management app for building fictional worlds through structured entities, relationships, and timeline events.

![Status](https://img.shields.io/badge/Status-In%20Active%20Development-2563eb?style=for-the-badge)
![Frontend](https://img.shields.io/badge/Frontend-React%20%2B%20TypeScript-0f172a?style=for-the-badge)
![Backend](https://img.shields.io/badge/Backend-Express%20%2B%20TypeScript-0f172a?style=for-the-badge)
![Database](https://img.shields.io/badge/Database-PostgreSQL%20%2B%20Prisma-0f172a?style=for-the-badge)

---

## Live Demo

Try the deployed full-stack app here:

**▶** https://worldbuilding-codex.vercel.app

The live app runs on a split-hosted architecture:

- **Frontend:** Vercel
- **Backend:** Render
- **Database:** Neon PostgreSQL

---

## About

Worldbuilding Codex is a full-stack application designed to help writers, worldbuilders, and lore-heavy creators organize fictional settings in a structured way.

As a world grows, disconnected notes quickly become hard to manage. Characters, factions, locations, artifacts, relationships, and historical events all need to stay consistent with each other. Worldbuilding Codex solves that problem by giving users a central place to manage:

- worlds
- entities
- typed relationships
- timeline events
- event participants

Instead of storing lore in scattered text files or unstructured notes, the app models fictional information as connected data that can be edited, linked, and explored.

---

## Features

### World management
- Create, view, update, and delete multiple fictional worlds
- Store world-level metadata such as title, genre, and description

### Structured entity system
- Create and manage entities such as:
  - characters
  - locations
  - factions
  - species
  - religions
  - languages
  - artifacts
  - organizations
  - cultures
- Edit entity summaries, descriptions, notes, and tags

### Relationship modeling
- Create typed relationships between entities in the same world
- View incoming and outgoing relationships from an entity detail page
- Delete relationships with confirmation safeguards

### Timeline and event tracking
- Create historical events within a world
- Add date labels, sort years, sort indices, summaries, and descriptions
- Attach participating entities to events with optional role labels
- Render events in a structured timeline view

### Authentication and ownership
- Protected login/register flow
- User-scoped data ownership for worlds and related content
- Cookie-based authenticated API requests

### UX and architecture improvements
- Refactored world and entity detail pages into modular sections
- Reusable UI components for cards, buttons, inputs, and status messages
- Clear success, error, loading, and empty states
- Confirm prompts for destructive actions

---

## Screenshots

### Worlds Dashboard
![Worlds Dashboard](docs/screenshots/worlds-dashboard.png)

### World Detail — Aurelith
![World Detail — Aurelith](docs/screenshots/world-detail-aurelith.png)

### Entity Detail — Ilyra Voss
![Entity Detail — Ilyra Voss](docs/screenshots/entity-detail-ilyra-voss.png)

### Timeline — Aurelith
![Timeline — Aurelith](docs/screenshots/timeline-aurelith.png)

### Relationships — Ilyra Voss
![Relationships — Ilyra Voss](docs/screenshots/relationships-ilyra-voss.png)

### Register
![Register](docs/screenshots/auth-register.png)

---

## Tech Stack

### Frontend
- React
- TypeScript
- React Router
- TanStack Query
- Vite

### Backend
- Node.js
- Express
- TypeScript

### Database / ORM
- PostgreSQL
- Prisma

### Validation / Auth
- Zod
- JWT
- cookie-based authentication

---

## Architecture Overview

Worldbuilding Codex is built as a full-stack application with a React frontend, an Express API backend, and a PostgreSQL database accessed through Prisma.

### Frontend
The client is built with React and TypeScript using a feature-oriented structure. Page-level orchestration is separated from section-level UI to keep large views manageable. TanStack Query is used for query/mutation handling and server-state synchronization.

### Backend
The API is built with Express and TypeScript using module-based organization for domains such as:
- auth
- worlds
- entities
- relationships
- events

Validation is handled with Zod, and ownership rules are enforced server-side.

### Data flow
The frontend sends authenticated requests to the API using cookie-based auth. The backend validates input, checks ownership, applies world/entity relationship rules, and persists data through Prisma.

---

## Data Model Overview

### User
Represents an authenticated account that owns one or more worlds.

### World
Top-level container for a fictional setting. A world contains entities, relationships, and timeline events.

### Entity
A structured lore entry inside a world, such as a character, location, faction, artifact, or culture.

### EntityTag
A tag attached to an entity for lightweight categorization and metadata.

### Relationship
A typed directional link between two entities in the same world.

### Event
A historical record inside a world, with optional chronology fields such as date label, sort year, and sort index.

### EventParticipant
A join model that links entities to events, with an optional role label describing how the entity participated.

---

## Project Structure

```bash
client/
  .env.example
  src/
    components/
      ui/
    features/
      world-detail/
      entity-detail/
      worlds/
      entities/
      relationships/
      events/
      auth/
    pages/
    lib/

server/
  .env.example
  .env.production (local helper, untracked)
  prisma/
    migrations/
    schema.prisma
    seed.ts
  src/
    modules/
      auth/
      worlds/
      entities/
      relationships/
      events/
    middleware/
    utils/
    lib/
```

---

## Structure notes
- The frontend uses feature-oriented sections for complex pages like world detail and entity detail.
- The backend uses module-based organization for each domain area.
- Prisma schema, migrations, and seed data live under `server/prisma/`.
- Prisma Client is used by the backend for database access.
- Production deployment uses Vercel for the frontend, Render for the backend, and Neon for PostgreSQL.
- A local `.env.prod` workflow can be used to run production Prisma migrations safely without overwriting the default local development database config.

---

## Getting Started

### 1. Clone the repository

``` bash
git clone https://github.com/conorgregson/worldbuilding-codex
cd worldbuilding-codex
```

### 2. Install dependencies

#### Client

```bash
cd client
npm install
```

#### Server

```bash
cd ../server
npm install
```

### 3. Configure environment variables

#### Create a local development `.env` file in `server/`:

```env
NODE_ENV=development
PORT=4000
DATABASE_URL=postgresql://username:password@localhost:5432/worldbuilding_codex
JWT_SECRET=replace_with_a_local_dev_secret
CLIENT_ORIGIN=http://localhost:5173
```

#### Create a local development `.env` file in `client/`:

```env
VITE_API_URL=http://localhost:4000
```

#### Recommended repo-safe templates:

`server/.env.example`

```env
NODE_ENV=development
PORT=4000
DATABASE_URL=postgresql://username:password@localhost:5432/worldbuilding_codex
JWT_SECRET=replace_with_a_long_random_secret
CLIENT_ORIGIN=http://localhost:5173
```

`client/.env.example`

```env
VITE_API_URL=http://localhost:4000
```

For production migration workflows, an optional local helper file such as `server/.env.prod` can be used to point Prisma commands at the hosted production database. This file should remain untracked.

### 4. Run Prisma migrations

From `server/`:

```bash
npx prisma generate
npx prisma migrate dev
```

### 5. Optional: seed demo data

From `server/`:

```bash
npm run seed
```

Use this only if you want demo or development data inserted into the currently configured database.

### 6. Start the backend

From `server/`:

```bash
npm run dev
```

### 7. Start the frontend

From `client/`:

```bash
npm run dev
```

### 8. Open the app

Visit:

```txt
http://localhost:5173
```

---

## Deployment

Worldbuilding Codex is deployed with a split-hosted architecture:

- **Frontend:** Vercel
- **Backend:** Render
- **Database:** Neon PostgreSQL

### Production environment variables

#### Render
Set the following environment variables in the Render service dashboard:

```env
NODE_ENV=production
DATABASE_URL=your_neon_connection_string
JWT_SECRET=your_production_jwt_secret
CLIENT_ORIGIN=https://worldbuilding-codex.vercel.app
```

#### Vercel

Set the following environment variable in the Vercel project dashboard:

```env
VITE_API_URL=https://worldbuilding-codex.onrender.com
```

### Production database migrations

Run production Prisma migrations against the hosted Neon database with a dedicated production env file.

Example helper script:

```bash
npm run prisma:migrate:prod
```

This uses `server/.env.prod` locally to apply migrations to the production database without changing the normal local development database configuration.

### Notes

- Local development uses a local PostgreSQL database.
- Production uses Neon PostgreSQL.
- The backend uses secure cross-origin cookie settings in production for authentication between Vercel and Render.
- Vercel client-side routing requires a `vercel.json` SPA rewrite so refreshes on routes like `/worlds` and `/login` resolve correctly.

---

## Current Status

Worldbuilding Codex is currently feature-complete for its core lore workflow.

Implemented:

- authentication
- worlds CRUD
- entities CRUD
- relationship creation, viewing, and deletion
- timeline event creation, viewing, editing, and deletion
- event participants
- modular refactored detail pages
- protected user-owned data flow

Current focus:

- UI polish
- portfolio presentation
- demo readiness
- README and screenshot packaging

---

## Roadmap / Future Improvements

Planned improvements include:

- entity filtering and search
- richer relationship taxonomy / presets
- dedicated timeline page
- graph/network view for entity relationships
- improved accessibility pass
- import/export support
- public read-only sharing
- world-level dashboard analytics
- more advanced lore browsing and navigation

---

## Author

Built and maintained **Conor Gregson**
- [**GitHub**](https://github.com/conorgregson)
- [**LinkedIn**](https://www.linkedin.com/in/conorgregson)

---

## License

This project is licensed under:

**Creative Commons Attribution–NonCommercial 4.0 International (CC BY-NC 4.0)**

You may view, use, and modify the source code for non-commercial purposes only.
Commercial use requires prior written permission.

Full license text:
https://creativecommons.org/licenses/by-nc/4.0/legalcode

See the [LICENSE](./LICENSE.md) file for details