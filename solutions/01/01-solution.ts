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

function sortCalories(caloriesPerElf: number[]) {
	return caloriesPerElf.sort((a, b) => b - a);
}

function determineHighestCaloriesOnSingleElf(sortedCaloriesPerElf: number[]) {
	return sortedCaloriesPerElf[0];
}

function determineHighestCaloriesOnMultipleElves(sortedCaloriesPerElf: number[]) {
	return sortedCaloriesPerElf.slice(0, 3).reduce((totalCalories, nextCalories) => totalCalories + nextCalories, 0);
}

async function solve(): Promise<string[]> {
	const puzzleInput = await inputHelper.readPuzzleInputPreservingWhiteLines(__dirname, "./01-input.txt");

	const mergedCalories = determineMergedCalories(puzzleInput);
	const sortedMergedCalories = sortCalories(mergedCalories);
	const singleHighest = determineHighestCaloriesOnSingleElf(sortedMergedCalories);
	const threeHighest = determineHighestCaloriesOnMultipleElves(sortedMergedCalories);

	return [
		String(singleHighest),
		String(threeHighest)
	];
}

export {
	determineMergedCalories,
	sortCalories,
	determineHighestCaloriesOnSingleElf,
	determineHighestCaloriesOnMultipleElves,
	solve
}
