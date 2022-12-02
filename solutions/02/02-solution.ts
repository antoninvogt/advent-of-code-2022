import * as inputHelper from "../../helpers/input";

type OwnHand = "X" | "Y" | "Z";
type OpponentHand = "A" | "B" | "C";
type HandsMatch = [ opponentHand: OpponentHand, ownHand: OwnHand ];

const correspondingOpponentHand: Record<OwnHand, OpponentHand> = {
	X: "A",
	Y: "B",
	Z: "C"
};

const ownHandDefeatedBy: Record<OwnHand, OpponentHand> = {
	X: "B",
	Y: "C",
	Z: "A"
};

const handScores: Record<OwnHand, number> = {
	X: 1,
	Y: 2,
	Z: 3
};

function parseMatches(inputLines: string[]): HandsMatch[] {
	return inputLines.map((line) => line.split(" ") as HandsMatch);
}

function calculateIndividualScore(handsMatch: HandsMatch): number {
	const [ opponentHand, ownHand ] = handsMatch;
	const handScore = handScores[ownHand];
	let winningScore;

	if (opponentHand === correspondingOpponentHand[ownHand]) {
		// draw
		winningScore = 3;
	} else if (opponentHand === ownHandDefeatedBy[ownHand]) {
		// defeat
		winningScore = 0;
	} else {
		// win
		winningScore = 6;
	}

	return winningScore + handScore;
}

function calculateTotalScore(allMatches: HandsMatch[]): number {
	return allMatches
		.map(calculateIndividualScore)
		.reduce((totalScore, nextScore) => totalScore + nextScore, 0);
}

async function solve(): Promise<string[]> {
	const puzzleInput = await inputHelper.readPuzzleInput(__dirname, "./02-input.txt");

	const parsedMatches = parseMatches(puzzleInput);
	const totalScore = calculateTotalScore(parsedMatches);

	return [
		String(totalScore)
	];
}

export {
	HandsMatch,
	parseMatches,
	calculateIndividualScore,
	calculateTotalScore,
	solve
}
