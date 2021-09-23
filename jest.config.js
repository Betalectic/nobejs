require("./bootstrap.js");

// Or async function
module.exports = async () => {
  return {
    verbose: true,
    setupFiles: ["./bootstrap.js", "dotenv/config"],
    setupFilesAfterEnv: ["./jest-after.js"],
  };
};
