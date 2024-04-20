#!/usr/bin/env node
const { program } = require("commander");
const { init } = require("../lib/updateEnv");
const cloneEnv = require("../lib/cloneEnv");
const {
  DEFAULT_ENV_FILE_PATH,
  DEFAULT_EXAMPLE_FILE_PATH,
} = require("../lib/config/vars");

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

program
  .command("clone")
  .description("Clone the .env file to the .env.example file")
  .option(
    "-e, --env <envFilePath>",
    "Path to the .env file",
    DEFAULT_ENV_FILE_PATH
  )
  .option(
    "-x, --example <exampleFilePath>",
    "Path to the .env.example file",
    DEFAULT_EXAMPLE_FILE_PATH
  )
  .action(() => {
    const options = program.opts();
    return cloneEnv(options.env, options.example);
  });

program.parse(process.argv);
