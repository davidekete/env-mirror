#!/usr/bin/env node
const { program } = require("commander");
const init = require("../lib/updateEnv");

program
  .command("init")
  .description("Start watching for changes in the .env file")
  .action(() => init());

program
  .command("initialize")
  .description("Start watching for changes in specified file paths")
  .option("-e, --env <envFilePath>", "Path to the .env file")
  .option("-x, --example <exampleFilePath>", "Path to the .env.example file")
  .action(() => {
    const options = program.opts();
    return init(options.env, options.example);
  });

program.parse(process.argv);
