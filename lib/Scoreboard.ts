import { Match } from "./Match";

export class Scoreboard {
	private matches: Match[] = [];

	startMatch(home: string, away: string) {
		const match = new Match(home, away);
		this.matches.push(match);
	}

	getSummary(): string[] {
		return this.matches.map((m) => m.toString());
	}
}
