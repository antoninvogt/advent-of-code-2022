import * as inputHelper from "../../helpers/input";

type Stack = string[];
type ShipStacks = Stack[];
interface MoveInstruction {
	fromStackIndex: number;
	toStackIndex: number;
	numberOfMovedItems: number;
}

function splitPuzzleInput(wholePuzzleInput: string[]): string[][] {
	const separatingWhiteline = wholePuzzleInput.indexOf("");

	return [ wholePuzzleInput.slice(0, separatingWhiteline), wholePuzzleInput.slice(separatingWhiteline + 1) ];
}

function parseInitialShipStacks(puzzleInputStartBlock: string[]): ShipStacks {
	const CONTAINER_REPRESENTATION_WIDTH = "[X]".length;
	const STACK_SEPARATOR_WIDTH = " ".length;
	const trimmedStacksRepresentation = puzzleInputStartBlock.slice(0, -1);

	const shipsStacks: ShipStacks = [];

	while (trimmedStacksRepresentation.length) {
		const bottomMostStackLayer = trimmedStacksRepresentation.pop() as string; // TODO why does TS think this can be undefined, given the guard?

		for (let i = 0, stackIndex = 0; i < bottomMostStackLayer.length; i += (CONTAINER_REPRESENTATION_WIDTH + STACK_SEPARATOR_WIDTH), stackIndex++) {
			const labelIndex = i + 1; // format: "[X] "
			const containerLabel = bottomMostStackLayer[labelIndex]

			if (!shipsStacks[stackIndex]) {
				shipsStacks.push([]);
			}

			if (containerLabel !== " ") {
				shipsStacks[stackIndex].push(containerLabel);
			}
		}
	}

	return shipsStacks;
}

function parseInstruction(puzzleInputLine: string): MoveInstruction {
	const [ move, numberOfMovedItems, from, fromStackLabel, to, toStackLabel ] = puzzleInputLine.split(" ");

	return {
		fromStackIndex: parseInt(fromStackLabel, 10) - 1,
		toStackIndex: parseInt(toStackLabel, 10) - 1,
		numberOfMovedItems: parseInt(numberOfMovedItems, 10)
	};
}

function applyMoveInstructionToStacks(shipStacks: ShipStacks, instruction: MoveInstruction): ShipStacks {
	const { fromStackIndex, toStackIndex, numberOfMovedItems } = instruction;

	for (let i = 0; i < numberOfMovedItems; i++) {
		shipStacks[toStackIndex].push(shipStacks[fromStackIndex].pop() as string); // casting here as an easy way out of `undefined` checks, trusting that puzzle instructions will always be valid
	}

	return shipStacks;
}

function readTopContainersLabels(shipStacks: ShipStacks): string {
	let concatenatedContainerLabels = "";

	for (let shipStack of shipStacks) {
		const topMostItem = shipStack[shipStack.length - 1];

		concatenatedContainerLabels += topMostItem;
	}

	return concatenatedContainerLabels;
}

async function solve(): Promise<string[]> {
	const puzzleInput = await inputHelper.readPuzzleInputPreservingWhiteLines(__dirname, "./05-input.txt");

	const puzzleInputParts = splitPuzzleInput(puzzleInput);
	const shipStacks = parseInitialShipStacks(puzzleInputParts[0]);
	const moveInstructions = puzzleInputParts[1].map(parseInstruction);

	moveInstructions.map(applyMoveInstructionToStacks.bind(null, shipStacks));

	const topContainerLabels = readTopContainersLabels(shipStacks);

	return [
		topContainerLabels
	];
}

export {
	splitPuzzleInput,
	parseInitialShipStacks,
	parseInstruction,
	applyMoveInstructionToStacks,
	readTopContainersLabels,
	solve
}
