import * as inputHelper from "../../helpers/input";

type ListOfRucksackContents = string;

function splitInputLineIntoCompartments(inputLine: string): ListOfRucksackContents[] {
	const compartmentLength = inputLine.length / 2;

	return [ inputLine.slice(0, compartmentLength), inputLine.slice(compartmentLength) ]
}

function splitIntoGroupsOfThree(puzzleInput: string[]): string[][] {
	const allElves = puzzleInput.slice();
	const groupsOfThree = [];

	while (allElves.length) {
		groupsOfThree.push(allElves.splice(0, 3));
	}

	return groupsOfThree;
}

function findSharedItem(listOfItems: ListOfRucksackContents[]): string {
	const firstCollection = listOfItems[0];
	const otherCollections = listOfItems.slice(1);

	return firstCollection
		.split("")
		.find((currentItemInLeftCompartment) => {
			return otherCollections.every((collection) => {
				return (collection.includes(currentItemInLeftCompartment));
			});
		}) as string; // taking the easy way out and not checking for `undefined`, given the puzzle constraints
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
	const falselyDistributedItems = rucksacksSplitIntoCompartments.map(findSharedItem);
	const falselyDistributedItemsPrioritiesSum = sumUp(falselyDistributedItems.map(determinePriority));

	const elfGroups = splitIntoGroupsOfThree(puzzleInput);
	const elfGroupBadges = elfGroups.map(findSharedItem);
	const elfGroupBadgePrioritiesSum = sumUp(elfGroupBadges.map(determinePriority));

	return [
		String(falselyDistributedItemsPrioritiesSum),
		String(elfGroupBadgePrioritiesSum)
	];
}

export {
	splitInputLineIntoCompartments,
	splitIntoGroupsOfThree,
	findSharedItem,
	determinePriority,
	sumUp,
	solve
}
