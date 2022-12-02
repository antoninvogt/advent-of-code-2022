import { Command, InvalidArgumentError } from "commander";

import { padNumber } from "./helpers/output";
import { DailySolution, getAllSolutions, getSolutionForDay } from "./solutions/solutions";

const ERROR_TEXT_FAULTY_DAY = "The day must be given as a number from 1-24.";

function reportSolution(solution: DailySolution) {
	console.log(`---`);
	console.info(`Day ${padNumber(solution.day, 2)} solved in ${solution.solvedInMs}ms`);
	console.log(`Day ${padNumber(solution.day, 2)} solution:`);
	solution.solution.forEach((partialSolution) => console.log(partialSolution));
}

async function reportSolutions(dayString?: string): Promise<void> {
	const day = (dayString !== undefined) ? parseInt(dayString, 10) : undefined;
	const isDayInBounds = (typeof day === "number" && (day >= 1 && day <= 25));
	let solutions: DailySolution[] = [];

	if (day !== undefined && !isDayInBounds) {
		throw new InvalidArgumentError(ERROR_TEXT_FAULTY_DAY);
	} else if (day !== undefined) {
		solutions = [ await getSolutionForDay(day) ];
	} else {
		solutions = await getAllSolutions();
	}

	solutions.forEach(reportSolution);
}

const program = new Command();

program
	.command("solve [day]")
	.description("solve the puzzle for the specified day")
	.action(reportSolutions);

(async () => {
	if (process.env.JEST_WORKER_ID !== undefined || process.env.NODE_ENV === "test") {
		// Temporary hack so this file can be imported in tests without running the entire CLI workflow
		return;
	}

	await program
		.allowUnknownOption()
		.parseAsync(process.argv, { from: "node" });
})();

export {
	ERROR_TEXT_FAULTY_DAY,
	reportSolutions
}
