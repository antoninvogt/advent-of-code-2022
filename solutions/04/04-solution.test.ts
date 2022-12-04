import {
	SectionRange,
	SectionRangePair,
	turnInputLineIntoSectionRanges,
	isSectionFullyContained,
	doSectionsOverlap,
	determineNumberOfFullyContainingPairs,
	determineNumberOfOverlappingPairs
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

			const result = isSectionFullyContained([ range1, range2 ]);

			expect(result).toEqual(false);
		});

		it("should return `false` if the ranges intersect partly", () => {
			const range1 = [ 5, 7 ] as SectionRange;
			const range2 = [ 7, 9 ] as SectionRange;

			const result = isSectionFullyContained([ range1, range2 ]);

			expect(result).toEqual(false);
		});

		it("should return `true` if the ranges are equal", () => {
			const range1 = [ 5, 7 ] as SectionRange;
			const range2 = [ 5, 7 ] as SectionRange;

			const result = isSectionFullyContained([ range1, range2 ]);

			expect(result).toEqual(true);
		});

		it("should return `true` if the second range is fully contained in the first", () => {
			const range1 = [ 2, 8 ] as SectionRange;
			const range2 = [ 3, 7 ] as SectionRange;

			const result = isSectionFullyContained([ range1, range2 ]);

			expect(result).toEqual(true);
		});
	});

	describe("doSectionsOverlap", () => {
		it("should return `false` if the ranges don't intersect", () => {
			const range1 = [ 2, 4 ] as SectionRange;
			const range2 = [ 6, 8 ] as SectionRange;

			const result = doSectionsOverlap([ range1, range2 ]);

			expect(result).toEqual(false);
		});

		it("should return `false` if the ranges are adjacent, but not overlapping", () => {
			const range1 = [ 2, 5 ] as SectionRange;
			const range2 = [ 6, 8 ] as SectionRange;

			const result = doSectionsOverlap([ range1, range2 ]);

			expect(result).toEqual(false);
		});

		it("should return `true` if the ranges intersect at the end of the first range", () => {
			const range1 = [ 5, 7 ] as SectionRange;
			const range2 = [ 7, 9 ] as SectionRange;

			const result = doSectionsOverlap([ range1, range2 ]);

			expect(result).toEqual(true);
		});

		it("should return `true` if the ranges intersect at the start of the first range", () => {
			const range1 = [ 5, 7 ] as SectionRange;
			const range2 = [ 3, 5 ] as SectionRange;

			const result = doSectionsOverlap([ range1, range2 ]);

			expect(result).toEqual(true);
		});

		it("should return `true` if the ranges are equal", () => {
			const range1 = [ 5, 7 ] as SectionRange;
			const range2 = [ 5, 7 ] as SectionRange;

			const result = doSectionsOverlap([ range1, range2 ]);

			expect(result).toEqual(true);
		});

		it("should return `true` if the second range is fully contained in the first", () => {
			const range1 = [ 2, 8 ] as SectionRange;
			const range2 = [ 3, 7 ] as SectionRange;

			const result = doSectionsOverlap([ range1, range2 ]);

			expect(result).toEqual(true);
		});

		it("should return `true` if the first range is fully contained in the second", () => {
			const range1 = [ 3, 7 ] as SectionRange;
			const range2 = [ 2, 8 ] as SectionRange;

			const result = doSectionsOverlap([ range1, range2 ]);

			expect(result).toEqual(true);
		});
	});

	describe("determineNumberOfFullyContainingPairs", () => {
		it("should find the appropriate number of pairs where one range fully encloses the other", () => {
			const input = [
				[ [ 2, 4 ], [ 6, 8 ] ],
				[ [ 2, 3 ], [ 4, 5 ] ],
				[ [ 5, 7 ], [ 7, 9 ] ],
				[ [ 2, 8 ], [ 3, 7 ] ],
				[ [ 6, 6 ], [ 4, 6 ] ],
				[ [ 2, 6 ], [ 4, 8 ] ]
			] as SectionRangePair[];

			const result = determineNumberOfFullyContainingPairs(input);

			expect(result).toEqual(2);
		});
	});

	describe("determineNumberOfOverlappingPairs", () => {
		it("should find the appropriate number of pairs where one range overlaps with the other", () => {
			const input = [
				[ [ 2, 4 ], [ 6, 8 ] ],
				[ [ 2, 3 ], [ 4, 5 ] ],
				[ [ 5, 7 ], [ 7, 9 ] ],
				[ [ 2, 8 ], [ 3, 7 ] ],
				[ [ 6, 6 ], [ 4, 6 ] ],
				[ [ 2, 6 ], [ 4, 8 ] ]
			] as SectionRangePair[];

			const result = determineNumberOfOverlappingPairs(input);

			expect(result).toEqual(4);
		});
	});
});
