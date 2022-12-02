import {
	ERROR_TEXT_DAY_NOT_IMPLEMENTED,
	getModuleForDay,
	getSolverModules
} from "./solutions";

// TODO this currently imports and runs the actual modules in the folder - deactivated for the time being to avoid running expensive calculations from the proper daily solutions on each test run
// TODO mock a whole bunch of `fs` methods here, or maybe extract filesystem actions into another module

describe.skip("Solutions Helpers", () => {
	const solverModuleDayOne = { solve: jest.fn() };
	const solverModuleDayTwo = { solve: jest.fn() };

	beforeEach(() => {

	});

	describe("getSolverModules", () => {
		it.skip("should return an annotated list of solver modules", async () => {
			const results = await getSolverModules();

			expect(results).toEqual([
				{ day: 1, module: solverModuleDayOne },
				{ day: 2, module: solverModuleDayTwo }
			]);
		});
	});

	describe("getModuleForDay", () => {
		it.skip("should return the appropriate module for the given day", async () => {
			const day = 2;

			const result = await getModuleForDay(day);

			expect(result).toBe(solverModuleDayTwo);
		});

		it("should raise a helpful error if the targeted module hasn't been implemented yet", async () => {
			const outOfBoundsModuleNumber = 99;

			await expect(async () => {
				await getModuleForDay(outOfBoundsModuleNumber);
			}).rejects.toThrow(ERROR_TEXT_DAY_NOT_IMPLEMENTED);
		});
	});
});
