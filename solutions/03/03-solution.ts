import * as inputHelper from "../../helpers/input";

type Compartment = string;

function splitInputLineIntoCompartments(inputLine: string): Compartment[] {
	const compartmentLength = inputLine.length / 2;

	return [ inputLine.slice(0, compartmentLength), inputLine.slice(compartmentLength) ]
}

function findFalselyDistributedItem(compartments: Compartment[]): string {
	const [ leftCompartment, rightCompartment ] = compartments;

	return leftCompartment
		.split("")
		.find((currentItemInLeftCompartment) => {
			return (rightCompartment.includes(currentItemInLeftCompartment));
		}) as string;

	// taking the easy way out and not checking for `undefined`, given the puzzle constraints
}

function determinePriority(item: string): number {
	const isCharLowerCase = (item.toLowerCase() === item);
	const codePointOffset = (isCharLowerCase) ? "a".charCodeAt(0) : "A".charCodeAt(0) - 26;

	return (item.codePointAt(0) as number) - codePointOffset + 1;
}

function sumUp(summands: number[]): number {
	return summands.reduce((total, next) => total + next, 0);
}

async function solve(): Promise<string[]> {
	const puzzleInput = await inputHelper.readPuzzleInput(__dirname, "./03-input.txt");

	const rucksacksSplitIntoCompartments = puzzleInput.map(splitInputLineIntoCompartments);
	const falselyDistributedItems = rucksacksSplitIntoCompartments.map(findFalselyDistributedItem);

	const prioritiesSum = sumUp(falselyDistributedItems.map(determinePriority));

	return [
		String(prioritiesSum)
	];
}

export {
	splitInputLineIntoCompartments,
	findFalselyDistributedItem,
	determinePriority,
	sumUp,
	solve
}
