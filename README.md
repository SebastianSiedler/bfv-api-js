# bfv-api-js

This is an unofficial JavaScript/Typescript client for the BFV API. This project is not affiliated with the [BFV](https://www.bfv.de/)!

## Installation

```
pnpm add bfv-api
```

## Usage

The `teamPermanentId` can be found in the URL on the official web page of your team
(`https://www.bfv.de/mannschaften/<my-team-name>/<team-permanent-id>`)

```ts
import { bfvApi } from "bfv-api";

const teamPermanentId = "016PD5QT70000000VV0AG811VTE5EA5R";
const { data } = await bfvApi.listMatches({ params: { teamPermanentId } });
```

## Contributing

Update the [OpenAPI Schema](./bfv_schema.yaml) if the schema doesn't match anymore.
Run `pnpm changeset` to create a new Changeset entry and automatically publish a new package on npm after the pull request was approved.
