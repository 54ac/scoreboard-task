import { describe, it, expect, beforeEach } from "vitest";
import { Match } from "../Match";
import { v4 as uuidv4 } from "uuid";

describe("Match", () => {
	let id: string;

	beforeEach(() => {
		id = uuidv4();
	});

	it("starts a match (score 0-0)", () => {
		const match = new Match({ id, homeTeam: "Poland", awayTeam: "Moldova" });
		expect(match.toString()).toEqual("Poland 0 - 0 Moldova");
	});

	it("updates the score", () => {
		const match = new Match({ id, homeTeam: "Poland", awayTeam: "Moldova" });
		match.update(2, 3);
		expect(match.toString()).toEqual("Poland 2 - 3 Moldova");
	});
});
