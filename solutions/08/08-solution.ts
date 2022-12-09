import * as inputHelper from "../../helpers/input";

type TreeMapRow = string;
type KnownVisibleTrees = Set<string>; // format: "row12col34"

function addKnownVisibleTree(knownVisibleTrees: KnownVisibleTrees, rowIndex: number, columnIndex: number): void {
	knownVisibleTrees.add(`row${rowIndex}col${columnIndex}`);
}

function determineVisibilityByRow(rows: TreeMapRow[], knownVisibleTrees: KnownVisibleTrees): KnownVisibleTrees {
	for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
		const row = rows[rowIndex];
		let highestTreeFromLeft = -1;
		let highestTreeFromRight = -1;

		// from the left edge
		for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
			const treeHeight = Number(row[columnIndex]);

			if (treeHeight > highestTreeFromLeft) {
				highestTreeFromLeft = treeHeight;
				addKnownVisibleTree(knownVisibleTrees, rowIndex, columnIndex);
			}
		}

		const highestOverallTree = highestTreeFromLeft;

		// from the right edge
		for (let columnIndex = row.length - 1; columnIndex >= 0; columnIndex--) {
			const treeHeight = Number(row[columnIndex]);

			if (treeHeight > highestTreeFromRight) {
				highestTreeFromRight = treeHeight;
				addKnownVisibleTree(knownVisibleTrees, rowIndex, columnIndex);
			}

			if (highestTreeFromRight === highestOverallTree) {
				// can no longer encounter any higher tree
				break;
			}
		}
	}

	return knownVisibleTrees;
}

function determineVisibilityByColumn(rows: TreeMapRow[], knownVisibleTrees: KnownVisibleTrees): KnownVisibleTrees {
	for (let columnIndex = 0; columnIndex < rows[0].length; columnIndex++) {
		let highestTreeFromTop = -1;
		let highestTreeFromBottom = -1;

		// from the top edge
		for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
			const row = rows[rowIndex];
			const treeHeight = Number(row[columnIndex]);

			if (treeHeight > highestTreeFromTop) {
				highestTreeFromTop = treeHeight;
				addKnownVisibleTree(knownVisibleTrees, rowIndex, columnIndex);
			}
		}

		const highestOverallTree = highestTreeFromTop;

		// from the bottom edge
		for (let rowIndex = rows.length - 1; rowIndex >= 0; rowIndex--) {
			const row = rows[rowIndex];
			const treeHeight = Number(row[columnIndex]);

			if (treeHeight > highestTreeFromBottom) {
				highestTreeFromBottom = treeHeight;
				addKnownVisibleTree(knownVisibleTrees, rowIndex, columnIndex);
			}

			if (highestTreeFromBottom === highestOverallTree) {
				// can no longer encounter any higher tree
				break;
			}
		}
	}

	return knownVisibleTrees;
}

async function solve(): Promise<string[]> {
	const puzzleInput = await inputHelper.readPuzzleInput(__dirname, "./08-input.txt");

	let knownVisibleTrees = new Set<string>() as KnownVisibleTrees;

	knownVisibleTrees = determineVisibilityByRow(puzzleInput, knownVisibleTrees);
	knownVisibleTrees = determineVisibilityByColumn(puzzleInput, knownVisibleTrees);

	const numberOfVisibleTrees = knownVisibleTrees.size;

	return [
		String(numberOfVisibleTrees)
	];
}

export {
	determineVisibilityByRow,
	determineVisibilityByColumn,
	solve
}
