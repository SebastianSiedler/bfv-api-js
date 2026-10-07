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
  .passthrough();
const Match = z
  .object({
    matchId: z.string(),
    compoundId: z.string(),
    competitionName: z.string(),
    competitionType: z.string(),
    teamType: z.string(),
    kickoffDate: z.string().nullable(),
    kickoffTime: z.string().nullable(),
    homeTeamName: z.string(),
    homeTeamPermanentId: z.string(),
    homeClubId: z.string().nullable(),
    homeLogoPrivate: z.boolean(),
    guestTeamName: z.string(),
    guestTeamPermanentId: z.string(),
    guestClubId: z.string().nullable(),
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
const TableEntry = z
  .object({
    position: z.number(),
    matches: z.number(),
    matchesWon: z.number(),
    matchesDrawn: z.number(),
    matchesLost: z.number(),
    goalsDiff: z.number(),
    points: z.number(),
    trend: z.number(),
    live: z.boolean(),
    team: z
      .object({ permanentId: z.string(), name: z.string() })
      .partial()
      .passthrough(),
  })
  .partial()
  .passthrough();

export const schemas = {
  Team,
  Match,
  ClubInformation,
  TableEntry,
};

const endpoints = makeApi([
  {
    method: "get",
    path: "/club/:clubId/info",
    alias: "getClubInformationById",
    requestFormat: "json",
    parameters: [
      {
        name: "clubId",
        type: "Path",
        schema: z.string().min(32).max(32),
      },
    ],
    response: z
      .object({
        state: z.number(),
        message: z.unknown().nullable(),
        data: z
          .object({ club: ClubInformation, number: z.string() })
          .partial()
          .passthrough(),
      })
      .partial()
      .passthrough(),
  },
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
        state: z.number(),
        message: z.unknown().nullable(),
        data: z
          .object({ club: ClubInformation, number: z.string() })
          .partial()
          .passthrough(),
      })
      .partial()
      .passthrough(),
  },
  {
    method: "get",
    path: "/competition/:compoundId/info",
    alias: "getCompetitionInformation",
    requestFormat: "json",
    parameters: [
      {
        name: "compoundId",
        type: "Path",
        schema: z.string().min(30).max(40),
      },
    ],
    response: z
      .object({
        state: z.number(),
        message: z.unknown().nullable(),
        data: z
          .object({
            compoundId: z.string(),
            competitionName: z.string(),
            competitionNumber: z.string(),
            competitionBreadcrumb: z.string(),
            adCode: z.string(),
            association: z
              .object({ id: z.string(), name: z.string() })
              .partial()
              .passthrough(),
            season: z
              .object({ id: z.string(), name: z.string() })
              .partial()
              .passthrough(),
            competitionType: z
              .object({ id: z.number(), name: z.string() })
              .partial()
              .passthrough(),
            teamType: z
              .object({ id: z.number(), name: z.string() })
              .partial()
              .passthrough(),
            leagueLevel: z
              .object({ id: z.number(), name: z.string() })
              .partial()
              .passthrough(),
            playingArea: z
              .object({ id: z.string(), name: z.string() })
              .partial()
              .passthrough(),
          })
          .partial()
          .passthrough(),
      })
      .partial()
      .passthrough(),
  },
  {
    method: "get",
    path: "/competition/:compoundId/table",
    alias: "getCompetitionTable",
    requestFormat: "json",
    parameters: [
      {
        name: "compoundId",
        type: "Path",
        schema: z.string().min(30).max(40),
      },
    ],
    response: z
      .object({
        state: z.number(),
        message: z.unknown().nullable(),
        data: z
          .object({
            compoundId: z.string(),
            competitionName: z.string(),
            comment: z.string().nullable(),
            configuration: z
              .object({
                promotionTeamCount: z.number(),
                promotionPlayoffTeamCount: z.number(),
                relegationPlayoffTeamCount: z.number(),
                relegationTeamCount: z.number(),
              })
              .partial()
              .passthrough(),
            table: z.array(TableEntry),
          })
          .partial()
          .passthrough(),
      })
      .partial()
      .passthrough(),
  },
  {
    method: "get",
    path: "/team/:teamPermanentId/info",
    alias: "getTeamInformation",
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
        data: z
          .object({
            team: z
              .object({ permanentId: z.string(), name: z.string() })
              .partial()
              .passthrough(),
            teamType: z
              .object({ id: z.number(), name: z.string() })
              .partial()
              .passthrough(),
            club: ClubInformation,
          })
          .partial()
          .passthrough(),
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
