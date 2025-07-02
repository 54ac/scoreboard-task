type MatchParams = {
	id: string;
	homeTeam: string;
	awayTeam: string;
	homeScore?: number;
	awayScore?: number;
};

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

	update(homeScore: number, awayScore: number) {
		this.homeScore = homeScore;
		this.awayScore = awayScore;
	}

	toString(): string {
		return `${this.homeTeam} ${this.homeScore} - ${this.awayScore} ${this.awayTeam}`;
	}
}
