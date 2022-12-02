# Antonin's Advent of Code 2022 Solutions #

Solutions to the 2022 Advent of Code challenge - https://adventofcode.com/2022

## Running ##

To get the solution for a particular day, run `npm solve <day>`.

```shell
$ npm run solve 6
```

## Adding Solutions ##

### Auto-Generating a New Day ###

To add the scaffolding for a solution, run

```shell
$ npm run bootstrap-solution
```

Choose "Set up new day", and when asked "For which day?", provide the number of the day (in two-digit format).

Then add the puzzle input from the website to `<day>-input.txt` and start solving stuff.


### File Structure ###

Solutions are stored in `./solutions/<day>`, where `<day>` is the day for which the solution is created. This must be a two-digit figure.

This directory must have a file named `<day>-solutions.ts`, which exports the expected solver function (see "Module Structure" below).

Both of these naming schemes are mandatory, as they are used by the CLI's module runner to find the appropriate module for the specified day.

Optionally, add the input for the day's puzzle here. For the sake of consistency, name it `<day>-input.txt`.

```
- solutions/
    +- 01/
        +- 01-input.txt
        +- 01-solution.test.ts
        +- 01-solution.ts
    +- 02/
        +- 02-input.txt
        +- 02-solution.test.ts
        +- 02-solution.ts
```

### Module Structure ###

A module must export a `solve` function, which resolves with the solution to the day's puzzle, in the form of a `string` tuple (for parts 1 and 2 of each day).

Use the input helper to read and parse the day's input file.

```typescript
import * as inputHelper from "../../helpers/input";

async function solve(): Promise<string> {
    const puzzleInput = await inputHelper.readPuzzleInput(__dirname, "./01-input.txt");

    // do stuff

    return [
        "<the solution to part 1>",
        "<the solution to part 2>"
    ];
}

export {
	solve
}
```


## Testing ##

To run unit tests, run

```shell
npm test
```

To collect code coverage metrics, run

```shell
npm test:coverage
```

The HTML coverage report will land in `./coverage/lcov-report/index.html`.

### Adding Tests ###

Any file ending on `**.test.ts` will be picked up by the test runner.
