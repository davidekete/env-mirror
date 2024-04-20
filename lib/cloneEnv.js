const fs = require("fs");
const chokidar = require("chokidar");
const {
  DEFAULT_ENV_FILE_PATH,
  DEFAULT_EXAMPLE_FILE_PATH,
} = require("./config/vars");
const { readVariablesFromEnv, updateExampleFile } = require("./updateEnv");

/**
 * Clones the .env file to the .env.example file and watches for changes in the .env file.
 * @optional {string} envFilePath - The path to the .env file.
 * @optional {string} envExampleFilePath - The path to the .env.example file.
 * @returns {void}
 */
const cloneEnv = (envFilePath, envExampleFilePath) => {
  //Read contents of the .env file
  const envVars = readVariablesFromEnv(envFilePath);

  if (envVars.size === 0) {
    console.log(`No variables found in ${envFilePath}`);
    return;
  }

  //check if envExampleFilePath is exists, create one if it doesn't exist
  if (!fs.existsSync(envExampleFilePath)) {
    console.log(
      `No .env.example file found at ${envExampleFilePath}, Creating one for you :)...`
    );
  }

  updateExampleFile(envExampleFilePath, envFilePath);

  //watch for changes in the .env file
  const watcher = chokidar.watch(envFilePath);

  watcher.on("change", () => {
    updateExampleFile(envExampleFilePath, envFilePath);
  });

  console.log(`Watching for changes in ${envFilePath}`);
};

module.exports = cloneEnv;
