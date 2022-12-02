/**
 * Pads a number with leading zeroes to reach the desired number of digits.
 *
 * @param {number|string} number            - The number to be padded
 * @param {number}        [desiredDigits=2] - The number of digits the resulting number format should have
 *
 * @returns {string} - The number in string format, padded with zeroes if necessary
 */
function padNumber(number: number | string, desiredDigits: number = 2): string {
	let paddedNumber = String(number);

	while (paddedNumber.length < desiredDigits) {
		paddedNumber = "0" + paddedNumber;
	}

	return paddedNumber;
}

export {
	padNumber
}
