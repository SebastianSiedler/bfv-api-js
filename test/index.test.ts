import { describe, expect, it } from "vitest";
import { bfvApi, createApiClient } from "../src";

const teamPermanentId = "016PD5QT70000000VV0AG811VTE5EA5R";

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

describe("club information", () => {
  it("get club information", async () => {
    const { data } = await bfvApi.getClubInformation({
      queries: { teamPermanentId },
    });

    expect(data?.club).toBeDefined();
    expect(data?.club?.name).toBe("TSC Zeuzleben");
    expect(data?.club?.logoPublic).toBeTypeOf("boolean");
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

describe("client factory", () => {
  it("creates a client instance with createApiClient", () => {
    const customApi = createApiClient(
      "https://widget-prod.bfv.de/api/service/widget/v1",
    );
    expect(customApi).toBeDefined();
    expect(typeof customApi.listMatches).toBe("function");
  });
});
