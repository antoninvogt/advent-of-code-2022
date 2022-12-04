import * as inputHelper from "../../helpers/input";

type SectionRange = [ start: number, end: number ];
type SectionRangePair = [ SectionRange, SectionRange ];

function turnInputLineIntoSectionRanges(inputLine: string): SectionRangePair {
	return inputLine
		.split(",")
		.map((sectionRangeStringRepresentation) => {
			return sectionRangeStringRepresentation
				.split("-")
				.map(Number);
		}) as SectionRangePair;
}

function isSectionFullyContained(sections: SectionRangePair): boolean {
	const [ section1, section2 ] = sections;
	const isSection1ContainedInSection2 = (section1[0] <= section2[0] && section1[1] >= section2[1]);
	const isSection2ContainedInSection1 = (section2[0] <= section1[0] && section2[1] >= section1[1]);

	return (isSection1ContainedInSection2 || isSection2ContainedInSection1);
}

function doSectionsOverlap(sections: SectionRangePair): boolean {
	const [ section1, section2 ] = sections;

	const doesSection1BeginningOverlap = (section1[0] <= section2[0] && section1[1] >= section2[0]);
	const doesSection1EndOverlap = (section1[0] <= section2[1] && section1[1] >= section2[1]);
	const isSection1Enclosed = (section1[0] >= section2[0] && section1[1] <= section2[1]);

	return (doesSection1BeginningOverlap || doesSection1EndOverlap || isSection1Enclosed);
}

function determineNumberOfFullyContainingPairs(sectionRanges: SectionRangePair[]): number {
	return sectionRanges
		.filter(isSectionFullyContained)
		.length;
}

function determineNumberOfOverlappingPairs(sectionRanges: SectionRangePair[]): number {
	return sectionRanges
		.filter(doSectionsOverlap)
		.length;
}

async function solve(): Promise<string[]> {
	const puzzleInput = await inputHelper.readPuzzleInput(__dirname, "./04-input.txt");

	const pairsOfSectionRanges = puzzleInput.map(turnInputLineIntoSectionRanges);
	const numberOfFullyContainingPairs = determineNumberOfFullyContainingPairs(pairsOfSectionRanges);
	const numberOfOverlappingRanges = determineNumberOfOverlappingPairs(pairsOfSectionRanges);

	return [
		String(numberOfFullyContainingPairs),
		String(numberOfOverlappingRanges)
	];
}

export {
	SectionRange,
	SectionRangePair,
	turnInputLineIntoSectionRanges,
	isSectionFullyContained,
	doSectionsOverlap,
	determineNumberOfFullyContainingPairs,
	determineNumberOfOverlappingPairs,
	solve
}
