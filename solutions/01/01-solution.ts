import * as inputHelper from "../../helpers/input";

function determineMergedCalories(allMealsForAllElves: string[]): number[] {
	return allMealsForAllElves.reduce((mergedCalories: number[], line) => {
		if (mergedCalories.length === 0 || line === "") {
			mergedCalories.push(0);
		}

		if (line !== "") {
			mergedCalories[mergedCalories.length - 1] += parseInt(line, 10);
		}

		return mergedCalories;
	}, []);
}

function determineHighestCalories(caloriesPerElf: number[]): number {
	return Math.max(...caloriesPerElf);
}

async function solve(): Promise<string[]> {
	const puzzleInput = await inputHelper.readPuzzleInputPreservingWhiteLines(__dirname, "./01-input.txt");

	const mergedCalories = determineMergedCalories(puzzleInput);
	const highestCalories = determineHighestCalories(mergedCalories);

	return [
		String(highestCalories)
	];
}

export {
	determineMergedCalories,
	determineHighestCalories,
	solve
}
