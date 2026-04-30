<h1 align="center">Worldbuilding Codex</h1>

<p align="center">
  A full-stack lore management app for building fictional worlds through structured entities, relationships, and timeline events.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Status-v1.2%20Released-22c55e?style=for-the-badge" alt="Status: v1.2 Released" />
  <img src="https://img.shields.io/badge/Frontend-React%20%2B%20TypeScript-0f172a?style=for-the-badge&logo=react&logoColor=61dafb" alt="Frontend: React + TypeScript" />
  <img src="https://img.shields.io/badge/Backend-Express%20%2B%20TypeScript-0f172a?style=for-the-badge&logo=express&logoColor=ffffff" alt="Backend: Express + TypeScript" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Database-PostgreSQL%20%2B%20Prisma-0f172a?style=for-the-badge&logo=postgresql&logoColor=60a5fa" alt="Database: PostgreSQL + Prisma" />
  <img src="https://img.shields.io/badge/Deploy-Vercel%20%2B%20Render%20%2B%20Neon-0f172a?style=for-the-badge&logo=vercel&logoColor=ffffff" alt="Deploy: Vercel + Render + Neon" />
  <img src="https://img.shields.io/badge/Version-v1.2.0-2563eb?style=for-the-badge" alt="Version: v1.2.0" />
</p>

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
- Search entities by name, type, summary, description, notes, and tags
- Filter entities by type and tag
- Sort entities alphabetically, by type, or by recently updated
- Preserve entity browsing controls through URL query parameters
- Clear search/filter/sort controls with no-results guidance

### Relationship modeling
- Create typed relationships between entities in the same world
- View incoming and outgoing relationships from an entity detail page
- Delete relationships with confirmation safeguards

### Timeline Explorer and event tracking
- Create historical events within a world
- Add date labels, sort years, sort indices, summaries, and descriptions
- Attach participating entities to events with optional role labels
- Open a dedicated Timeline Explorer page for each world
- Browse events in chronological order by sort year, sort index, date label, and creation fallback
- Search timeline events by title, summary, description, date fields, participant names, participant types, and role labels
- Filter timeline events by date/sort status and participant status
- Preserve timeline browsing controls through URL query parameters
- Reset timeline search/filter controls with clear no-results guidance
- View polished participant chips with entity names, entity types, and role labels

### Authentication and ownership
- Protected login/register flow
- User-scoped data ownership for worlds and related content
- Cookie-based authenticated API requests

### UX and architecture improvements
- Refactored world and entity detail pages into modular sections
- Reusable UI components for cards, buttons, inputs, and status messages
- Clear success, error, loading, empty, and filtered no-results states
- Confirm prompts for destructive actions
- Accessible entity browsing controls with keyboard-friendly search, filters, sorting, and reset behavior
- Accessible timeline browsing controls with labelled search, filters, reset behavior, focus states, and live result count text
- URL-persisted entity and timeline browsing controls
- Responsive entity and timeline browsing layouts for desktop, tablet, and mobile screens

---

### Worlds Dashboard — Create World
![Worlds Dashboard — Create World](docs/screenshots/worlds-dashboard-create.png)

### Worlds Dashboard — Existing Worlds
![Worlds Dashboard — Existing Worlds](docs/screenshots/worlds-dashboard-list.png)

### World Detail — Aurelith
![World Detail — Aurelith](docs/screenshots/world-detail-aurelith.png)

### Entity Browsing — Search & Filters
![Entity Browsing — Search & Filters](docs/screenshots/entity-browsing-search-filters.png)

### Entity Detail — Ilyra Voss
![Entity Detail — Ilyra Voss](docs/screenshots/entity-detail-ilyra-voss.png)

### Timeline Explorer — Aurelith
![Timeline Explorer — Aurelith](docs/screenshots/timeline-explorer-aurelith.png)

### Relationships — Aurelith
![Relationships — Aurelith](docs/screenshots/relationships-ilyra-voss.png)

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
  .env.prod (local helper, untracked)
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

Worldbuilding Codex is currently in its v1.2 release. The core lore-management workflow is stable, entity browsing supports search/filter/sort controls, and timeline events now have a dedicated Timeline Explorer for focused chronological browsing.

Implemented:

- authentication
- worlds CRUD
- entities CRUD
- entity search by name, type, summary, description, notes, and tags
- entity filtering by type and tag
- entity sorting alphabetically, by type, and by recently updated
- URL-persisted entity browsing controls
- entity no-results and reset states
- relationship creation, viewing, and deletion
- timeline event creation, viewing, editing, and deletion
- dedicated world Timeline Explorer route
- chronological timeline event browsing
- timeline search by title, summary, description, date fields, participant names, participant types, and role labels
- timeline filtering by date/sort status and participant status
- URL-persisted timeline browsing controls
- timeline empty and filtered no-results states
- polished timeline participant display with entity type chips and role labels
- event participants
- modular refactored detail pages
- protected user-owned data flow
- accessibility and responsive polish for entity and timeline browsing

Current focus:

- v1.3 Relationship Graph planning
- continued portfolio polish

---

## Known Limitations

Worldbuilding Codex is stable for its core v1.2 workflow, but several areas are intentionally scoped for future releases.

- Entity browsing supports search, filtering, sorting, URL query state, and no-results guidance, but advanced saved views and fuzzy search are not yet implemented.
- Timeline browsing now has a dedicated Timeline Explorer with search, filters, participant display, URL query state, and no-results guidance, but advanced fictional calendar systems, eras, and drag-and-drop ordering are not yet implemented.
- The world detail page still includes the editable timeline section while the dedicated Timeline Explorer serves as the focused browsing view. A future polish pass may turn the world detail timeline into a shorter preview.
- Relationship data is currently shown in list/detail form. A visual graph view is planned for exploring connected entities more naturally.
- Import/export support is not yet available, so worlds cannot currently be backed up or transferred through the UI.
- Public read-only sharing is not yet implemented, so worlds are private to each authenticated user.
- Dashboard analytics are not yet available for world-level summaries such as entity counts, relationship density, or timeline activity.
- Collaboration features are not currently supported.

---

## Roadmap / Future Improvements

Worldbuilding Codex is currently stable for its core v1.2 lore-management workflow. Future development will focus on relationship visualization, data ownership, public sharing, and deeper worldbuilding tools.

See the full project roadmap here:

**[View the Roadmap](./ROADMAP.md)**

Planned improvements include:

- graph/network view for entity relationships
- richer relationship taxonomy / presets
- import/export support
- public read-only sharing
- world-level dashboard analytics
- advanced saved entity or timeline views
- fuzzy search
- fictional calendar systems, eras, and advanced timeline tools
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