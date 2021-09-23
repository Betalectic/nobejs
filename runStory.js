const checkIfThereAreErrorsBeforeRunning = (
  handlerFunctions,
  authorizerFunctions,
  inputValidatorFunctions
) => {
  let collectErrors = [];

  if (!handlerFunctions.includes("run")) {
    collectErrors.push({
      issue: "MissingFunction",
      file: "handler.js",
      missing: "run",
    });
  }

  if (!authorizerFunctions.includes("authorizeUser")) {
    collectErrors.push({
      issue: "MissingFunction",
      file: "authorizer.js",
      missing: "authorizeUser",
    });
  }

  if (!authorizerFunctions.includes("resolveUserFromHttpRequest")) {
    collectErrors.push({
      issue: "MissingFunction",
      file: "authorizer.js",
      missing: "resolveUserFromHttpRequest",
    });
  }

  if (!inputValidatorFunctions.includes("getInputFromHttpRequest")) {
    collectErrors.push({
      issue: "MissingFunction",
      file: "inputValidator.js",
      missing: "getInputFromHttpRequest",
    });
  }

  if (!inputValidatorFunctions.includes("validateInput")) {
    collectErrors.push({
      issue: "MissingFunction",
      file: "inputValidator.js",
      missing: "validateInput",
    });
  }

  return collectErrors;
};

(async (inputPayload, source = "cmd") => {
  try {
    // get the story name
    const storyName = "blogs/canCreateBlog";
    // Check if the story has handler function
    const handlerPath = `./stories/${storyName}/handler.js`;
    const authorizerPath = `./stories/${storyName}/authorizer.js`;
    const inputValidatorPath = `./stories/${storyName}/inputValidator.js`;
    const handlerFunctions = Object.keys(require(handlerPath)());
    const authorizerFunctions = Object.keys(require(authorizerPath)());
    const inputValidatorFunctions = Object.keys(require(inputValidatorPath)());

    console.log(handlerFunctions, authorizerFunctions, inputValidatorFunctions);

    let collectErrors = checkIfThereAreErrorsBeforeRunning(
      handlerFunctions,
      authorizerFunctions,
      inputValidatorFunctions
    );

    if (!collectErrors.length) {
      const executionContext = {};
      // call authorize
      let isUserAuthorized = require(authorizerPath)()["authorizeUser"]();

      if (isUserAuthorized) {
        let inputIsValid = require(inputValidatorPath)()["validateInput"]();

        if (inputIsValid) {
          require(handlerPath)()["run"]();
        }
      }

      // call validateInput
      // call handler
    } else {
      throw {
        errorCode: "MissingFunctionsOrFiles",
        message: "Missing Functions or Files",
        collectErrors,
      };
    }
  } catch (error) {
    if (error.errorCode === "MissingFunctionsOrFiles") {
      error.collectErrors.forEach((e) => {
        console.log(`${e.issue}: ${e.missing} in ${e.file}`);
      });
    } else {
      console.log("Encountered an error with message:", error.message);
    }
  }
})();

// API:

// authorize -> getInputFromHttpRequest -> validateInput -> handler -> sendResponse

// CMD:

// authorize -> validateInput -> handler
