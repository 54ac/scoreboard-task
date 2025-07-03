import { Match } from "./Match";
import { v4 as uuidv4 } from "uuid";

export class Scoreboard {
	private matches: Match[] = [];
	private teams: string[] = [];

	startMatch(homeTeam: string, awayTeam: string) {
		if (this.teams.includes(homeTeam) || this.teams.includes(awayTeam))
			throw new Error("Team already playing");

		if (homeTeam === awayTeam) throw new Error("Team cannot play itself");

		const id = uuidv4();
		const match = new Match({ id, homeTeam, awayTeam });
		this.matches.push(match);
		this.teams.push(homeTeam, awayTeam);
		return id;
	}

	updateMatch(id: string, homeScore: number, awayScore: number) {
		const match = this.matches.find((m) => m.id === id);
		if (!match) throw new Error("Match not found");

		if (homeScore < 0 || awayScore < 0)
			throw new Error("Score cannot be negative");

		match.update(homeScore, awayScore);
	}

	finishMatch(id: string) {
		const match = this.matches.find((m) => m.id === id);
		if (!match) throw new Error("Match not found");

		this.matches = this.matches.filter((m) => m.id !== id);
		this.teams = this.teams.filter(
			(t) => t !== match.homeTeam && t !== match.awayTeam
		);
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
