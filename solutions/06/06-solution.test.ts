import {
	START_OF_PACKET_MARKER_LENGTH,
	START_OF_MESSAGE_MARKER_LENGTH,
	determineMarkerPosition
} from "./06-solution";

describe("Day 06", () => {
	describe("determineMarkerPosition", () => {
		describe("start of packet marker", () => {
			const markerLength = START_OF_PACKET_MARKER_LENGTH;

			it("should determine the appropriate position in the buffer for the first puzzle example", () => {
				const input = "mjqjpqmgbljsphdztnvjfqwrcgsmlb";

				const result = determineMarkerPosition(markerLength, input);

				expect(result).toEqual(7);
			});

			it("should determine the appropriate position in the buffer for the second puzzle example", () => {
				const input = "bvwbjplbgvbhsrlpgdmjqwftvncz";

				const result = determineMarkerPosition(markerLength, input);

				expect(result).toEqual(5);
			});

			it("should determine the appropriate position in the buffer for the third puzzle example", () => {
				const input = "nppdvjthqldpwncqszvftbrmjlhg";

				const result = determineMarkerPosition(markerLength, input);

				expect(result).toEqual(6);
			});

			it("should determine the appropriate position in the buffer for the fourth puzzle example", () => {
				const input = "nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg";

				const result = determineMarkerPosition(markerLength, input);

				expect(result).toEqual(10);
			});

			it("should determine the appropriate position in the buffer for the fifth puzzle example", () => {
				const input = "zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw";

				const result = determineMarkerPosition(markerLength, input);

				expect(result).toEqual(11);
			});
		});

		describe("start of message marker", () => {
			const markerLength = START_OF_MESSAGE_MARKER_LENGTH;

			it("should determine the appropriate position in the buffer for the first puzzle example", () => {
				const input = "mjqjpqmgbljsphdztnvjfqwrcgsmlb";

				const result = determineMarkerPosition(markerLength, input);

				expect(result).toEqual(19);
			});

			it("should determine the appropriate position in the buffer for the second puzzle example", () => {
				const input = "bvwbjplbgvbhsrlpgdmjqwftvncz";

				const result = determineMarkerPosition(markerLength, input);

				expect(result).toEqual(23);
			});

			it("should determine the appropriate position in the buffer for the third puzzle example", () => {
				const input = "nppdvjthqldpwncqszvftbrmjlhg";

				const result = determineMarkerPosition(markerLength, input);

				expect(result).toEqual(23);
			});

			it("should determine the appropriate position in the buffer for the fourth puzzle example", () => {
				const input = "nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg";

				const result = determineMarkerPosition(markerLength, input);

				expect(result).toEqual(29);
			});

			it("should determine the appropriate position in the buffer for the fifth puzzle example", () => {
				const input = "zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw";

				const result = determineMarkerPosition(markerLength, input);

				expect(result).toEqual(26);
			});
		});
	});
});
