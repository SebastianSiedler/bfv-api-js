---
"bfv-api": minor
---

Expand API client with league tables, competition info, and team information:
- Add `getCompetitionTable` (`/competition/{compoundId}/table`) for full league standings
- Add `getCompetitionInformation` (`/competition/{compoundId}/info`) for competition details
- Add `getTeamInformation` (`/team/{teamPermanentId}/info`) for team and club details
- Add `getClubInformationById` (`/club/{clubId}/info`) for direct club lookup
- Export new TypeScript type `TableEntry`
- Update OpenAPI schema metadata and expand documentation with examples
