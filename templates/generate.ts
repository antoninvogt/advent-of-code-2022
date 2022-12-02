const { generateTemplateFiles } = require("generate-template-files");

// TODO find a way to use `padNumber` from `./helpers/path.ts` to automatically pad single-digit numbers

(async () => {
	await generateTemplateFiles([
		{
			option: "Set up new day",
			defaultCase: "(kebabCase)",
			entry: {
				folderPath: "./templates/daily-solution/"
			},
			stringReplacers: [
				{ question: "For which day?", slot: "__day__" }
			],
			output: {
				path: "./solutions/__day__/",
				pathAndFileNameDefaultCase: "(kebabCase)",
				overwrite: false
			},
		}
	]);
})();
