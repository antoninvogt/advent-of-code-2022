import {
	HandsMatch,
	parseMatches,
	calculateIndividualScore,
	calculateTotalScore
} from "./02-solution";

describe("Day 02", () => {
	describe("parseMatches", () => {
		it("should parse the input into matches of rock, paper, scissor hands", () => {
			const input = [
				"A Y",
				"B X",
				"C Z"
			];

			const result = parseMatches(input);

			expect(result).toEqual([
				[ "A", "Y" ],
				[ "B", "X" ],
				[ "C", "Z" ]
			]);
		});
	});

	describe("calculateIndividualScore", () => {
		it("should parse the input into matches of rock, paper, scissor hands", () => {
			const input = [
				[ "A", "Y" ] as HandsMatch,
				[ "B", "X" ] as HandsMatch,
				[ "C", "Z" ] as HandsMatch
			] as HandsMatch[];

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
				[ "A", "Y" ],
				[ "B", "X" ],
				[ "C", "Z" ]
			] as HandsMatch[];

			const result = calculateTotalScore(input);

			expect(result).toEqual(15);
		});
	});
});
