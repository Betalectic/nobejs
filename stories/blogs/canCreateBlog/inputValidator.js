const validator = nobeRequire("validator");
const pickKeysFromObject = requireUtil("pickKeysFromObject");

const getInputFromHttpRequest = ({ requestBody }) => {
  return pickKeysFromObject(requestBody, ["title"]);
};

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
