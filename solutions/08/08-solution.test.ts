import {
	MapCoordinates,
	createTreeMapFromInputStrings,
	areCoordinatesInBounds,
	getLinearMapTraversalCoordinates,
	determineVisibility,
	determineViewDistance,
	determineScenicScores,
	searchForHighestScenicScore
} from "./08-solution";

describe("Day 08", () => {
	const treeRows = [
		[ 3, 0, 3, 7, 3 ],
		[ 2, 5, 5, 1, 2 ],
		[ 6, 5, 3, 3, 2 ],
		[ 3, 3, 5, 4, 9 ],
		[ 3, 5, 3, 9, 0 ]
	];

	describe("createTreeMapFromInputStrings", () => {
		it("should create a tree map from the puzzle input", () => {
			const input = [
				"30373",
				"25512",
				"65332",
				"33549",
				"35390"
			];

			const result = createTreeMapFromInputStrings(input);

			expect(result).toEqual([
				[ 3, 0, 3, 7, 3 ],
				[ 2, 5, 5, 1, 2 ],
				[ 6, 5, 3, 3, 2 ],
				[ 3, 3, 5, 4, 9 ],
				[ 3, 5, 3, 9, 0 ]
			]);
		});
	});

	describe("areCoordinatesInBounds", () => {
		it("should identify which coordinate are in or out of bounds", () => {
			const map = [
				[ Symbol(), Symbol(), Symbol(), Symbol(), Symbol() ],
				[ Symbol(), Symbol(), Symbol(), Symbol(), Symbol() ],
				[ Symbol(), Symbol(), Symbol(), Symbol(), Symbol() ],
				[ Symbol(), Symbol(), Symbol(), Symbol(), Symbol() ],
				[ Symbol(), Symbol(), Symbol(), Symbol(), Symbol() ]
			];
			const exampleCoordinatesList = [
				[ 0, 4 ],
				[ 4, 0 ],
				[ -1, 4 ],
				[ 4, -1 ],
				[ 0, 5 ],
				[ 5, 0 ]
			] as MapCoordinates[];

			const result = exampleCoordinatesList.map((exampleCoordinates) => areCoordinatesInBounds(map, exampleCoordinates));

			expect(result).toEqual([
				true,
				true,
				false,
				false,
				false,
				false
			]);
		});
	});

	describe("getLinearMapTraversalCoordinates", () => {
		describe("direction: row, forward", () => {
			const direction = "ROW_FORWARD";

			it("should generate the appropriate full sequence for the given row", () => {
				const map = [
					[ Symbol(), Symbol(), Symbol(), Symbol(), Symbol() ],
					[ Symbol(), Symbol(), Symbol(), Symbol(), Symbol() ],
					[ Symbol(), Symbol(), Symbol(), Symbol(), Symbol() ],
					[ Symbol(), Symbol(), Symbol(), Symbol(), Symbol() ],
					[ Symbol(), Symbol(), Symbol(), Symbol(), Symbol() ]
				];
				const startRow = 1;
				const linearMapTraversalCoordinates = getLinearMapTraversalCoordinates(map, direction, startRow);

				const result = [...linearMapTraversalCoordinates];

				expect(result).toEqual([
					[ 1, 0 ],
					[ 1, 1 ],
					[ 1, 2 ],
					[ 1, 3 ],
					[ 1, 4 ]
				]);
			});

			it("should generate the appropriate sequence starting from the given point", () => {
				const map = [
					[ Symbol(), Symbol(), Symbol(), Symbol(), Symbol() ],
					[ Symbol(), Symbol(), Symbol(), Symbol(), Symbol() ],
					[ Symbol(), Symbol(), Symbol(), Symbol(), Symbol() ],
					[ Symbol(), Symbol(), Symbol(), Symbol(), Symbol() ],
					[ Symbol(), Symbol(), Symbol(), Symbol(), Symbol() ]
				];
				const startRow = 1;
				const startCol = 2;
				const linearMapTraversalCoordinates = getLinearMapTraversalCoordinates(map, direction, startRow, startCol);

				const result = [...linearMapTraversalCoordinates];

				expect(result).toEqual([
					[ 1, 2 ],
					[ 1, 3 ],
					[ 1, 4 ]
				]);
			});
		});

		describe("direction: row, reverse", () => {
			const direction = "ROW_REVERSE";

			it("should generate the appropriate full sequence for the given row", () => {
				const map = [
					[ Symbol(), Symbol(), Symbol(), Symbol(), Symbol() ],
					[ Symbol(), Symbol(), Symbol(), Symbol(), Symbol() ],
					[ Symbol(), Symbol(), Symbol(), Symbol(), Symbol() ],
					[ Symbol(), Symbol(), Symbol(), Symbol(), Symbol() ],
					[ Symbol(), Symbol(), Symbol(), Symbol(), Symbol() ]
				];
				const startRow = 1;
				const linearMapTraversalCoordinates = getLinearMapTraversalCoordinates(map, direction, startRow);

				const result = [...linearMapTraversalCoordinates];

				expect(result).toEqual([
					[ 1, 4 ],
					[ 1, 3 ],
					[ 1, 2 ],
					[ 1, 1 ],
					[ 1, 0 ]
				]);
			});

			it("should generate the appropriate sequence starting from the given point", () => {
				const map = [
					[ Symbol(), Symbol(), Symbol(), Symbol(), Symbol() ],
					[ Symbol(), Symbol(), Symbol(), Symbol(), Symbol() ],
					[ Symbol(), Symbol(), Symbol(), Symbol(), Symbol() ],
					[ Symbol(), Symbol(), Symbol(), Symbol(), Symbol() ],
					[ Symbol(), Symbol(), Symbol(), Symbol(), Symbol() ]
				];
				const startRow = 1;
				const startCol = 2;
				const linearMapTraversalCoordinates = getLinearMapTraversalCoordinates(map, direction, startRow, startCol);

				const result = [...linearMapTraversalCoordinates];

				expect(result).toEqual([
					[ 1, 2 ],
					[ 1, 1 ],
					[ 1, 0 ]
				]);
			});
		});
		describe("direction: row, forward", () => {
			const direction = "ROW_FORWARD";

			it("should generate the appropriate full sequence for the given row", () => {
				const map = [
					[ Symbol(), Symbol(), Symbol(), Symbol(), Symbol() ],
					[ Symbol(), Symbol(), Symbol(), Symbol(), Symbol() ],
					[ Symbol(), Symbol(), Symbol(), Symbol(), Symbol() ],
					[ Symbol(), Symbol(), Symbol(), Symbol(), Symbol() ],
					[ Symbol(), Symbol(), Symbol(), Symbol(), Symbol() ]
				];
				const startRow = 1;
				const linearMapTraversalCoordinates = getLinearMapTraversalCoordinates(map, direction, startRow);

				const result = [...linearMapTraversalCoordinates];

				expect(result).toEqual([
					[ 1, 0 ],
					[ 1, 1 ],
					[ 1, 2 ],
					[ 1, 3 ],
					[ 1, 4 ]
				]);
			});

			it("should generate the appropriate sequence starting from the given point", () => {
				const map = [
					[ Symbol(), Symbol(), Symbol(), Symbol(), Symbol() ],
					[ Symbol(), Symbol(), Symbol(), Symbol(), Symbol() ],
					[ Symbol(), Symbol(), Symbol(), Symbol(), Symbol() ],
					[ Symbol(), Symbol(), Symbol(), Symbol(), Symbol() ],
					[ Symbol(), Symbol(), Symbol(), Symbol(), Symbol() ]
				];
				const startRow = 1;
				const startCol = 2;
				const linearMapTraversalCoordinates = getLinearMapTraversalCoordinates(map, direction, startRow, startCol);

				const result = [...linearMapTraversalCoordinates];

				expect(result).toEqual([
					[ 1, 2 ],
					[ 1, 3 ],
					[ 1, 4 ]
				]);
			});
		});

		describe("direction: col, forward", () => {
			const direction = "COL_FORWARD";

			it("should generate the appropriate full sequence for the given column", () => {
				const map = [
					[ Symbol(), Symbol(), Symbol(), Symbol(), Symbol() ],
					[ Symbol(), Symbol(), Symbol(), Symbol(), Symbol() ],
					[ Symbol(), Symbol(), Symbol(), Symbol(), Symbol() ],
					[ Symbol(), Symbol(), Symbol(), Symbol(), Symbol() ],
					[ Symbol(), Symbol(), Symbol(), Symbol(), Symbol() ]
				];
				const startCol = 1;
				const linearMapTraversalCoordinates = getLinearMapTraversalCoordinates(map, direction, undefined, startCol);

				const result = [...linearMapTraversalCoordinates];

				expect(result).toEqual([
					[ 0, 1 ],
					[ 1, 1 ],
					[ 2, 1 ],
					[ 3, 1 ],
					[ 4, 1 ]
				]);
			});

			it("should generate the appropriate sequence starting from the given point", () => {
				const map = [
					[ Symbol(), Symbol(), Symbol(), Symbol(), Symbol() ],
					[ Symbol(), Symbol(), Symbol(), Symbol(), Symbol() ],
					[ Symbol(), Symbol(), Symbol(), Symbol(), Symbol() ],
					[ Symbol(), Symbol(), Symbol(), Symbol(), Symbol() ],
					[ Symbol(), Symbol(), Symbol(), Symbol(), Symbol() ]
				];
				const startRow = 2;
				const startCol = 1;
				const linearMapTraversalCoordinates = getLinearMapTraversalCoordinates(map, direction, startRow, startCol);

				const result = [...linearMapTraversalCoordinates];

				expect(result).toEqual([
					[ 2, 1 ],
					[ 3, 1 ],
					[ 4, 1 ]
				]);
			});
		});

		describe("direction: col, reverse", () => {
			const direction = "COL_REVERSE";

			it("should generate the appropriate full sequence for the given column", () => {
				const map = [
					[ Symbol(), Symbol(), Symbol(), Symbol(), Symbol() ],
					[ Symbol(), Symbol(), Symbol(), Symbol(), Symbol() ],
					[ Symbol(), Symbol(), Symbol(), Symbol(), Symbol() ],
					[ Symbol(), Symbol(), Symbol(), Symbol(), Symbol() ],
					[ Symbol(), Symbol(), Symbol(), Symbol(), Symbol() ]
				];
				const startCol = 1;
				const linearMapTraversalCoordinates = getLinearMapTraversalCoordinates(map, direction, undefined, startCol);

				const result = [...linearMapTraversalCoordinates];

				expect(result).toEqual([
					[ 4, 1 ],
					[ 3, 1 ],
					[ 2, 1 ],
					[ 1, 1 ],
					[ 0, 1 ]
				]);
			});

			it("should generate the appropriate sequence starting from the given point", () => {
				const map = [
					[ Symbol(), Symbol(), Symbol(), Symbol(), Symbol() ],
					[ Symbol(), Symbol(), Symbol(), Symbol(), Symbol() ],
					[ Symbol(), Symbol(), Symbol(), Symbol(), Symbol() ],
					[ Symbol(), Symbol(), Symbol(), Symbol(), Symbol() ],
					[ Symbol(), Symbol(), Symbol(), Symbol(), Symbol() ]
				];
				const startRow = 2;
				const startCol = 1;
				const linearMapTraversalCoordinates = getLinearMapTraversalCoordinates(map, direction, startRow, startCol);

				const result = [...linearMapTraversalCoordinates];

				expect(result).toEqual([
					[ 2, 1 ],
					[ 1, 1 ],
					[ 0, 1 ]
				]);
			});
		});
	});

	describe("determineVisibility", () => {
		it("should mark all trees on the outer ends as visible by default", () => {
			const result = determineVisibility(treeRows, new Set<string>());

			expect([ ...result ]).toEqual(expect.arrayContaining([
				"row0col0",
				"row0col1",
				"row0col2",
				"row0col3",
				"row0col4",
				"row1col4",
				"row2col4",
				"row3col4",
				"row4col4",
				"row4col3",
				"row4col2",
				"row4col1",
				"row4col0",
				"row3col0",
				"row2col0",
				"row1col0"
			]));
		});

		it("should mark all inner trees which are visible from either side", () => {
			const result = determineVisibility(treeRows, new Set<string>());

			expect([ ...result ]).toEqual(expect.arrayContaining([
				"row1col1",
				"row1col2",
				"row2col1",
				"row2col3",
				"row3col2"
			]));
		});

		it("should not mark any inner trees which are not visible from either side horizontally", () => {
			const result = determineVisibility(treeRows, new Set<string>());

			expect([ ...result ]).toEqual(expect.not.arrayContaining([
				"row1col3",
				"row2col2",
				"row3col1",
				"row3col3"
			]));
		});
	});

	describe("determineViewDistance", () => {
		const treeRows = [
			[ 3, 0, 3, 7, 3 ],
			[ 2, 5, 5, 1, 2 ],
			[ 6, 5, 3, 3, 2 ],
			[ 3, 3, 5, 4, 9 ],
			[ 3, 5, 3, 9, 0 ]
		];

		it("should determine the appropriate view distances in each direction for element [1;2] from the puzzle example", () => {
			const coordinates = [ 1, 2 ] as MapCoordinates;
			const result = [
				determineViewDistance(treeRows, coordinates, "COL_REVERSE"),
				determineViewDistance(treeRows, coordinates, "ROW_FORWARD"),
				determineViewDistance(treeRows, coordinates, "COL_FORWARD"),
				determineViewDistance(treeRows, coordinates, "ROW_REVERSE")
			];

			expect(result).toEqual([
				1,
				2,
				2,
				1
			]);
		});

		it("should determine the appropriate view distances in each direction for element [3;2] from the puzzle example", () => {
			const coordinates = [ 3, 2 ] as MapCoordinates;
			const result = [
				determineViewDistance(treeRows, coordinates, "COL_REVERSE"),
				determineViewDistance(treeRows, coordinates, "ROW_FORWARD"),
				determineViewDistance(treeRows, coordinates, "COL_FORWARD"),
				determineViewDistance(treeRows, coordinates, "ROW_REVERSE")
			];

			expect(result).toEqual([
				2,
				2,
				1,
				2
			]);
		});
	});

	describe("determineScenicScores", () => {
		it("should determine the scenic score for each tree in the map", () => {
			const result = determineScenicScores(treeRows);

			expect(result[1][2]).toEqual(4);
			expect(result[3][2]).toEqual(8);
		});
	});

	describe("searchForHighestScenicScore", () => {
		it("should determine the scenic score for each tree in the map", () => {
			const scenicScoresMap = [
				[ 0, 0, 0, 0, 0 ],
				[ 0, 1, 4, 1, 0 ],
				[ 0, 6, 1, 2, 0 ],
				[ 0, 1, 8, 3, 0 ],
				[ 0, 0, 0, 0, 0 ]
			];

			const result = searchForHighestScenicScore(scenicScoresMap);

			expect(result).toEqual(8);
		});
	});
});
