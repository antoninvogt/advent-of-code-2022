import {
	determineVisibilityByRow,
	determineVisibilityByColumn
} from "./08-solution";

describe("Day 08", () => {
	const treeRows = [
		"30373",
		"25512",
		"65332",
		"33549",
		"35390"
	];

	describe("determineVisibilityByRow", () => {
		it("should mark all trees on the outer ends as visible by default", () => {
			const result = determineVisibilityByRow(treeRows, new Set<string>());

			expect([ ...result ]).toEqual(expect.arrayContaining([
				"row0col0",
				"row1col0",
				"row2col0",
				"row3col0",
				"row4col4",
				"row0col4",
				"row1col4",
				"row2col4",
				"row3col4",
				"row4col4"
			]));
		});

		it("should mark all inner trees which are visible from either side horizontally", () => {
			const result = determineVisibilityByRow(treeRows, new Set<string>());

			expect([ ...result ]).toEqual(expect.arrayContaining([
				"row1col1",
				"row1col2",
				"row2col1",
				"row2col3",
				"row3col2"
			]));
		});

		it("should not mark any inner trees which are not visible from either side horizontally", () => {
			const result = determineVisibilityByRow(treeRows, new Set<string>());

			expect([ ...result ]).toEqual(expect.not.arrayContaining([
				"row1col3",
				"row2col2",
				"row3col1",
				"row3col3"
			]));
		});
	});

	describe("determineVisibilityByColumn", () => {
		it("should mark all trees on the outer ends as visible by default", () => {
			const result = determineVisibilityByColumn(treeRows, new Set<string>());

			expect([ ...result ]).toEqual(expect.arrayContaining([
				"row0col0",
				"row0col1",
				"row0col2",
				"row0col3",
				"row0col4",
				"row4col0",
				"row4col1",
				"row4col2",
				"row4col3",
				"row4col4"
			]));
		});

		it("should mark all inner trees which are visible from either side horizontally", () => {
			const result = determineVisibilityByColumn(treeRows, new Set<string>());

			expect([ ...result ]).toEqual(expect.arrayContaining([
				"row1col1",
				"row1col2",
				"row3col2"
			]));
		});

		it("should not mark any inner trees which are not visible from either side horizontally", () => {
			const result = determineVisibilityByColumn(treeRows, new Set<string>());

			expect([ ...result ]).toEqual(expect.not.arrayContaining([
				"row1col3",
				"row2col1",
				"row2col2",
				"row2col3",
				"row3col1",
				"row3col3"
			]));
		});
	});
});
