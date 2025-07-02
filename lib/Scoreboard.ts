import { Match } from "./Match";

export class Scoreboard {
	private matches: Match[] = [];

	startMatch(homeTeam: string, awayTeam: string) {
		const match = new Match({ homeTeam, awayTeam });
		this.matches.push(match);
	}

	getSummary(): string[] {
		return this.matches.map((m) => m.toString());
	}
}
