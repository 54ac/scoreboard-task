type MatchParams = {
	homeTeam: string;
	awayTeam: string;
	homeScore?: number;
	awayScore?: number;
};

export class Match {
	homeTeam: string;
	awayTeam: string;
	homeScore?: number;
	awayScore?: number;

	constructor({
		homeTeam,
		awayTeam,
		homeScore = 0,
		awayScore = 0
	}: MatchParams) {
		this.homeTeam = homeTeam;
		this.awayTeam = awayTeam;
		this.homeScore = homeScore;
		this.awayScore = awayScore;
	}

	toString(): string {
		return `${this.homeTeam} ${this.homeScore} - ${this.awayScore} ${this.awayTeam}`;
	}
}
