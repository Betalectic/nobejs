const run = () => {
  console.log("run the function");
};

module.exports = () => {
  return {
    run: run,
  };
};
