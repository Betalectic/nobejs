var validate = require("validate.js");

validate.validators.custom_callback = function (
  value,
  options,
  key,
  attributes,
  constraints
) {
  return new validate.Promise(async function (resolve, reject) {
    let result = await options["callback"].apply(null, [
      constraints["payload"],
    ]);

    if (result === true) {
      return resolve();
    }

    return resolve("^" + options["message"]);
  });
};

module.exports = (payload, constraints) => {
  return new Promise((resolve, reject) => {
    try {
      validate
        .async(payload, constraints, {
          payload: payload,
          format: "detailed",
        })
        .then(
          () => {
            resolve({});
          },
          (validateJsErrors) => {
            var response = {
              message: `Validation failed. ${validateJsErrors.length} error(s)`,
            };

            let errors = {};

            validateJsErrors.map((d) => {
              errors[d.attribute] = d.error;
              return d;
            });

            response["statusCode"] = 422;
            response["errors"] = errors;

            reject(response);
          }
        );
    } catch (error) {
      throw error;
    }
  });
};
