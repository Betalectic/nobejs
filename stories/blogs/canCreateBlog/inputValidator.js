const getInputFromHttpRequest = () => {};

const validateInput = () => {
  console.log("See if input is valid");
  return true;
};

module.exports = () => {
  return {
    getInputFromHttpRequest: getInputFromHttpRequest,
    validateInput: validateInput,
  };
};
