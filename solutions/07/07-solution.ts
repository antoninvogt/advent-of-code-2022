import * as inputHelper from "../../helpers/input";

type ConsoleCommandAndOutput = string[];

interface IFSEntity {
	name: string
	pwd?: IFSEntity
	size?: number
	getSize: () => number
}

interface IDirectory extends IFSEntity {
	children: FSEntity[]
	findRoot: () => IDirectory
	addChild: (childToAdd: FSEntity) => void
	getSize: () => number
}

interface IFile extends IFSEntity {
	size: number
	getSize: () => number
}

class FSEntity implements IFSEntity {
	name: string;
	pwd?: IDirectory;
	size?: number;

	constructor(name: string, pwd?: IDirectory, size?: number) {
		this.name = name;
		this.pwd = pwd;
		this.size = size;
	}

	getSize() {
		return -1;
	}
}

class Directory extends FSEntity implements IDirectory {
	name: string
	pwd?: IDirectory
	children: FSEntity[] = [];

	constructor(name: string, pwd?: IDirectory) {
		super(name, pwd);

		this.name = name;
		this.pwd = pwd;
	}

	findRoot(): IDirectory {
		return this.pwd?.findRoot() || this;
	}

	addChild(childToAdd: FSEntity): void {
		this.children.push(childToAdd);
	}

	getSize(): number {
		return this.children.reduce((totalSize, nextChild) => totalSize + nextChild.getSize(), 0);
	}
}

class File extends FSEntity {
	constructor(name: string, pwd: IDirectory, size: number) {
		super(name, pwd, size);

		this.name = name;
		this.pwd = pwd;
		this.size = size;
	}

	getSize() {
		return this.size as number; // TODO figure out what the deal is with making an inherited optional property mandatory, and get rid of this cast
	}
}

function parseOutputStatementChunksFromInput(puzzleInput: string[]): ConsoleCommandAndOutput[] {
	return puzzleInput.reduce((consoleCommmandsAndOutputs, nextLine) => {
		const isCommand = nextLine.startsWith("$");

		if (isCommand) {
			consoleCommmandsAndOutputs.push([]);
		}

		consoleCommmandsAndOutputs[consoleCommmandsAndOutputs.length - 1].push(nextLine);

		return consoleCommmandsAndOutputs;
	}, [] as ConsoleCommandAndOutput[]);
}

function createFSEntityFromOutputLine(pwd: IDirectory, lsOutputLine: string): FSEntity {
	const [ dirOrSize, name ] = lsOutputLine.split(" ");

	if (dirOrSize === "dir") {
		return new Directory(name, pwd);
	} else {
		return new File(name, pwd, parseInt(dirOrSize, 10));
	}
}

function traverseTree(currentPwd: IDirectory, cdCommand: string): IDirectory {
	const target = cdCommand.split(" ")[2];

	if (target === "..") {
		return currentPwd.pwd as IDirectory; // cop out, assuming the puzzle input will never ask us to go up from root
	} else if (target === "/") {
		return currentPwd.findRoot();
	} else {
		return currentPwd.children.find((child) => child.name === target) as IDirectory; // again, cop out assuming there will always be a file of the given name in the parent directory
	}
}

function buildFileTree(consoleCommandsAndOutputs: ConsoleCommandAndOutput[]): Directory {
	const fileTreeRoot = new Directory("/");

	(function applyOneConsoleCommand(pwd: IDirectory, consoleCommandsAndOutputs: ConsoleCommandAndOutput[]): IDirectory {
		if (!consoleCommandsAndOutputs.length) {
			return pwd;
		}

		const [ command, ...outputs ] = consoleCommandsAndOutputs[0];
		const remainingCommandsAndOutputs = consoleCommandsAndOutputs.slice(1);

		if (command === "$ ls") {
			outputs
				.map((outputLine) => createFSEntityFromOutputLine(pwd, outputLine))
				.forEach((child) => pwd.addChild(child));
		} else if (command.startsWith("$ cd")) {
			pwd = traverseTree(pwd, command);
		}

		return applyOneConsoleCommand(pwd, remainingCommandsAndOutputs);
	}(fileTreeRoot, consoleCommandsAndOutputs.slice(1)));

	return fileTreeRoot;
}

function findDirectories(rootDir: IDirectory): IDirectory[] {
	return (function grabDirsRecursively(directory: IDirectory): IDirectory[] {
		const childDirectories = directory.children.filter((entity) => entity instanceof Directory) as IDirectory[];

		if (childDirectories.length === 0) {
			return [ directory ];
		}

		const recursiveChildDirectories = childDirectories
			.map(grabDirsRecursively)
			.reduce((allDirectories, nestedDirectoriesList) => allDirectories.concat(nestedDirectoriesList), [] as IDirectory[]);

		return [ directory ].concat(recursiveChildDirectories);
	}(rootDir));
}

function isWithinSizeLimit(directory: IDirectory): boolean {
	const MAXIMUM_SIZE = 100000;

	return (directory.getSize() <= MAXIMUM_SIZE);
}

function addDirectorySizeOntoTotal(runningTotal: number, directory: IDirectory): number {
	return runningTotal + directory.getSize();
}

async function solve(): Promise<string[]> {
	const puzzleInput = await inputHelper.readPuzzleInput(__dirname, "./07-input.txt");

	const consoleCommandsAndOutputs = parseOutputStatementChunksFromInput(puzzleInput);
	const fileTree = buildFileTree(consoleCommandsAndOutputs);
	const directoriesWithinSizeLimitTotalSize = findDirectories(fileTree)
		.filter(isWithinSizeLimit)
		.reduce(addDirectorySizeOntoTotal, 0);

	return [
		String(directoriesWithinSizeLimitTotalSize)
	];
}

export {
	Directory,
	File,
	parseOutputStatementChunksFromInput,
	buildFileTree,
	findDirectories,
	isWithinSizeLimit,
	addDirectorySizeOntoTotal,
	solve
}
