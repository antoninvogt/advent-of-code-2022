import {
	splitInputLineIntoCompartments,
	splitIntoGroupsOfThree,
	findSharedItem,
	determinePriority,
	sumUp
} from "./03-solution";

describe("Day 03", () => {
	describe("splitInputLineIntoCompartments", () => {
		it("should split an input line down the middle into two equally large compartments", () => {
			const input = [
				"vJrwpWtwJgWrhcsFMMfFFhFp",
				"jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL",
				"PmmdzqPrVvPwwTWBwg",
				"wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn",
				"ttgJtRGJQctTZtZT",
				"CrZsJsPPZsGzwwsLwLmpwMDw"
			];

			const result = input.map(splitInputLineIntoCompartments);

			expect(result).toEqual([
				[ "vJrwpWtwJgWr", "hcsFMMfFFhFp" ],
				[ "jqHRNqRjqzjGDLGL", "rsFMfFZSrLrFZsSL" ],
				[ "PmmdzqPrV", "vPwwTWBwg" ],
				[ "wMqvLMZHhHMvwLH", "jbvcjnnSBnvTQFn" ],
				[ "ttgJtRGJ", "QctTZtZT" ],
				[ "CrZsJsPPZsGz", "wwsLwLmpwMDw" ]
			]);
		});
	});

	describe("splitIntoGroupsOfThree", () => {
		it("should split the puzzle input into groups of three", () => {
			const input = [
				"vJrwpWtwJgWrhcsFMMfFFhFp",
				"jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL",
				"PmmdzqPrVvPwwTWBwg",
				"wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn",
				"ttgJtRGJQctTZtZT",
				"CrZsJsPPZsGzwwsLwLmpwMDw"
			];

			const result = splitIntoGroupsOfThree(input);

			expect(result).toEqual([
				[
					"vJrwpWtwJgWrhcsFMMfFFhFp",
					"jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL",
					"PmmdzqPrVvPwwTWBwg",
				],
				[
					"wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn",
					"ttgJtRGJQctTZtZT",
					"CrZsJsPPZsGzwwsLwLmpwMDw"
				]
			]);
		});
	});

	describe("findSharedItem", () => {
		it("should find the item that is located in both the left and the right compartment", () => {
			const input = [
				[ "vJrwpWtwJgWr", "hcsFMMfFFhFp" ],
				[ "jqHRNqRjqzjGDLGL", "rsFMfFZSrLrFZsSL" ],
				[ "PmmdzqPrV", "vPwwTWBwg" ],
				[ "wMqvLMZHhHMvwLH", "jbvcjnnSBnvTQFn" ],
				[ "ttgJtRGJ", "QctTZtZT" ],
				[ "CrZsJsPPZsGz", "wwsLwLmpwMDw" ]
			];

			const result = input.map(findSharedItem);

			expect(result).toEqual([
				"p",
				"L",
				"P",
				"v",
				"t",
				"s"
			]);
		});

		it("should find the item that is shared in three elves' backpacks", () => {
			const input = [
				[ "vJrwpWtwJgWrhcsFMMfFFhFp", "jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL", "PmmdzqPrVvPwwTWBwg" ],
				[ "wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn", "ttgJtRGJQctTZtZT", "CrZsJsPPZsGzwwsLwLmpwMDw" ],
				[ "abc", "dbc", "efc" ]
			];

			const result = input.map(findSharedItem);

			expect(result).toEqual([
				"r",
				"Z",
				"c"
			]);
		});
	});

	describe("determinePriority", () => {
		it("should determine the priority of the specified item", () => {
			const input = [
				"p",
				"L",
				"P",
				"v",
				"t",
				"s"
			];

			const result = input.map(determinePriority);

			expect(result).toEqual([
				16,
				38,
				42,
				22,
				20,
				19
			]);
		});
	});

	describe("sumUp", () => {
		it("should return the sum of a list of numbers", () => {
			const input = [
				16,
				38,
				42,
				22,
				20,
				19
			];

			const result = sumUp(input);

			expect(result).toEqual(157);
		});
	});
});
