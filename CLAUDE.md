# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm start` — run the CRA dev server (requires a populated `.env`; see README for Firebase setup).
- `npm test` — Jest via `react-scripts` with coverage. `npm run test:watch` for interactive mode. Run a single test with `npm test -- --testPathPattern=path/to/file` or `-t "test name"`.
- `npm run build` — production bundle.
- `npm run deploy` / `npm run deploy:functions` — build + Firebase deploy (hosting/rules vs. Cloud Functions). `deploy:prod` variants switch to the prod Firebase project and source `.env.prod`.
- `npm run translate` — run `src/utils/convert-translations.js` against an ExportSheetData JSON dump in the repo root to regenerate `src/lang/*`.
- `npm run analyze` — source-map-explorer on the built bundle.

Cloud Functions live in `functions/` and have their own `package.json` (`cd functions && npm i`).

## Architecture

Front-end is React 16 + Redux (thunk) on top of create-react-app 5, backed by Firebase (Firestore, Auth, Hosting, Functions). There is no custom server — the React client talks to Firestore directly via the SDK, with a small set of Cloud Functions for privileged/bulk operations.

### State shape and flow

Redux store is assembled in `src/store/index.js`: combined reducers from `src/store/reducers/`, plus `react-redux-toastr` and `connected-react-router`. The whole state tree is persisted to `localStorage` on a throttled subscription (`src/store/localStorage.js`), so reducers must stay serializable.

Store is organized by domain, each with a parallel trio:

- `src/store/actions/<domain>.actions.js` — thunks that read selectors, dispatch, and call API modules. `combined.actions.js` composes cross-domain flows.
- `src/store/reducers/<domain>.reducers.js`
- `src/store/selectors/<domain>.selectors.js` — `reselect` selectors built on primitives in `base.selectors.js`. Components should read through selectors, not reach into state directly.

Domains: `entity`, `sector`, `faction`, `layer`, `tag`, `navigation`, `sidebar`, `settings`, `user`.

### Firestore access

`src/store/api/<domain>.js` wraps all Firestore reads/writes. Components and action creators should go through these modules rather than importing `firebase` directly. Cloud Functions in `functions/src/` handle multi-document operations that are awkward or unsafe from the client (e.g. `save-entities.js`, `delete-sector-objects.js`); the client invokes them as callable functions.

### Entity model

A "sector" is a tree of entities (sector → system → world/station/etc.) described in `src/constants/entities.js` and the generator constants (`asteroid-base`, `orbital-ruin`, world-tags, populations, etc.). These constants drive both procedural generation (`src/utils/` generators, using `chance` for seeded randomness) and the edit/print UIs. When adding a new entity type or attribute, expect to touch: the constants file, the generator util, the relevant reducer/selector, the sidebar/printables components, and the intl strings.

### Components

`src/components/` holds feature components; each folder typically has `index.js` (the `connect`ed container) and a sibling presentational file. Shared building blocks live under `src/primitives/` (form, modal, icons, regions, text). Styles are SCSS co-located with components.

### Internationalization

`react-intl` with locale files under `src/lang/`. Source of truth is the Google Sheet referenced in the README; `npm run translate` converts an ExportSheetData dump into the per-locale JSON files. User-visible strings should be added via intl IDs rather than hardcoded.

### Routing

`connected-react-router` with `history` from `src/store/index.js`. Route components are lazy-loaded via `react-loadable` in `src/components/game-routes/` and related entry points.
