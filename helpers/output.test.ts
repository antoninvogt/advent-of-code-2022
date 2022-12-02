import {
	padNumber
} from "./output";

describe("Output Helpers", () => {
	describe("padNumber", () => {
		it("should leave the number as is if it has the desired number of digits", () => {
			const result = padNumber("111", 3);

			expect(result).toEqual("111");
		});

		it("should leave the number as is if it has more than the desired number of digits", () => {
			const result = padNumber(1111, 3);

			expect(result).toEqual("1111");
		});

		it("should leave the number as is if it already has enough leading zeroes", () => {
			const result = padNumber("001", 3);

			expect(result).toEqual("001");
		});

		it("should pad the number with zeroes up to the desired number of digits", () => {
			const result = padNumber(1, 3);

			expect(result).toEqual("001");
		});

		it("should handle number and string inputs equally", () => {
			const resultNumberInput = padNumber(1, 3);
			const resultStringInput = padNumber("1", 3);

			expect(resultNumberInput).toEqual(resultStringInput);
		});

		it("should handle number and string inputs equally, even when no padding needs to happen", () => {
			const resultNumberInput = padNumber(111, 3);
			const resultStringInput = padNumber("111", 3);

			expect(resultNumberInput).toEqual(resultStringInput);
		});

		it("should handle number and string inputs equally when the number has more digits than desired", () => {
			const resultNumberInput = padNumber(1111, 3);
			const resultStringInput = padNumber("1111", 3);

			expect(resultNumberInput).toEqual(resultStringInput);
		});
	});
});
