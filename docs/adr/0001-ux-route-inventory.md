# ADR 0001: UX route inventory and compatibility boundary

- Status: Accepted for implementation planning
- Snapshot: `ac07485cc7569ffa85ea178bcc3e8a17be937f0c`
- Scope: documentation and compatibility tests only

## Context

GRABIT already has working geography, search, listings, profiles, chats,
groups, official groups and administration. The redesign must simplify the
navigation without replacing stable URLs or silently removing capabilities.

The current bottom navigation is `Map · Explore · Chats · Menu`. The target
navigation is `Search · Nearby · Chats · Profile`, using the existing routes
instead of creating parallel screens.

## Current route contract

| Capability | Canonical route | Compatibility route |
|---|---|---|
| Root | `/` permanently redirects to `/app` | — |
| Nearby/map root | `/app` | `/app/` |
| Search | `/app/search` | — |
| Chats | `/app/messages` | `/app/chats` redirects here |
| Profile | `/app/me` | — |
| Listing | `/app/listing/{id}` | `/app/resource/{id}` |
| Stable geography | `/app/map/continent/{id}`, `/country/{id}`, `/city/{id}` | — |
| Legacy geography | — | `/app/{ci}`, `/{ci}/{si}`, `/{ci}/{si}/{zi}` |
| Official groups | `/app/official-groups` | explicit opt-in only |

Legacy geography category routes and listing creation routes remain supported.
They may be hidden from the new shell, but must not disappear without a
separate deprecation decision.

## Current screen responsibilities

### Explore

Explore only sends the user to Search with one of three filters: work,
workers or business. It may be removed from the navigation after Search owns
those entry points.

### Menu

Menu currently owns recent activity, invite sharing, profile and listing
entry points, PWA installation, sound, haptics, theme, language and access to
the administrative center. It may be removed only after these functions have
an explicit destination in Profile or Settings.

### Nearby root

`/app` currently renders the continent directory and platform counters. The
future Nearby screen must keep SSR content and links, provide an honest empty
state, and leave full geography reachable.

## Geography and location state

Stable geography is stored in `geo_continents`, `geo_countries` and
`geo_cities`. The city catalog contains stable IDs, GeoNames IDs, native and
ASCII names, population, timezone and coordinates. Listings have a `city_id`
but no object-level latitude or longitude, so a city coordinate must never be
presented as the exact location of a listing.

Current browser state uses `localStorage` for the last place, recent searches,
last listing and listing draft. Legacy numeric city routes also write the
`rm_last_city` cookie. A later change may migrate the active-tab place to
`sessionStorage`, but must preserve recent places and old URLs.

## Search and SEO gaps

- Search supports all, work, workers and business, with services represented
  by catalog rubrics.
- Listings and people have separate SQLite FTS indexes.
- There is no indexed global geography search endpoint yet.
- Listing pages have canonical metadata; `/app` does not yet have its target
  canonical and description.
- There is no sitemap route in this snapshot.

These are recorded gaps, not behavior to freeze in compatibility tests.

## Decision

1. Keep the existing Search, Chats and Profile routes as the only canonical
   destinations for the new navigation.
2. Preserve root, listing and geography compatibility routes.
3. Keep official-group membership explicit; selecting a place must not join a
   group.
4. Do not remove Explore or Menu until every responsibility has moved.
5. Make each redesign step an independently testable and revertible PR.

## PR sequence

1. Inventory ADR and compatibility tests.
2. Navigation shell: Search, Nearby, Chats, Profile.
3. Current and recent place state.
4. Indexed global geography search.
5. Unified Search and retirement of Explore.
6. SSR Nearby `/app`.
7. Profile consolidation.
8. Brand, i18n and accessibility hardening.

## Non-goals of PR 1

PR 1 does not change templates, routes, database schema, browser storage,
production configuration or deployment state.

## Rollback

Revert the documentation and tests. No database or production rollback is
required.
