import {
	splitInputLineIntoCompartments,
	findFalselyDistributedItem,
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

			expect(result).toEqual(expect.arrayContaining([
				[ "vJrwpWtwJgWr", "hcsFMMfFFhFp" ],
				[ "jqHRNqRjqzjGDLGL", "rsFMfFZSrLrFZsSL" ],
				[ "PmmdzqPrV", "vPwwTWBwg" ],
				[ "wMqvLMZHhHMvwLH", "jbvcjnnSBnvTQFn" ],
				[ "ttgJtRGJ", "QctTZtZT" ],
				[ "CrZsJsPPZsGz", "wwsLwLmpwMDw" ]
			]));
		});
	});

	describe("findFalselyDistributedItem", () => {
		it("should find the item that is located in both the left and the right compartment", () => {
			const input = [
				[ "vJrwpWtwJgWr", "hcsFMMfFFhFp" ],
				[ "jqHRNqRjqzjGDLGL", "rsFMfFZSrLrFZsSL" ],
				[ "PmmdzqPrV", "vPwwTWBwg" ],
				[ "wMqvLMZHhHMvwLH", "jbvcjnnSBnvTQFn" ],
				[ "ttgJtRGJ", "QctTZtZT" ],
				[ "CrZsJsPPZsGz", "wwsLwLmpwMDw" ]
			];

			const result = input.map(findFalselyDistributedItem);

			expect(result).toEqual([
				"p",
				"L",
				"P",
				"v",
				"t",
				"s"
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
