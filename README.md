# bfv-api-js

Unofficial TypeScript and JavaScript client for the Bavarian Football Association (BFV) Widget API. This project is not affiliated with the [BFV](https://www.bfv.de/).

[![npm version](https://img.shields.io/npm/v/bfv-api.svg)](https://www.npmjs.com/package/bfv-api)
[![license](https://img.shields.io/npm/l/bfv-api.svg)](https://github.com/SebastianSiedler/bfv-api-js/blob/main/LICENSE)

## Installation

```bash
# pnpm
pnpm add bfv-api

# npm
npm install bfv-api

# yarn
yarn add bfv-api
```

## Usage

### 1. List Matches for a Team

The `teamPermanentId` can be found in the URL on the official BFV team page:
`https://www.bfv.de/mannschaften/<my-team-name>/<team-permanent-id>`

```ts
import { bfvApi, type Match, type Team } from "bfv-api";

const teamPermanentId = "016PD5QT70000000VV0AG811VTE5EA5R";

const { data } = await bfvApi.listMatches({
  params: { teamPermanentId },
});

console.log(data.team.name);
data.matches.forEach((match: Match) => {
  console.log(`${match.kickoffDate} ${match.kickoffTime}: ${match.homeTeamName} vs ${match.guestTeamName} (${match.result})`);
});
```

### 2. Get League Table / Standings

The `compoundId` represents the competition and can be found in match/team responses or the BFV competition URL:

```ts
import { bfvApi, type TableEntry } from "bfv-api";

const compoundId = "03135AVG8S000008VS5489BTVU7GTVLE-G";

const { data } = await bfvApi.getCompetitionTable({
  params: { compoundId },
});

console.log(`Table for ${data.competitionName}:`);
data.table?.forEach((entry: TableEntry) => {
  console.log(`${entry.position}. ${entry.team?.name} - ${entry.points} pts (${entry.matchesWon}-${entry.matchesDrawn}-${entry.matchesLost})`);
});
```

### 3. Get Competition Info

```ts
const { data } = await bfvApi.getCompetitionInformation({
  params: { compoundId: "03135AVG8S000008VS5489BTVU7GTVLE-G" },
});

console.log(data.competitionBreadcrumb);
// "Meisterschaften | Herren | Kreisliga | Kreis Schweinfurt"
```

### 4. Get Team & Club Information

```ts
// Team info
const teamInfo = await bfvApi.getTeamInformation({
  params: { teamPermanentId: "016PD5QT70000000VV0AG811VTE5EA5R" },
});

// Club info by team ID
const clubInfo = await bfvApi.getClubInformation({
  queries: { teamPermanentId: "016PD5QT70000000VV0AG811VTE5EA5R" },
});

// Club info by club ID
const clubById = await bfvApi.getClubInformationById({
  params: { clubId: "00ES8GNLE0000009VV0AG08LVUPGND5I" },
});
```

### 5. Custom Client Factory

If you need custom Axios/Zodios configuration or request interception:

```ts
import { createApiClient } from "bfv-api";

const customClient = createApiClient("https://widget-prod.bfv.de/api/service/widget/v1", {
  axiosConfig: {
    timeout: 5000,
  },
});
```

## Exported Types

All schemas are backed by Zod and exported as TypeScript types:

- `Match`
- `Team`
- `ClubInformation`
- `TableEntry`
- `Schemas` (Zod schema map)

## Contributing

1. Update the OpenAPI schema in `bfv_schema.yaml` if endpoints change.
2. Run `pnpm run generate` to regenerate the typed Zodios client.
3. Run `pnpm test` to verify against the live BFV API.
4. Run `pnpm changeset` to document the change.
5. Open a Pull Request into `main`. Once merged, the version PR and automated npm release will be handled by GitHub Actions.
