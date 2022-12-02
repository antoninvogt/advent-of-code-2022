import * as fs from "fs/promises";
jest.mock("fs/promises");

import {
	readPuzzleInputPreservingWhiteLines,
	readPuzzleInput
} from "./input";

describe("Input Helpers", () => {
	const mockedReadFile = fs.readFile as jest.MockedFunction<typeof fs.readFile>;

	beforeEach(() => {
		mockedReadFile.mockReset();
		mockedReadFile.mockResolvedValue("");
	});

	describe("readPuzzleInputPreservingWhiteLines", () => {
		it("should read the file from the specified location", async () => {
			const path = "/some/absolute/path/abc";
			const fileName = "../some-file-name.txt";
			const expectedURI = "/some/absolute/path/some-file-name.txt";

			await readPuzzleInputPreservingWhiteLines(path, fileName);

			expect(mockedReadFile).toHaveBeenCalledWith(expectedURI, expect.anything());
		});

		it("should read the file as UTF-8", async () => {
			await readPuzzleInputPreservingWhiteLines("irrelevant", "irrelevant");

			expect(mockedReadFile).toHaveBeenCalledWith(expect.anything(), expect.objectContaining({ encoding: "utf-8" }));
		});

		it("should resolve with the result of the file system access", async () => {
			const mockFsResult = "the body of the input file";

			mockedReadFile.mockImplementation(() => Promise.resolve(mockFsResult));

			const result = await readPuzzleInputPreservingWhiteLines("irrelevant", "irrelevant");

			expect(result).toEqual([
				mockFsResult
			]);
		});

		it("should split the result of the file system access by lines", async () => {
			const mockFsResult = "1\n\nthe body of the input file\n";

			mockedReadFile.mockImplementation(() => Promise.resolve(mockFsResult));

			const result = await readPuzzleInputPreservingWhiteLines("irrelevant", "irrelevant");

			expect(result).toEqual([
				"1",
				"",
				"the body of the input file",
				""
			]);
		});
	});

	describe("readPuzzleInput", () => {
		it("should return the same content as `readPuzzleInputPreservingWhiteLines` if the file contains no white lines", async () => {
			const mockFsResult = "the body\nof\nthe input file";

			mockedReadFile.mockImplementation(() => Promise.resolve(mockFsResult));

			const resultWithWhiteLines = await readPuzzleInputPreservingWhiteLines("irrelevant", "irrelevant");
			const resultWithoutWhiteLines = await readPuzzleInput("irrelevant", "irrelevant");

			expect(resultWithoutWhiteLines).toHaveLength(resultWithWhiteLines.length);
			expect(resultWithoutWhiteLines).toEqual(expect.arrayContaining(resultWithWhiteLines));
		});

		it("should strip the empty lines from the file result", async () => {
			const mockFsResult = "\na\n\nb\n";

			mockedReadFile.mockImplementation(() => Promise.resolve(mockFsResult));

			const result = await readPuzzleInput("irrelevant", "irrelevant");

			expect(result).toEqual([ "a", "b" ]);
		});
	});
});
