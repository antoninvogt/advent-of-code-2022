import * as inputHelper from "../../helpers/input";

const START_OF_PACKET_MARKER_LENGTH = 4;
const START_OF_MESSAGE_MARKER_LENGTH = 14;

function determineMarkerPosition(markerLength: number, dataStreamBuffer: string): number {
	let runningSubString: string[] = [];
	let endOfMarkerPosition = -1;

	for (let i = 0; i < dataStreamBuffer.length; i++) {
		const character = dataStreamBuffer[i];

		if (runningSubString.includes(character)) {
			const positionOfRecurringCharacter = runningSubString.indexOf(character);

			runningSubString = runningSubString.slice(positionOfRecurringCharacter + 1);
		}

		runningSubString.push(character);

		if (runningSubString.length === markerLength) {
			endOfMarkerPosition = i + 1;

			break;
		}
	}

	return endOfMarkerPosition;
}

async function solve(): Promise<string[]> {
	const puzzleInput = await inputHelper.readPuzzleInput(__dirname, "./06-input.txt");

	const firstStartOfPacketMarker = determineMarkerPosition(START_OF_PACKET_MARKER_LENGTH, puzzleInput[0]);
	const firstStartOfMessageMarker = determineMarkerPosition(START_OF_MESSAGE_MARKER_LENGTH, puzzleInput[0]);

	return [
		String(firstStartOfPacketMarker),
		String(firstStartOfMessageMarker)
	];
}

export {
	START_OF_PACKET_MARKER_LENGTH,
	START_OF_MESSAGE_MARKER_LENGTH,
	determineMarkerPosition,
	solve
}
