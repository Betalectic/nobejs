const validator = nobeRequire("validator");

const getInputFromHttpRequest = () => {};

const validateInput = async (payload) => {
  const constraints = {
    title: {
      presence: {
        allowEmpty: false,
        message: "^Please enter title",
      },
    },
  };

  return validator(payload, constraints);
};

module.exports = {
  getInputFromHttpRequest,
  validateInput,
};
