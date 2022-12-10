import * as inputHelper from "../../helpers/input";

type MapRow<T> = T[];
type Map<T> = MapRow<T>[];
type MapCoordinates = [ rowIndex: number, columnIndex: number ];
type MapTraversalDirection = ("ROW_FORWARD"|"ROW_REVERSE"|"COL_FORWARD"|"COL_REVERSE");

type TreeMapRowString = string;
type TreeMapRow = number[];
type TreeMap = TreeMapRow[];
type KnownVisibleTrees = Set<string>; // format: "row12col34"

function areCoordinatesInBounds<T>(map: Map<T>, coordinates: MapCoordinates): boolean {
	const [ rowIndex, colIndex ] = coordinates;

	return (rowIndex >= 0 && rowIndex < map.length && colIndex >= 0 && colIndex < map[0].length);
}

function* getLinearMapTraversalCoordinates<T>(map: Map<T>, direction: MapTraversalDirection, startRowIndex?: number, startColIndex?: number): Generator<MapCoordinates> {
	if (!map.length || !map?.[0].length) {
		throw new Error("Rows and columns may not be empty.");
	}
	if (direction.startsWith("ROW") && startRowIndex === undefined) {
		throw new Error("A start row must be specified for this direction.");
	}
	if (direction.startsWith("COL") && startColIndex === undefined) {
		throw new Error("A start column must be specified for this direction.");
	}

	const defaultStartRow: Record<MapTraversalDirection, number> = {
		ROW_FORWARD: -1,
		ROW_REVERSE: -1,
		COL_FORWARD: 0,
		COL_REVERSE: map.length - 1
	};

	const defaultStartCol: Record<MapTraversalDirection, number> = {
		ROW_FORWARD: 0,
		ROW_REVERSE: map[0].length - 1,
		COL_FORWARD: -1,
		COL_REVERSE: -1
	};

	let currentCoordinates = [ startRowIndex ?? defaultStartRow[direction], startColIndex ?? defaultStartCol[direction] ] as MapCoordinates;

	while (areCoordinatesInBounds<T>(map, currentCoordinates)) {
		yield currentCoordinates;

		const [ currentRow, currentCol ] = currentCoordinates;
		let nextRow: number, nextCol: number;

		switch (direction) {
			case "ROW_FORWARD":
				nextRow = currentRow;
				nextCol = currentCol + 1;

				break;
			case "ROW_REVERSE":
				nextRow = currentRow;
				nextCol = currentCol - 1;

				break;
			case "COL_FORWARD":
				nextRow = currentRow + 1;
				nextCol = currentCol;

				break;
			case "COL_REVERSE":
				nextRow = currentRow - 1;
				nextCol = currentCol;

				break;
		}

		currentCoordinates = [ nextRow, nextCol ];
	}
}

function addKnownVisibleTree(knownVisibleTrees: KnownVisibleTrees, rowIndex: number, columnIndex: number): void {
	knownVisibleTrees.add(`row${rowIndex}col${columnIndex}`);
}

function determineVisibilityByRow(rows: TreeMapRowString[], knownVisibleTrees: KnownVisibleTrees): KnownVisibleTrees {
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

function determineVisibilityByColumn(rows: TreeMapRowString[], knownVisibleTrees: KnownVisibleTrees): KnownVisibleTrees {
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

function createTreeMapFromInputStrings(treeMapRows: TreeMapRowString[]): TreeMap {
	return treeMapRows.map((treeMapRow) => treeMapRow.split("").map(Number));
}

function determineViewDistance(map: TreeMap, startCoordinates: MapCoordinates, direction: MapTraversalDirection): number {
	const [ startRow, startCol ] = startCoordinates;
	const traversalSteps = getLinearMapTraversalCoordinates(map, direction, startRow, startCol);
	const originTreeHeight = map[startRow][startCol];
	let viewDistance = 0;

	for (let stepCoordinates of traversalSteps) {
		const [ nextRow, nextCol ] = stepCoordinates;

		if (startRow === nextRow && startCol === nextCol) {
			continue; // skipping the first item, because the steps contain the current coordinates - TODO there's probably a more elegant way to do this
		}

		viewDistance++;

		if (map[nextRow][nextCol] >= originTreeHeight) {
			break;
		}
	}

	return viewDistance;
}

function determineScenicScores(treeMap: TreeMap): Map<number> {
	return treeMap.map((treeMapRow, rowIndex) => {
		return treeMapRow.map((_, columnIndex) => {
			const viewDistanceChecker = determineViewDistance.bind(null, treeMap, [ rowIndex, columnIndex ]);

			return (
				viewDistanceChecker("ROW_FORWARD") *
				viewDistanceChecker("ROW_REVERSE") *
				viewDistanceChecker("COL_FORWARD") *
				viewDistanceChecker("COL_REVERSE")
			);
		});
	});
}

function searchForHighestScenicScore(scenicScoresMap: Map<number>): number {
	return scenicScoresMap
		.reduce((highestScore, mapRow) => {
			const highestRowScore = mapRow.reduce((currentHighestRowScore, scenicScore) => {
				return Math.max(currentHighestRowScore, scenicScore);
			}, 0);

			return Math.max(highestScore, highestRowScore);
		}, 0);
}

async function solve(): Promise<string[]> {
	const puzzleInput = await inputHelper.readPuzzleInput(__dirname, "./08-input.txt");

	let knownVisibleTrees = new Set<string>() as KnownVisibleTrees;

	knownVisibleTrees = determineVisibilityByRow(puzzleInput, knownVisibleTrees);
	knownVisibleTrees = determineVisibilityByColumn(puzzleInput, knownVisibleTrees);

	const numberOfVisibleTrees = knownVisibleTrees.size;

	const treeMap = createTreeMapFromInputStrings(puzzleInput);
	const scenicScores = determineScenicScores(treeMap);
	const highestScenicScore = searchForHighestScenicScore(scenicScores);

	return [
		String(numberOfVisibleTrees),
		String(highestScenicScore)
	];
}

export {
	MapCoordinates,
	areCoordinatesInBounds,
	getLinearMapTraversalCoordinates,
	determineVisibilityByRow,
	determineVisibilityByColumn,
	determineViewDistance,
	determineScenicScores,
	searchForHighestScenicScore,
	solve
}
