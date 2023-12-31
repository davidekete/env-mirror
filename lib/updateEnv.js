const fs = require("fs");
const chokidar = require("chokidar");
const { resolve, basename } = require("path");

const DEFAULT_ENV_FILE_PATH = resolve(process.cwd(), ".env");
const DEFAULT_EXAMPLE_FILE_PATH = resolve(process.cwd(), ".env.example");

/**
 * Reads the contents of the .env file and returns an array of variable names.
 * @returns A set of variable names from the .env file.
 */
const readVariablesFromEnv = (envFilePathArg) => {
  const envFilePath = resolve(process.cwd(), envFilePathArg);

  if (!fs.existsSync(envFilePath)) {
    return new Set();
  }

  const content = fs.readFileSync(envFilePath, "utf8");
  return new Set(
    content
      .split("\n")
      .filter((line) => line.includes("="))
      .map((line) => line.split("=")[0])
  );
};

/**
 * Updates the .env.example file with the variable names from the .env file.
 */
const updateExampleFile = (exampleFilePathArg, envFilePathArg) => {
  const exampleFilePath = resolve(process.cwd(), exampleFilePathArg);
  const envFilePath = resolve(process.cwd(), envFilePathArg);

  // Read variable names from the .env file
  const envVars = readVariablesFromEnv(envFilePath);

  console.log(`Updating ${basename(exampleFilePath)}`);

  const updatedContent = Array.from(envVars)

    .map((varName) => `${varName}=`)
    .join("\n");

  fs.writeFileSync(exampleFilePath, updatedContent);
};

const init = (
  envFilePath = DEFAULT_ENV_FILE_PATH,
  exampleFilePath = DEFAULT_EXAMPLE_FILE_PATH
) => {
  //check if files exist
  if (!fs.existsSync(envFilePath)) {
    console.log(`No .env file found at ${envFilePath}`);
    return;
  }

  if (!fs.existsSync(exampleFilePath)) {
    console.log(`No .env.example file found at ${exampleFilePath}`);
    return;
  }

  const watcher = chokidar.watch(envFilePath, { persistent: true });

  watcher.on("change", () => updateExampleFile(exampleFilePath, envFilePath));

  console.log(`Watching for changes in ${basename(envFilePath)}`);
};

module.exports = init;
