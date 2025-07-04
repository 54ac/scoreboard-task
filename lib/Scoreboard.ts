import { Match } from "./Match";
import { v4 as uuidv4 } from "uuid";

/**
 * Manages Match class instances and their state.
 */
export class Scoreboard {
	private matches: Match[] = [];
	private teams: string[] = [];

	private summaryCache: string[] | null = null;
	private invalidateCache() {
		this.summaryCache = null;
	}

	/**
	 * Starts a new match between two teams.
	 * @param homeTeam Name of home team.
	 * @param awayTeam Name of away team.
	 * @returns Unique ID of the started match.
	 * @throws If either team name is empty.
	 * @throws If either team is already playing.
	 * @throws If the teams are the same.
	 */
	startMatch(homeTeam: string, awayTeam: string) {
		const home = homeTeam.trim();
		const away = awayTeam.trim();

		if (!home || !away) throw new Error("Team name cannot be empty");
		if (this.teams.includes(home) || this.teams.includes(away))
			throw new Error("Team already playing");
		if (home === away) throw new Error("Team cannot play itself");

		const id = uuidv4();
		const match = new Match({
			id,
			homeTeam: home,
			awayTeam: away
		});
		this.matches.push(match);
		this.teams.push(home, away);
		this.invalidateCache();
		return id;
	}

	/**
	 * Updates the score of a match.
	 * @param id ID of match.
	 * @param homeScore Score of home team.
	 * @param awayScore Score of away team.
	 * @throws If the match does not exist.
	 * @throws If the score is negative.
	 */
	updateMatch(id: string, homeScore: number, awayScore: number) {
		const match = this.matches.find((m) => m.id === id);

		if (!match) throw new Error("Match not found");
		if (homeScore < 0 || awayScore < 0)
			throw new Error("Score cannot be negative");

		match.update(homeScore, awayScore);
		this.invalidateCache();
	}

	/**
	 * Finishes a match.
	 * @param id ID of match.
	 * @throws If the match does not exist.
	 */
	finishMatch(id: string) {
		const match = this.matches.find((m) => m.id === id);
		if (!match) throw new Error("Match not found");

		this.matches = this.matches.filter((m) => m.id !== id);
		this.teams = this.teams.filter(
			(t) => t !== match.homeTeam && t !== match.awayTeam
		);
		this.invalidateCache();
	}

	/**
	 * Returns a list of matches ordered by total score, then by most recently started.
	 * @returns List of matches.
	 */
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
