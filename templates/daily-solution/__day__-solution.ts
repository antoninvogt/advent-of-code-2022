import * as inputHelper from "../../helpers/input";

async function solve(): Promise<string[]> {
	const puzzleInput = await inputHelper.readPuzzleInput(__dirname, "./__day__-input.txt");

	// `puzzleInput` is a list of strings representing the individual lines of the input file
	// empty lines are stripped by default; if you require the empty lines in the original document, use `inputHelper.readPuzzleInputPreservingWhiteLines` instead

	return [
		// your solutions go here as a string
	];
}

export {
	solve
}
