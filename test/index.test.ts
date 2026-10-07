import { describe, expect, it } from "vitest";
import { bfvApi, createApiClient } from "../src";

const teamPermanentId = "016PD5QT70000000VV0AG811VTE5EA5R";
const clubId = "00ES8GNLE0000009VV0AG08LVUPGND5I";
const compoundId = "03135AVG8S000008VS5489BTVU7GTVLE-G";

describe("get matches", () => {
  it("get matches", async () => {
    const res = await bfvApi.listMatches({ params: { teamPermanentId } });

    const {
      data: { matches },
    } = res;

    expect(matches).toBeDefined();
    expect(matches.length).toBeGreaterThan(0);
  });
});

describe("team information", () => {
  it("get team information", async () => {
    const res = await bfvApi.getTeamInformation({
      params: { teamPermanentId },
    });

    expect(res.data?.team).toBeDefined();
    expect(res.data?.team?.name).toBe("TSC Zeuzleben");
    expect(res.data?.club?.id).toBe(clubId);
  });
});

describe("club information", () => {
  it("get club information by query param", async () => {
    const { data } = await bfvApi.getClubInformation({
      queries: { teamPermanentId },
    });

    expect(data?.club).toBeDefined();
    expect(data?.club?.name).toBe("TSC Zeuzleben");
    expect(data?.club?.logoPublic).toBeTypeOf("boolean");
    expect(data?.number).toBeDefined();
  });

  it("get club information by clubId path param", async () => {
    const { data } = await bfvApi.getClubInformationById({
      params: { clubId },
    });

    expect(data?.club).toBeDefined();
    expect(data?.club?.name).toBe("TSC Zeuzleben");
    expect(data?.club?.id).toBe(clubId);
  });

  it("get club information with wrong teamPermanentId", async () => {
    const getClubinfo = () =>
      bfvApi.getClubInformation({
        queries: { teamPermanentId: "aaaabaaaacaaaabaaaacaaaabaaaac12" },
      });

    await expect(getClubinfo()).rejects.toThrow();
  });

  it("get club information with wrong length teamPermanentId", async () => {
    const getClubinfo = () =>
      bfvApi.getClubInformation({
        queries: { teamPermanentId: "wrongLength" },
      });

    await expect(getClubinfo()).rejects.toThrow();
  });
});

describe("competition", () => {
  it("get competition table", async () => {
    const res = await bfvApi.getCompetitionTable({
      params: { compoundId },
    });

    expect(res.data?.compoundId).toBe(compoundId);
    expect(res.data?.table).toBeDefined();
    expect(res.data?.table?.length).toBeGreaterThan(0);
    const first = res.data?.table?.[0];
    expect(first?.position).toBe(1);
    expect(first?.points).toBeTypeOf("number");
    expect(first?.team?.name).toBeDefined();
  });

  it("get competition information", async () => {
    const res = await bfvApi.getCompetitionInformation({
      params: { compoundId },
    });

    expect(res.data?.compoundId).toBe(compoundId);
    expect(res.data?.competitionName).toBeDefined();
    expect(res.data?.season?.name).toBeDefined();
    expect(res.data?.leagueLevel?.name).toBeDefined();
  });
});

describe("client factory", () => {
  it("creates a client instance with createApiClient", () => {
    const customApi = createApiClient(
      "https://widget-prod.bfv.de/api/service/widget/v1",
    );
    expect(customApi).toBeDefined();
    expect(typeof customApi.listMatches).toBe("function");
    expect(typeof customApi.getCompetitionTable).toBe("function");
  });
});
