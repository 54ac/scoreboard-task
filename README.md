# Coding exercise: scoreboard

A simple TypeScript library for managing football matches and their scores.

---

## Features

- Start new matches between teams (with unique IDs)
- Update scores for matches in progress
- Finish matches
- Get a summary of matches, ordered by total score and recency
- Error handling for invalid operations

---

## Installation

Clone the repository and install dependencies:

```sh
npm install
```

---

## Usage

### Starting match

```typescript
const board = new Scoreboard();
const matchId = board.startMatch("Poland", "Moldova");
```

### Updating match

```typescript
board.updateMatch(matchId, 2, 3);
```

### Finishing match

```typescript
board.finishMatch(matchId);
```

### Getting summary

```typescript
const summary = board.getSummary();
console.log(summary); // [ 'Poland 2 - 3 Moldova', ... ]
```

---

## API documentation

### `Scoreboard` class

Manages Match class instances and their state.

#### `startMatch(homeTeam: string, awayTeam: string): string`

Starts a new match between two teams and returns its unique ID.

#### `updateMatch(id: string, homeScore: number, awayScore: number): void`

Updates the score of a match.

#### `finishMatch(id: string): void`

Finishes a match and removes it from the scoreboard.

#### `getSummary(): string[]`

Returns a list of matches in progress, ordered by total score (descending), then by most recently started.

### `Match` class

Represents a match between two teams.

##### `update(homeScore: number, awayScore: number): void`

Updates the score of the match.

##### `toString(): string`

Returns a string representation of the match in the format: `"HomeTeam HomeScore - AwayScore AwayTeam"`

---

## Testing

To run the test suite:

```sh
npm run test
```

---

## Building

To build the library to the `dist` directory:

```sh
npm run build
```

---

## Usage example

```typescript
const board = new Scoreboard();
const id = board.startMatch("Poland", "Moldova");
board.updateMatch(id, 2, 3);
console.log(board.getSummary()); // [ 'Poland 2 - 3 Moldova' ]
board.finishMatch(id);
console.log(board.getSummary()); // []
```
