import * as inputHelper from "../../helpers/input";

const START_OF_PACKAGE_MARKER_LENGTH = 4;

function determineStartOfPacketMarkerPosition(dataStreamBuffer: string): number {
	let runningSubString: string[] = [];
	let endOfMarkerPosition = -1;

	for (let i = 0; i < dataStreamBuffer.length; i++) {
		const character = dataStreamBuffer[i];

		if (runningSubString.includes(character)) {
			const positionOfRecurringCharacter = runningSubString.indexOf(character);

			runningSubString = runningSubString.slice(positionOfRecurringCharacter + 1);
		}

		runningSubString.push(character);

		if (runningSubString.length === START_OF_PACKAGE_MARKER_LENGTH) {
			endOfMarkerPosition = i + 1;

			break;
		}
	}

	return endOfMarkerPosition;
}

async function solve(): Promise<string[]> {
	const puzzleInput = await inputHelper.readPuzzleInput(__dirname, "./06-input.txt");

	const firstStartOfPacketMarker = determineStartOfPacketMarkerPosition(puzzleInput[0]);

	return [
		String(firstStartOfPacketMarker)
	];
}

export {
	determineStartOfPacketMarkerPosition,
	solve
}
