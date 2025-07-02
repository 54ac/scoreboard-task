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

	it("sorts the summary accordingly", () => {
		const match1 = board.startMatch("Poland", "Moldova");
		board.updateMatch(match1, 2, 3);
		const match2 = board.startMatch("England", "San Marino");
		board.updateMatch(match2, 2, 3);
		const match3 = board.startMatch("Germany", "Brazil");
		board.updateMatch(match3, 7, 1);
		const summary = board.getSummary();
		expect(summary).toEqual([
			"Germany 7 - 1 Brazil",
			"England 2 - 3 San Marino",
			"Poland 2 - 3 Moldova"
		]);
	});
});
