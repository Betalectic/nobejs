require("./bootstrap.js");

module.exports = async () => {
  return {
    verbose: true,
    setupFiles: ["./bootstrap.js", "./jest-setup.js"],
    setupFilesAfterEnv: ["./jest-after.js"],
  };
};
