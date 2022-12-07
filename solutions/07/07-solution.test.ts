import {
	parseOutputStatementChunksFromInput,
	buildFileTree,
	findDirectories,
	isWithinSizeLimit,
	addDirectorySizeOntoTotal
} from "./07-solution";

describe("Day 07", () => {
	const puzzleInput = [
		"$ cd /",
		"$ ls",
		"dir a",
		"14848514 b.txt",
		"8504156 c.dat",
		"dir d",
		"$ cd a",
		"$ ls",
		"dir e",
		"29116 f",
		"2557 g",
		"62596 h.lst",
		"$ cd e",
		"$ ls",
		"584 i",
		"$ cd ..",
		"$ cd ..",
		"$ cd d",
		"$ ls",
		"4060174 j",
		"8033020 d.log",
		"5626152 d.ext",
		"7214296 k"
	];

	describe("parseOutputStatementChunksFromInput", () => {
		it("should turn the input lines into chunks containing one command each, and optionally any following output lines", () => {
			const input = puzzleInput;

			const result = parseOutputStatementChunksFromInput(input);

			expect(result).toEqual([
				[
					"$ cd /"
				],
				[
					"$ ls",
					"dir a",
					"14848514 b.txt",
					"8504156 c.dat",
					"dir d"
				],
				[
					"$ cd a"
				],
				[
					"$ ls",
					"dir e",
					"29116 f",
					"2557 g",
					"62596 h.lst"
				],
				[
					"$ cd e"
				],
				[
					"$ ls",
					"584 i"
				],
				[
					"$ cd .."
				],
				[
					"$ cd .."
				],
				[
					"$ cd d"
				],
				[
					"$ ls",
					"4060174 j",
					"8033020 d.log",
					"5626152 d.ext",
					"7214296 k"
				]
			]);
		});
	});

	describe("buildFileTree", () => {
		it("should build a file tree from the specified command-line output", () => {
			const input = parseOutputStatementChunksFromInput(puzzleInput);

			const result = buildFileTree(input);

			expect(result).toEqual(expect.objectContaining({
				children: expect.arrayContaining([
					expect.objectContaining({
						name: "a",
						children: expect.arrayContaining([
							expect.objectContaining({
								name: "e",
								children: [
									expect.objectContaining({ name: "i", size: 584 })
								]
							}),
							expect.objectContaining({ name: "f", size: 29116 }),
							expect.objectContaining({ name: "g", size: 2557 }),
							expect.objectContaining({ name: "h.lst", size: 62596 })
						])
					}),
					expect.objectContaining({ name: "b.txt", size: 14848514 }),
					expect.objectContaining({ name: "c.dat", size: 8504156 }),
					expect.objectContaining({
						name: "d",
						children: expect.arrayContaining([
							expect.objectContaining({ name: "j", size: 4060174 }),
							expect.objectContaining({ name: "d.log", size: 8033020 }),
							expect.objectContaining({ name: "d.ext", size: 5626152 }),
							expect.objectContaining({ name: "k", size: 7214296 })
						])
					}),
				])
			}));
		});
	});

	describe("findDirectories", () => {
		it("should compile a list containing all directories in the file tree", () => {
			const input = buildFileTree(parseOutputStatementChunksFromInput(puzzleInput));

			const result = findDirectories(input);

			expect(result).toHaveLength(4);
			expect(result).toEqual(expect.arrayContaining([
				expect.objectContaining({ name: "/" }),
				expect.objectContaining({ name: "a" }),
				expect.objectContaining({ name: "d" }),
				expect.objectContaining({ name: "e" })
			]));
		});
	});

	describe("isWithinSizeLimit", () => {
		it("should filter out any items above the maximum size", () => {
			const input = findDirectories(buildFileTree(parseOutputStatementChunksFromInput(puzzleInput)));

			const result = input.filter(isWithinSizeLimit);

			expect(result).toHaveLength(2);
			expect(result).toEqual(expect.arrayContaining([
				expect.objectContaining({ name: "a" }),
				expect.objectContaining({ name: "e" })
			]));
		});
	});

	describe("addDirectorySizeOntoTotal", () => {
		it("should filter out any items above the maximum size", () => {
			const input = findDirectories(buildFileTree(parseOutputStatementChunksFromInput(puzzleInput))).filter(isWithinSizeLimit);

			const result = input.reduce(addDirectorySizeOntoTotal, 0);

			expect(result).toEqual(95437);
		});
	});
});
