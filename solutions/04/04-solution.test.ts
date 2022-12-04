import {
	SectionRange,
	turnInputLineIntoSectionRanges,
	doesSectionFullyContain,
	determineNumberOfFullyContainingPairs
} from "./04-solution";

describe("Day 04", () => {
	describe("turnInputLineIntoSectionRanges", () => {
		it("should parse the given line into a pair of task ranges", () => {
			const input = [
				"2-4,6-8",
				"2-3,4-5",
				"5-7,7-9",
				"2-8,3-7",
				"6-6,4-6",
				"2-6,4-8",
			];

			const result = input.map(turnInputLineIntoSectionRanges);

			expect(result).toEqual([
				[ [ 2, 4 ], [ 6, 8 ] ],
				[ [ 2, 3 ], [ 4, 5 ] ],
				[ [ 5, 7 ], [ 7, 9 ] ],
				[ [ 2, 8 ], [ 3, 7 ] ],
				[ [ 6, 6 ], [ 4, 6 ] ],
				[ [ 2, 6 ], [ 4, 8 ] ]
			]);
		});
	});

	describe("doesSectionFullyContain", () => {
		it("should return `false` if the ranges don't intersect", () => {
			const range1 = [ 2, 4 ] as SectionRange;
			const range2 = [ 6, 8 ] as SectionRange;

			const result = doesSectionFullyContain(range1, range2);

			expect(result).toEqual(false);
		});

		it("should return `false` if the ranges intersect partly", () => {
			const range1 = [ 5, 7 ] as SectionRange;
			const range2 = [ 7, 9 ] as SectionRange;

			const result = doesSectionFullyContain(range1, range2);

			expect(result).toEqual(false);
		});

		it("should return `true` if the ranges are equal", () => {
			const range1 = [ 5, 7 ] as SectionRange;
			const range2 = [ 5, 7 ] as SectionRange;

			const result = doesSectionFullyContain(range1, range2);

			expect(result).toEqual(true);
		});

		it("should return `true` if the second range is fully contained in the first", () => {
			const range1 = [ 2, 8 ] as SectionRange;
			const range2 = [ 3, 7 ] as SectionRange;

			const result = doesSectionFullyContain(range1, range2);

			expect(result).toEqual(true);
		});
	});

	describe("determineNumberOfFullyContainingPairs", () => {
		it("should ", () => {
			const input = [
				[ [ 2, 4 ], [ 6, 8 ] ],
				[ [ 2, 3 ], [ 4, 5 ] ],
				[ [ 5, 7 ], [ 7, 9 ] ],
				[ [ 2, 8 ], [ 3, 7 ] ],
				[ [ 6, 6 ], [ 4, 6 ] ],
				[ [ 2, 6 ], [ 4, 8 ] ]
			] as SectionRange[][];

			const result = determineNumberOfFullyContainingPairs(input);

			expect(result).toEqual(2);
		});
	});
});
