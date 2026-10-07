# bfv-api-js

## 1.4.0

### Minor Changes

- 591e0d2: Expand API client with league tables, competition info, and team information:
  - Add `getCompetitionTable` (`/competition/{compoundId}/table`) for full league standings
  - Add `getCompetitionInformation` (`/competition/{compoundId}/info`) for competition details
  - Add `getTeamInformation` (`/team/{teamPermanentId}/info`) for team and club details
  - Add `getClubInformationById` (`/club/{clubId}/info`) for direct club lookup
  - Export new TypeScript type `TableEntry`
  - Update OpenAPI schema metadata and expand documentation with examples

## 1.3.5

### Patch Changes

- 114bd99: Export createApiClient and schema type aliases, modernize TypeScript config, and fix npm publish workflow

## 1.3.4

### Patch Changes

- 09155bf: Update dependencies, add package exports, and migrate tooling to Biome

## 1.3.3

### Patch Changes

- 170e693: update dependencies

## 1.3.2

### Patch Changes

- 3f457da: make match attributes nullable

## 1.3.1

### Patch Changes

- 1d0664e: update dependencies

## 1.3.0

### Minor Changes

- c97fd73: provide types for schemas as export

## 1.2.0

### Minor Changes

- 703439f: match.team no longer partial. All keys required

## 1.1.0

### Minor Changes

- c43e422: add `getClubInformation` Method

## 1.0.0

### Major Changes

- c33a48b: First release version of bfv-api

## 0.0.2

### Patch Changes

- b9e8833: update keywords in package.json
