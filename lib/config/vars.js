const { resolve } = require("path");

const DEFAULT_ENV_FILE_PATH = resolve(process.cwd(), ".env");
const DEFAULT_EXAMPLE_FILE_PATH = resolve(process.cwd(), ".env.example");

module.exports = {
  DEFAULT_ENV_FILE_PATH,
  DEFAULT_EXAMPLE_FILE_PATH,
};
