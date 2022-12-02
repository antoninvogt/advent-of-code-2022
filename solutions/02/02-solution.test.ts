import {
	MatchInstruction,
	ShapeMatch,
	parseMatchInstructions,
	pickOwnHandBasedOnPartOneMapping,
	pickOwnHandBasedOnOutcomeInstruction,
	calculateIndividualScore,
	calculateTotalScore
} from "./02-solution";

describe("Day 02", () => {
	describe("parseMatchInstructions", () => {
		it("should parse the input into match instructions", () => {
			const input = [
				"A Y",
				"B X",
				"C Z"
			];

			const result = parseMatchInstructions(input);

			expect(result).toEqual([
				[ "A", "Y" ],
				[ "B", "X" ],
				[ "C", "Z" ]
			]);
		});
	});

	describe("pickOwnHandBasedOnPartOneMapping", () => {
		it("should pick the own hand based on the assumption stated in part one", () => {
			const input = [
				[ "A", "Y" ],
				[ "B", "X" ],
				[ "C", "Z" ]
			] as MatchInstruction[];

			const result = input.map(pickOwnHandBasedOnPartOneMapping);

			expect(result).toEqual([
				[ "A", "B" ],
				[ "B", "A" ],
				[ "C", "C" ]
			]);
		});
	});

	describe("pickOwnHandBasedOnOutcomeInstruction", () => {
		it("should pick the own hand based on the assumption stated in part one", () => {
			const input = [
				[ "A", "Y" ],
				[ "B", "X" ],
				[ "C", "Z" ]
			] as MatchInstruction[];

			const result = input.map(pickOwnHandBasedOnOutcomeInstruction);

			expect(result).toEqual([
				[ "A", "A" ],
				[ "B", "A" ],
				[ "C", "A" ]
			]);
		});
	});

	describe("calculateIndividualScore", () => {
		it("should parse the input into matches of rock, paper, scissor hands", () => {
			const input = [
				[ "A", "B" ],
				[ "B", "A" ],
				[ "C", "C" ]
			] as ShapeMatch[];

			const result = input.map(calculateIndividualScore);

			expect(result).toEqual([
				8,
				1,
				6
			]);
		});
	});

	describe("calculateTotalScore", () => {
		it("should parse the input into matches of rock, paper, scissor hands", () => {
			const input = [
				[ "A", "B" ],
				[ "B", "A" ],
				[ "C", "C" ]
			] as ShapeMatch[];

			const result = calculateTotalScore(input);

			expect(result).toEqual(15);
		});
	});
});
