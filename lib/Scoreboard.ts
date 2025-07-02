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

	finishMatch(id: string) {
		this.matches = this.matches.filter((m) => m.id !== id);
	}

	getSummary(): string[] {
		const summary = this.matches
			.map((match, index) => ({ match, index }))
			.sort((a, b) => {
				const scoreDiff =
					b.match.homeScore +
					b.match.awayScore -
					(a.match.homeScore + a.match.awayScore);

				if (scoreDiff !== 0) return scoreDiff;

				return b.index - a.index;
			})
			.map(({ match }) => match.toString());

		return summary;
	}
}
