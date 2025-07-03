type MatchParams = {
	id: string;
	homeTeam: string;
	awayTeam: string;
	homeScore?: number;
	awayScore?: number;
};

/**
 * Represents a match between two teams.
 * @param id Unique ID of the match.
 * @param homeTeam Name of home team.
 * @param awayTeam Name of away team.
 * @param homeScore Score of home team.
 * @param awayScore Score of away team.
 */
export class Match {
	id: string;
	homeTeam: string;
	awayTeam: string;
	homeScore: number;
	awayScore: number;

	constructor({
		id,
		homeTeam,
		awayTeam,
		homeScore = 0,
		awayScore = 0
	}: MatchParams) {
		this.id = id;
		this.homeTeam = homeTeam;
		this.awayTeam = awayTeam;
		this.homeScore = homeScore;
		this.awayScore = awayScore;
	}

	/**
	 * Updates the score of a match.
	 * @param homeScore Score of home team.
	 * @param awayScore Score of away team.
	 */
	update(homeScore: number, awayScore: number) {
		this.homeScore = homeScore;
		this.awayScore = awayScore;
	}

	/**
	 * Returns a string representation of the match.
	 * @returns Match as a string in the format "HomeTeam HomeScore - AwayScore AwayTeam".
	 */
	toString(): string {
		return `${this.homeTeam} ${this.homeScore} - ${this.awayScore} ${this.awayTeam}`;
	}
}
