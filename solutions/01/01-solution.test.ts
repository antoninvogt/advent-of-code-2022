import {
	determineMergedCalories,
	determineHighestCalories
} from "./01-solution";

describe("Day 01", () => {
	describe("determineMergedCalories", () => {
		it("should do turn a list of meals into aggregated calory numbers for each elf", () => {
			const input = [
				"1000",
				"2000",
				"3000",
				"",
				"4000",
				"",
				"5000",
				"6000",
				"",
				"7000",
				"8000",
				"9000",
				"",
				"10000"
			];

			const result = determineMergedCalories(input);

			expect(result).toEqual([
				6000,
				4000,
				11000,
				24000,
				10000
			]);
		});
	});

	describe("determineHighestCalories", () => {
		it("should pick the highest item from the list of calories", () => {
			const input = [
				6000,
				4000,
				11000,
				24000,
				10000
			];

			const result = determineHighestCalories(input);

			expect(result).toEqual(24000);
		});
	});
});
