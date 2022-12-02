import { SolverModule, getModuleForDay, getSolverModules } from "../helpers/solutions";

interface DailySolution {
	day: number
	solution: string[]
	solvedInMs: number
}

async function getSolutionForDay(day: number, module?: SolverModule): Promise<DailySolution> {
	const solverModule = module || await getModuleForDay(day);

	const startTime = Date.now();
	const solution = await solverModule.solve();
	const endTime = Date.now();

	return {
		day,
		solution,
		solvedInMs: endTime - startTime
	};
}

async function getAllSolutions(): Promise<DailySolution[]> {
	const solverModules = await getSolverModules();

	const solutions = solverModules
		.sort((solverModuleA, solverModuleB) => solverModuleA.day - solverModuleB.day)
		.map((solverModule) => {
			return async () => await getSolutionForDay(solverModule.day, solverModule.module)
		});

	// TODO: Find a way to report each individual day on execution for more immediate feedback - right now, it's deferring all results to the end

	return solutions.reduce((solutionsChain, nextSolver) => {
		return solutionsChain.then((solutions) => {
			return nextSolver().then((nextSolution) => [...solutions, nextSolution]);
		});
	}, Promise.resolve([] as DailySolution[]));
}

export {
	DailySolution,
	getSolutionForDay,
	getAllSolutions
}
