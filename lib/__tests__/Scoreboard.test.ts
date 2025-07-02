import { describe, it, expect, beforeEach } from "vitest";
import { Scoreboard } from "../Scoreboard";

describe("Scoreboard", () => {
	let board: Scoreboard;

	beforeEach(() => {
		board = new Scoreboard();
	});

	it("starts a match (score 0-0)", () => {
		board.startMatch("Poland", "Moldova");
		const summary = board.getSummary();
		expect(summary).toEqual(["Poland 0 - 0 Moldova"]);
	});

	it("updates the score", () => {
		board.startMatch("Poland", "Moldova");
		board.updateMatch("Poland", "Moldova", 2, 3);
		const summary = board.getSummary();
		expect(summary).toEqual(["Poland 2 - 3 Moldova"]);
	});
});
