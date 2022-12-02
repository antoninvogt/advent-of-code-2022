import {
	determineMergedCalories,
	sortCalories,
	determineHighestCaloriesOnSingleElf,
	determineHighestCaloriesOnMultipleElves
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

	describe("sortCalories", () => {
		it("should sort the calories in descending order", () => {
			const input = [
				6000,
				4000,
				11000,
				24000,
				10000
			];

			const result = sortCalories(input);

			expect(result).toEqual([
				24000,
				11000,
				10000,
				6000,
				4000
			]);
		});
	});

	describe("determineHighestCaloriesOnSingleElf", () => {
		it("should pick should pick the highest item from the list of calories", () => {
			const input = [
				24000,
				11000,
				10000,
				6000,
				4000
			];

			const result = determineHighestCaloriesOnSingleElf(input);

			expect(result).toEqual(24000);
		});
	});

	describe("determineHighestCaloriesOnMultipleElves", () => {
		it("should sum up the calories of the most loaded three elves", () => {
			const input = [
				24000,
				11000,
				10000,
				6000,
				4000
			];

			const result = determineHighestCaloriesOnMultipleElves(input);

			expect(result).toEqual(45000);
		});
	});
});
