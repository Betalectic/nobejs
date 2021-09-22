const getInputFromHttpRequest = () => {};
const validateInput = () => {};

module.exports = () => {
  return [getInputFromHttpRequest, validateInput];
};

// API:

// authorize -> getInputFromHttpRequest -> validateInput -> handler -> sendResponse

// CMD:

// authorize -> validateInput -> handler
