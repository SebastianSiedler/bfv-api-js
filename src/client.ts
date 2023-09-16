import { makeApi, Zodios, type ZodiosOptions } from "@zodios/core";
import { z } from "zod";

const Team = z
  .object({
    permanentId: z.string(),
    name: z.string(),
    typeName: z.string(),
    seasonId: z.string(),
    clubId: z.string(),
    clubName: z.string(),
    compoundId: z.string(),
    competitionName: z.string(),
    competitionBreadcrumb: z.string(),
  })
  .partial()
  .passthrough();
const Match = z
  .object({
    matchId: z.string(),
    compoundId: z.string(),
    competitionName: z.string(),
    competitionType: z.string(),
    teamType: z.string(),
    kickoffDate: z.string(),
    kickoffTime: z.string(),
    homeTeamName: z.string(),
    homeTeamPermanentId: z.string(),
    homeClubId: z.string(),
    homeLogoPrivate: z.boolean(),
    guestTeamName: z.string(),
    guestTeamPermanentId: z.string(),
    guestClubId: z.string(),
    guestLogoPrivate: z.boolean(),
    result: z.string(),
    tickerMatchId: z.string().nullable(),
    prePublished: z.boolean(),
  })
  .passthrough();

export const schemas = {
  Team,
  Match,
};

const endpoints = makeApi([
  {
    method: "get",
    path: "/team/:teamPermanentId/matches",
    alias: "listMatches",
    requestFormat: "json",
    parameters: [
      {
        name: "teamPermanentId",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z
      .object({
        state: z.number(),
        message: z.unknown().nullable(),
        data: z.object({ team: Team, matches: z.array(Match) }).passthrough(),
      })
      .passthrough(),
  },
]);

export const api = new Zodios(
  "https://widget-prod.bfv.de/api/service/widget/v1",
  endpoints
);

export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
  return new Zodios(baseUrl, endpoints, options);
}
