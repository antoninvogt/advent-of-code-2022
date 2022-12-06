import {
	determineStartOfPacketMarkerPosition
} from "./06-solution";

describe("Day 06", () => {
	describe("determineStartOfPacketMarkerPosition", () => {
		it("should determine the appropriate position in the buffer for the first puzzle example", () => {
			const input = "mjqjpqmgbljsphdztnvjfqwrcgsmlb";

			const result = determineStartOfPacketMarkerPosition(input);

			expect(result).toEqual(7);
		});

		it("should determine the appropriate position in the buffer for the second puzzle example", () => {
			const input = "bvwbjplbgvbhsrlpgdmjqwftvncz";

			const result = determineStartOfPacketMarkerPosition(input);

			expect(result).toEqual(5);
		});

		it("should determine the appropriate position in the buffer for the third puzzle example", () => {
			const input = "nppdvjthqldpwncqszvftbrmjlhg";

			const result = determineStartOfPacketMarkerPosition(input);

			expect(result).toEqual(6);
		});

		it("should determine the appropriate position in the buffer for the fourth puzzle example", () => {
			const input = "nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg";

			const result = determineStartOfPacketMarkerPosition(input);

			expect(result).toEqual(10);
		});

		it("should determine the appropriate position in the buffer for the fifth puzzle example", () => {
			const input = "zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw";

			const result = determineStartOfPacketMarkerPosition(input);

			expect(result).toEqual(11);
		});
	});
});
