import { Match } from "./Match";
import { v4 as uuidv4 } from "uuid";

export class Scoreboard {
	private matches: Match[] = [];

	startMatch(homeTeam: string, awayTeam: string) {
		const id = uuidv4();
		const match = new Match({ id, homeTeam, awayTeam });
		this.matches.push(match);
		return id;
	}

	updateMatch(id: string, homeScore: number, awayScore: number) {
		const match = this.matches.find((m) => m.id === id);
		if (match) match.update(homeScore, awayScore);
	}

	getSummary(): string[] {
		return this.matches.map((m) => m.toString());
	}
}
