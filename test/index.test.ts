import { api } from "../src/client";
import { describe, expect, it } from "vitest";

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
