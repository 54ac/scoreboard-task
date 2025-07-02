export class Match {
	constructor(
		public homeTeam: string,
		public awayTeam: string,
		public homeScore: number = 0,
		public awayScore: number = 0
	) {}

	toString(): string {
		return `${this.homeTeam} ${this.homeScore} - ${this.awayScore} ${this.awayTeam}`;
	}
}
