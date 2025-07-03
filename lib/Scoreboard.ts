import { Match } from "./Match";
import { v4 as uuidv4 } from "uuid";

export class Scoreboard {
	private matches: Match[] = [];
	private teams: string[] = [];

	private summaryCache: string[] | null = null;
	private invalidateCache() {
		this.summaryCache = null;
	}

	startMatch(homeTeam: string, awayTeam: string) {
		if (this.teams.includes(homeTeam) || this.teams.includes(awayTeam))
			throw new Error("Team already playing");

		if (homeTeam === awayTeam) throw new Error("Team cannot play itself");

		const id = uuidv4();
		const match = new Match({ id, homeTeam, awayTeam });
		this.matches.push(match);
		this.teams.push(homeTeam, awayTeam);
		this.invalidateCache();
		return id;
	}

	updateMatch(id: string, homeScore: number, awayScore: number) {
		const match = this.matches.find((m) => m.id === id);
		if (!match) throw new Error("Match not found");

		if (homeScore < 0 || awayScore < 0)
			throw new Error("Score cannot be negative");

		match.update(homeScore, awayScore);
		this.invalidateCache();
	}

	finishMatch(id: string) {
		const match = this.matches.find((m) => m.id === id);
		if (!match) throw new Error("Match not found");

		this.matches = this.matches.filter((m) => m.id !== id);
		this.teams = this.teams.filter(
			(t) => t !== match.homeTeam && t !== match.awayTeam
		);
		this.invalidateCache();
	}

	getSummary(): string[] {
		if (this.summaryCache) return this.summaryCache;

		this.summaryCache = this.matches
			.map((match, index) => ({
				match,
				index,
				totalScore: match.homeScore + match.awayScore
			}))
			.sort((a, b) => {
				const scoreDiff = b.totalScore - a.totalScore;
				return scoreDiff !== 0 ? scoreDiff : b.index - a.index;
			})
			.map(({ match }) => match.toString());

		return this.summaryCache;
	}
}
