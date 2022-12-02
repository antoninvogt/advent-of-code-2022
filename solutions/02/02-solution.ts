import * as inputHelper from "../../helpers/input";

type Shape = "A" | "B" | "C";
type OutcomeInstruction = "X" | "Y" | "Z";
type MatchInstruction = [ opponentShape: Shape, outcomeInstruction: OutcomeInstruction ];
type ShapeMatch = [ opponentHand: Shape, ownHand: Shape ];

const shapeDefeatedBy: Record<Shape, Shape> = {
	A: "C",
	B: "A",
	C: "B"
};

const shapeDefeating: Record<Shape, Shape> = {
	A: "B",
	B: "C",
	C: "A"
};

const outcomeInstructions: Record<string, OutcomeInstruction> = {
	LOSE: "X",
	DRAW: "Y",
	WIN: "Z"
}

const shapeScores: Record<Shape, number> = {
	A: 1,
	B: 2,
	C: 3
}

const outcomeScores = {
	LOSE: 0,
	DRAW: 3,
	WIN: 6
}

function parseMatchInstructions(inputLines: string[]): MatchInstruction[] {
	return inputLines.map((line) => line.split(" ") as MatchInstruction);
}

function pickOwnHandBasedOnPartOneMapping([ opponentHand, outcomeInstruction ]: MatchInstruction): ShapeMatch {
	const assumedShapes: Record<OutcomeInstruction, Shape> = {
		X: "A",
		Y: "B",
		Z: "C"
	};

	return [ opponentHand, assumedShapes[outcomeInstruction] ];
}

function pickOwnHandBasedOnOutcomeInstruction([ opponentHand, outcomeInstruction ]: MatchInstruction): ShapeMatch {
	let ownHand;

	if (outcomeInstruction === outcomeInstructions.DRAW) {
		ownHand = opponentHand;
	} else if (outcomeInstruction === outcomeInstructions.LOSE) {
		ownHand = shapeDefeatedBy[opponentHand];
	} else {
		ownHand = shapeDefeating[opponentHand];
	}

	return [ opponentHand, ownHand ];
}

function calculateIndividualScore(shapeMatch: ShapeMatch): number {
	const [ opponentHand, ownHand ] = shapeMatch;
	const handScore = shapeScores[ownHand];
	let winningScore;

	if (opponentHand === ownHand) {
		// draw
		winningScore = outcomeScores.DRAW;
	} else if (opponentHand === shapeDefeatedBy[ownHand]) {
		// win
		winningScore = outcomeScores.WIN;
	} else {
		// lose
		winningScore = outcomeScores.LOSE;
	}

	return winningScore + handScore;
}

function calculateTotalScore(allMatches: ShapeMatch[]): number {
	return allMatches
		.map(calculateIndividualScore)
		.reduce((totalScore, nextScore) => totalScore + nextScore, 0);
}

async function solve(): Promise<string[]> {
	const puzzleInput = await inputHelper.readPuzzleInput(__dirname, "./02-input.txt");

	const parsedMatchInstructions = parseMatchInstructions(puzzleInput);

	const partOneShapeMatches = parsedMatchInstructions.map(pickOwnHandBasedOnPartOneMapping);
	const partOneTotalScore = calculateTotalScore(partOneShapeMatches);

	const partTwoShapeMatches = parsedMatchInstructions.map(pickOwnHandBasedOnOutcomeInstruction);
	const partTwoTotalScore = calculateTotalScore(partTwoShapeMatches);

	return [
		String(partOneTotalScore),
		String(partTwoTotalScore)
	];
}

export {
	MatchInstruction,
	ShapeMatch,
	parseMatchInstructions,
	pickOwnHandBasedOnPartOneMapping,
	pickOwnHandBasedOnOutcomeInstruction,
	calculateIndividualScore,
	calculateTotalScore,
	solve
}
