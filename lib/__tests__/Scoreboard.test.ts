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
		const match = board.startMatch("Poland", "Moldova");
		board.updateMatch(match, 2, 3);
		const summary = board.getSummary();
		expect(summary).toEqual(["Poland 2 - 3 Moldova"]);
	});

	it("finishes the match", () => {
		const match = board.startMatch("Poland", "Moldova");
		board.finishMatch(match);
		const summary = board.getSummary();
		expect(summary).toEqual([]);
	});
});
