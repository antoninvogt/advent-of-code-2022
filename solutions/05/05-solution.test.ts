import {
	splitPuzzleInput,
	parseInitialShipStacks,
	parseInstruction,
	applyMoveInstructionToStacks,
	readTopContainersLabels
} from "./05-solution";

describe("Day 05", () => {
	describe("splitPuzzleInput", () => {
		it("should split the puzzle input into the block describing the initial stack configuration, and the movement instructions", () => {
			const input = [
				"    [D]    ",
				"[N] [C]    ",
				"[Z] [M] [P]",
				" 1   2   3 ",
				"",
				"move 1 from 2 to 1",
				"move 3 from 1 to 3",
				"move 2 from 2 to 1",
				"move 1 from 1 to 2"
			];

			const result = splitPuzzleInput(input);

			expect(result).toEqual([
				[
					"    [D]    ",
					"[N] [C]    ",
					"[Z] [M] [P]",
					" 1   2   3 ",
				],
				[
					"move 1 from 2 to 1",
					"move 3 from 1 to 3",
					"move 2 from 2 to 1",
					"move 1 from 1 to 2"
				]
			]);
		});
	});

	describe("parseInitialShipStacks", () => {
		it("should turn the string representation of the initial stack configuration into a ShipStacks representation", () => {
			const input = [
				"    [D]    ",
				"[N] [C]    ",
				"[Z] [M] [P]",
				" 1   2   3 "
			];

			const result = parseInitialShipStacks(input);

			expect(result).toEqual([
				[ "Z", "N" ],
				[ "M", "C", "D" ],
				[ "P" ]
			]);
		});
	});

	describe("parseInstruction", () => {
		it("should parse a puzzle input line into a movement instruction", () => {
			const input = [
				"move 1 from 2 to 1",
				"move 3 from 1 to 3",
				"move 2 from 2 to 1",
				"move 1 from 1 to 2"
			];

			const result = input.map(parseInstruction);

			expect(result).toEqual([
				{ fromStackIndex: 1, toStackIndex: 0, numberOfMovedItems: 1 },
				{ fromStackIndex: 0, toStackIndex: 2, numberOfMovedItems: 3 },
				{ fromStackIndex: 1, toStackIndex: 0, numberOfMovedItems: 2 },
				{ fromStackIndex: 0, toStackIndex: 1, numberOfMovedItems: 1 }
			]);
		});
	});

	describe("applyMoveInstructionToStacks", () => {
		it("should mutate the passed ship stacks in place and return the same object that was passed in", () => {
			const shipStacks = [
				[ "Z", "N" ],
				[ "M", "C", "D" ],
				[ "P" ]
			]
			const instruction = { fromStackIndex: 1, toStackIndex: 0, numberOfMovedItems: 1 };
			const initialStackConfigurationReference = [
				[ "Z", "N" ],
				[ "M", "C", "D" ],
				[ "P" ]
			];

			const result = applyMoveInstructionToStacks(shipStacks, instruction);

			expect(result).toBe(shipStacks);
			expect(result).not.toEqual(initialStackConfigurationReference);
		});

		it("should apply the first move as described in the puzzle description", () => {
			const shipStacks = [
				[ "Z", "N" ],
				[ "M", "C", "D" ],
				[ "P" ]
			]
			const instruction = { fromStackIndex: 1, toStackIndex: 0, numberOfMovedItems: 1 };

			const result = applyMoveInstructionToStacks(shipStacks, instruction);

			expect(result).toEqual([
				[ "Z", "N", "D" ],
				[ "M", "C" ],
				[ "P" ]
			]);
		});

		it("should apply the second move as described in the puzzle description", () => {
			const shipStacks = [
				[ "Z", "N", "D" ],
				[ "M", "C" ],
				[ "P" ]
			]
			const instruction = { fromStackIndex: 0, toStackIndex: 2, numberOfMovedItems: 3 };

			const result = applyMoveInstructionToStacks(shipStacks, instruction);

			expect(result).toEqual([
				[],
				[ "M", "C" ],
				[ "P", "D", "N", "Z" ]
			]);
		});

		it("should apply the third move as described in the puzzle description", () => {
			const shipStacks = [
				[],
				[ "M", "C" ],
				[ "P", "D", "N", "Z" ]
			]
			const instruction = { fromStackIndex: 1, toStackIndex: 0, numberOfMovedItems: 2 };

			const result = applyMoveInstructionToStacks(shipStacks, instruction);

			expect(result).toEqual([
				[ "C", "M" ],
				[],
				[ "P", "D", "N", "Z" ]
			]);
		});

		it("should apply the fourth move as described in the puzzle description", () => {
			const shipStacks = [
				[ "C", "M" ],
				[],
				[ "P", "D", "N", "Z" ]
			]
			const instruction = { fromStackIndex: 0, toStackIndex: 1, numberOfMovedItems: 1 };

			const result = applyMoveInstructionToStacks(shipStacks, instruction);

			expect(result).toEqual([
				[ "C" ],
				[ "M" ],
				[ "P", "D", "N", "Z" ]
			]);
		});
	});

	describe("readTopContainersLabels", () => {
		it("should return the concatenated labels of the top-most containers from each stack", () => {
			const input = [
				[ "C" ],
				[ "M" ],
				[ "P", "D", "N", "Z" ]
			];

			const result = readTopContainersLabels(input);

			expect(result).toEqual("CMZ");
		});
	});
});
