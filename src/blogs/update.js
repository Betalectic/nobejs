const passthru = () => {};

const validate = () => {};

const response = () => {
  return { status: "ok" };
};

const handler = () => {};

const executeSequence = [passthru, validate, handler, response];

module.exports = () => {
  return executeSequence;
};
