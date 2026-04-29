# Changelog

All notable changes to **Worldbuilding Codex** will be documented in this file.

The format is inspired by *Keep a Changelog*, with concise milestone-based entries focused on meaningful project evolution.

---

## [v1.1.0] — Entity Search & Filtering (2026-04-29)

### Added

- Added entity search for names, types, summaries, descriptions, notes, and tags.
- Added entity type filtering for supported lore entity categories.
- Added entity tag filtering based on tags available in the current world.
- Added entity sorting by name, type, and recently updated.
- Added URL-persisted entity browsing controls with `entitySearch`, `entityType`, `entityTag`, and `entitySort`.
- Added no-results guidance when active search/filter controls hide all entities.
- Added a clear action for resetting entity search, filters, and sorting.
- Added screen-reader-only result count updates for entity browsing.
- Added an entity browsing search/filter screenshot to document the v1.1 workflow.

### Changed

- Improved the world detail entity list into a more complete browsing experience for larger fictional worlds.
- Improved entity result feedback so users can see when controls are affecting the visible list.
- Improved reset button copy for clearer intent.
- Improved entity browsing accessibility with labelled controls, helper text, and keyboard-friendly interactions.
- Improved responsive behavior for the entity browsing controls.
- Updated README documentation to reflect v1.1 entity browsing improvements.

### Removed

- Removed the limitation where entity browsing only displayed an unfiltered list.

### Notes

- v1.1 keeps the release focused on entity browsing rather than expanding into timeline or relationship graph work.
- Timeline Explorer remains planned for v1.2.
- Manual local smoke testing passed for search, filters, sorting, no-results states, reset behavior, URL persistence, keyboard usability, responsive layout, screenshot documentation, and console-error checks.

---

## [1.0.0] - Stable Portfolio Release (2026-04-27)

### Added
- Stable v1.0 release milestone for the core Worldbuilding Codex workflow
- `ROADMAP.md` documenting planned post-v1.0 improvements and long-term feature direction
- README roadmap reference for easier navigation to future development plans
- README known limitations section clarifying intentionally deferred features
- Updated README badge/header presentation for the v1.0 stable release
- Refreshed README screenshot set reflecting the final v1.0 UI and accessibility updates
- Accessibility improvements across auth, world, entity, event, and relationship workflows

### Changed
- Promoted Worldbuilding Codex from active pre-release development to a stable portfolio-ready release
- Updated README status language to position the project as stable for its core lore-management workflow
- Split the Worlds Dashboard screenshots into separate create-world and existing-worlds views for clearer presentation
- Improved form accessibility with visible labels across login, register, world, entity, event, and relationship forms
- Improved page and section structure with clearer semantic layout patterns
- Improved relationship explorer markup with shared layout classes and more descriptive relationship actions
- Improved status message semantics for success, error, info, and muted UI feedback

### Fixed
- Removed unused favicon reference
- Confirmed custom route-not-found fallback behavior
- Confirmed route refresh behavior works correctly on deployed Vercel routes
- Confirmed hosted frontend, backend health check, authentication, protected routes, and core CRUD workflows work in production
- Confirmed manual accessibility smoke tests pass for the main user flows

### Notes
- This release represents the first stable public version of Worldbuilding Codex.
- The v1.0 release is focused on stability, presentation, accessibility, and demo readiness rather than new feature expansion.
- Future releases will focus on entity search and filtering, richer timeline browsing, relationship visualization, import/export, public sharing, and dashboard analytics.

---

## [0.4.1] - Live Deployment Stabilization (2026-04-27)

### Added
- Production deployment workflow using Vercel for the frontend, Render for the backend, and Neon PostgreSQL for the database
- Environment template files for local development and production migration workflows
- Production Prisma migration helper flow using a local `.env.production` file

### Changed
- Updated deployment configuration for cross-origin cookie-based authentication between Vercel and Render
- Updated backend startup configuration to use the correct compiled server entry in production
- Improved README deployment guidance for local vs production environment handling

### Fixed
- Resolved hosted backend startup issues caused by an incorrect production start path
- Resolved CORS issues caused by an origin mismatch in production configuration
- Resolved production database connectivity issues by switching from a localhost database URL to Neon
- Resolved missing production schema issues by applying Prisma migrations to the hosted database

---

## [0.4.0] - Live Deployment Setup (2026-04-26)

### Added
- Live deployment setup for the frontend on Vercel and the backend on Render
- Environment variable configuration for local and hosted environments
- Example environment files for the client and server

### Changed
- Updated production cookie behavior for cross-origin authentication between Vercel and Render
- Updated CORS configuration to support hosted frontend/backend communication
- Corrected the backend production startup path to use the compiled server entry generated by the TypeScript build
- Refined deployment-related configuration for a public live demo workflow

### Fixed
- Resolved backend deployment startup issues caused by an incorrect Render start path
- Resolved production authentication configuration issues that would have prevented hosted cookie-based login persistence

---

## [0.3.0] - Portfolio Packaging & UI Polish (2026-04-25)

### Added
- Polished screenshot-ready demo data for the primary showcase world
- README screenshot set covering dashboard, world detail, entity detail, timeline, relationships, and auth
- Cleaner shared CSS structure with smaller style files for tokens, base styles, layout, components, auth, and utilities
- Reusable visual utility classes for repeated layout and card patterns

### Changed
- Refined dark theme presentation with improved color hierarchy, card depth, and stronger contrast
- Improved button styling with clearer primary, secondary, and danger variants
- Added hover, focus, and disabled states for a more polished interactive feel
- Improved form control styling across inputs, textareas, and selects
- Tightened page layout rhythm and section spacing for better readability and screenshots
- Improved auth page layout, helper text hierarchy, and responsive card sizing

### Fixed
- Resolved input overflow issues on login and register pages
- Corrected inconsistent button styling on the worlds dashboard
- Improved placement and grouping of world-level navigation and action buttons

---

## [0.2.0] - Detail Page Refactor & UX Improvements (2026-04-24)

### Added
- Modular `WorldDetailPage` sections for:
  - world summary
  - world editing
  - entity creation
  - entity listing
  - event form
  - timeline display
  - relationship explorer
- Modular `EntityDetailPage` sections for:
  - entity summary
  - entity editing
  - relationship creation
  - relationship display
- Shared `StatusMessage` component for success, error, info, and muted states
- Back navigation improvements for world and entity detail flows
- Smooth scroll-to-edit behavior for world and event editing workflows

### Changed
- Refactored large page components into smaller, easier-to-maintain feature sections
- Improved visual hierarchy and consistency across detail pages
- Standardized destructive action prompts and button usage
- Improved empty, loading, and error states throughout major workflows

### Fixed
- Resolved multiple TypeScript typing issues during the world/entity detail refactors
- Fixed stale or inconsistent route handler typing in several frontend sections
- Corrected form-reset and edit-state behavior on entity detail flows

---

## [0.1.0] - Core Full-Stack Worldbuilding Workflow (2026-04-23)

### Added
- Cookie-based authentication with register, login, logout, and protected routes
- Full CRUD support for worlds
- Full CRUD support for entities
- Typed entity system covering:
  - characters
  - locations
  - factions
  - species
  - religions
  - languages
  - artifacts
  - organizations
  - cultures
  - other
- Relationship system for linking entities within the same world
- Timeline event system with:
  - title
  - date label
  - sort year
  - sort index
  - summary
  - description
- Event participant support with optional role labels
- World-scoped and user-owned data model
- Prisma schema, migrations, and seed infrastructure under `server/prisma/`

### Changed
- Established feature-oriented frontend structure for larger workflows
- Established module-based backend structure for auth, worlds, entities, relationships, and events

### Fixed
- Resolved Prisma schema issues involving model relations, uniqueness requirements, and generated client mismatches
- Fixed route typing issues between Express handlers and parameterized request types
- Corrected event and relationship service typing errors during backend implementation
- Fixed auth persistence and cookie handling issues during frontend/backend integration