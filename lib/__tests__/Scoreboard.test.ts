import { describe, it, expect } from "vitest";
import { Scoreboard } from "../Scoreboard";

describe("Scoreboard", () => {
	it("starts a match (score 0-0)", () => {
		const board = new Scoreboard();
		board.startMatch("Poland", "Moldova");
		const summary = board.getSummary();
		expect(summary).toEqual(["Poland 0 - 0 Moldova"]);
	});
});
