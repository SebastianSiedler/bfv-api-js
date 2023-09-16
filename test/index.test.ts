import exp from "constants";
import { api } from "../src/client";
import { describe, expect, it } from "vitest";
import z from "zod";

const teamPermanentId = "016PD5QT70000000VV0AG811VTE5EA5R";

describe("get matches", () => {
  it("get matches", async () => {
    const res = await api.listMatches({ params: { teamPermanentId } });

    const {
      data: { matches },
    } = res;

    expect(matches).toBeDefined();

    expect(matches.length).toBeGreaterThan(0);
  });
});

describe("club information", () => {
  it("get club information", async () => {
    const { data } = await api.getClubInformation({
      queries: { teamPermanentId },
    });

    expect(data?.club).toBeDefined();
    expect(data?.club?.name).toBe("TSC Zeuzleben");
    expect(data?.club?.logoPublic).toBeTypeOf("boolean");
  });

  it("get club information with wrong teamPermanentId", async () => {
    const getClubinfo = async () =>
      await api.getClubInformation({
        queries: { teamPermanentId: "aaaabaaaacaaaabaaaacaaaabaaaac12" },
      });

    expect(getClubinfo).rejects.toThrowError("Expected object, received null");
  });

  it("get club information with wrong length teamPermanentId", async () => {
    const getClubinfo = async () =>
      await api.getClubInformation({
        queries: { teamPermanentId: "wrongLength" },
      });

    expect(getClubinfo).rejects.toThrowError("Invalid Query parameter");
  });
});
