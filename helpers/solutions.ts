import { join as joinPath } from "path";
import fs from "fs/promises";

const SOLVER_MODULES_PATH = "../solutions/";
const ERROR_TEXT_DAY_NOT_IMPLEMENTED = "The solver for this day has not been implemented.";

interface SolverModule {
	solve(): Promise<string[]>
}

interface SolverModuleWrapper {
	day: number,
	module: SolverModule
}

type SolverModuleWrappers = SolverModuleWrapper[];

/**
 * Fetches a list of all available solver modules from the ./solutions/ path.
 *
 * @returns {Promise<SolverModuleWrappers>} - a list of all modules found in the directory, annotated with their associated day
 */
async function getSolverModules(): Promise<SolverModuleWrappers> {
	const solverModulesPath = joinPath(__dirname, SOLVER_MODULES_PATH);
	const modulesParentDirectory = await fs.opendir(solverModulesPath);
	const moduleDirectories: any[] = [];

	for await (const file of modulesParentDirectory) {
		if (file.isDirectory()) {
			moduleDirectories.push(file);
		}
	}

	const modules = moduleDirectories.map(async (moduleDirectory) => {
		const pathFragment = moduleDirectory.name;
		const day = parseInt(pathFragment, 10);
		const modulePath = joinPath(solverModulesPath, pathFragment, pathFragment + "-solution.ts");
		const module = await import(modulePath);

		return { day, module };
	});

	return Promise.all(modules);
}

/**
 * Retrieves the solver module for the given day.
 *
 * @param {number} day - the day for which the retrieved module should have the solution
 *
 * @returns {SolverModule} - the module with the solution for the specified day
 */
async function getModuleForDay(day: number): Promise<SolverModule> {
	const solverModules = await getSolverModules();
	const moduleForDay = solverModules.find((module) => module.day === day)?.module;

	if (!moduleForDay) {
		throw new Error(ERROR_TEXT_DAY_NOT_IMPLEMENTED);
	}

	return moduleForDay;
}

export {
	SolverModule,
	SolverModuleWrapper,
	SolverModuleWrappers,
	ERROR_TEXT_DAY_NOT_IMPLEMENTED,
	getSolverModules,
	getModuleForDay
}
