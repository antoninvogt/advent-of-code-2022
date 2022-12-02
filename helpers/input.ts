import { join as joinPath } from "path";
import { readFile } from "fs/promises";

function splitByLine(fileContent: string): string[] {
	return fileContent.split("\n");
}

function trimEmptyLines(lines: string[]) {
	return lines.filter((line) => (line !== ""));
}

/**
 * Reads the input file from the specified working directory and relative path, and returns the file content separated into lines.
 *
 * @param {string} dirName                 - the directory from which to look for the file
 * @param {string} puzzleInputRelativePath - the relative path to the file from the directory
 *
 * @returns {Promise<string[]>} - A list of input items
 */
async function readPuzzleInputPreservingWhiteLines(dirName: string, puzzleInputRelativePath: string): Promise<string[]> {
	const path = joinPath(dirName, puzzleInputRelativePath);

	return readFile(path, { encoding: "utf-8" })
		.then(splitByLine);
}

/**
 * Reads the input file from the specified working directory and relative path, and returns the file content separated into lines.
 * Strips empty lines.
 *
 * @param {string} dirName                 - the directory from which to look for the file
 * @param {string} puzzleInputRelativePath - the relative path to the file from the directory
 *
 * @returns {Promise<string[]>} - A list of input items
 */
async function readPuzzleInput(dirName: string, puzzleInputRelativePath: string): Promise<string[]> {
	return readPuzzleInputPreservingWhiteLines(dirName, puzzleInputRelativePath)
		.then(trimEmptyLines);
}

export {
	readPuzzleInputPreservingWhiteLines,
	readPuzzleInput
}
