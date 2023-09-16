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
const ClubInformation = z
  .object({
    id: z.string(),
    name: z.string(),
    logoUrl: z.string(),
    logoPublic: z.boolean(),
  })
  .passthrough();

export const schemas = {
  Team,
  Match,
  ClubInformation,
};

const endpoints = makeApi([
  {
    method: "get",
    path: "/club/info",
    alias: "getClubInformation",
    requestFormat: "json",
    parameters: [
      {
        name: "teamPermanentId",
        type: "Query",
        schema: z.string().min(32).max(32),
      },
    ],
    response: z
      .object({
        data: z.object({ club: ClubInformation }).partial().passthrough(),
      })
      .partial()
      .passthrough(),
  },
  {
    method: "get",
    path: "/team/:teamPermanentId/matches",
    alias: "listMatches",
    requestFormat: "json",
    parameters: [
      {
        name: "teamPermanentId",
        type: "Path",
        schema: z.string().min(32).max(32),
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
