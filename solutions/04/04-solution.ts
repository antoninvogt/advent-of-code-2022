import * as inputHelper from "../../helpers/input";

type SectionRange = [ start: number, end: number ];

function turnInputLineIntoSectionRanges(inputLine: string): [ SectionRange, SectionRange ] {
	return inputLine
		.split(",")
		.map((sectionRangeStringRepresentation) => {
			return sectionRangeStringRepresentation
				.split("-")
				.map(Number);
		}) as [ SectionRange, SectionRange ];
}

function doesSectionFullyContain(containingSection: SectionRange, containedSection: SectionRange): boolean {
	return (containingSection[0] <= containedSection[0] && containingSection[1] >= containedSection[1]);
}

function determineNumberOfFullyContainingPairs(sectionRanges: SectionRange[][]): number {
	return sectionRanges
		.filter(([ firstRange, secondRange ]) => (
			doesSectionFullyContain(firstRange, secondRange)
			|| doesSectionFullyContain(secondRange, firstRange)
		))
		.length;
}

async function solve(): Promise<string[]> {
	const puzzleInput = await inputHelper.readPuzzleInput(__dirname, "./04-input.txt");

	const pairsOfSectionRanges = puzzleInput.map(turnInputLineIntoSectionRanges);
	const numberOfFullyContainingPairs = determineNumberOfFullyContainingPairs(pairsOfSectionRanges);

	return [
		String(numberOfFullyContainingPairs)
	];
}

export {
	SectionRange,
	turnInputLineIntoSectionRanges,
	doesSectionFullyContain,
	determineNumberOfFullyContainingPairs,
	solve
}
