import * as solutions from "./solutions/solutions";

import { reportSolutions, ERROR_TEXT_FAULTY_DAY } from "./index";

jest.mock("./helpers/solutions");
import { getSolverModules, getModuleForDay, SolverModule, SolverModuleWrapper, SolverModuleWrappers } from "./helpers/solutions";

describe("CLI", () => {
	const dayOneMockResult = [ "something something 1" ];
	const dayTwoMockResult = [ "something something 2" ];

	const dayOneMockModule = { solve: jest.fn().mockResolvedValue(dayOneMockResult) };
	const dayTwoMockModule = { solve: jest.fn().mockResolvedValue(dayTwoMockResult) };

	(getSolverModules as jest.MockedFunction<typeof getSolverModules>).mockResolvedValue([
		{ day: 1, module: dayOneMockModule },
		{ day: 2, module: dayTwoMockModule }
	]);

	(getModuleForDay as jest.MockedFunction<typeof getModuleForDay>).mockImplementation(async (day) => {
		return (day === 1) ? dayOneMockModule : dayTwoMockModule;
	})

	beforeEach(() => {
		dayOneMockModule.solve.mockClear();
		dayTwoMockModule.solve.mockClear();
	});

	describe("reportSolutions", () => {
		let consoleLogSpy = jest.spyOn(console, "log");

		beforeEach(() => {
			consoleLogSpy.mockClear();
		});

		afterAll(() => {
			consoleLogSpy.mockRestore();
		});

		it("should attempt to solve the given day", async () => {
			const argument = "1";

			await reportSolutions(argument);

			expect(dayOneMockModule.solve).toHaveBeenCalled();
		});

		it("should attempt to solve all days if no specific day was specified", async () => {
			await reportSolutions();

			expect(dayOneMockModule.solve).toHaveBeenCalled();
			expect(dayTwoMockModule.solve).toHaveBeenCalled();
		});

		it("should report the solution via the console", async () => {
			const argument = "1";

			await reportSolutions(argument);

			// TODO get rid of nthCalledWith
			// TODO test reporting of multiple results
			expect(consoleLogSpy).toHaveBeenNthCalledWith(2, "Day 01 solution:");
			expect(consoleLogSpy).toHaveBeenNthCalledWith(3, dayOneMockResult[0]);
		});

		it("should raise a helpful exception if nonsense was given as the day", async () => {
			const faultyArgument = "abc";

			await expect(async () => {
				await reportSolutions(faultyArgument);
			}).rejects.toThrow(ERROR_TEXT_FAULTY_DAY);
		});

		it.skip("should raise a helpful exception if a non-integer number was given as the day", async () => {
			// Let's skip this for now and instead silently pick the integer parsed from the float
			// We'll log to the console which day is actually chosen

			const faultyArgument = "12.21";

			await expect(async () => {
				await reportSolutions(faultyArgument);
			}).rejects.toThrow(ERROR_TEXT_FAULTY_DAY);
		});

		it("should raise a helpful exception if a day lower than 1 was given", async () => {
			const faultyArgument = "0";

			await expect(async () => {
				await reportSolutions(faultyArgument);
			}).rejects.toThrow(ERROR_TEXT_FAULTY_DAY);
		});

		it("should raise a helpful exception if a day after the 25th was given", async () => {
			const faultyArgument = "26";

			await expect(async () => {
				await reportSolutions(faultyArgument);
			}).rejects.toThrow(ERROR_TEXT_FAULTY_DAY);
		});
	});
});
