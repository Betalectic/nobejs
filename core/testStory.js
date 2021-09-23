const checkIfThereAreErrorsBeforeRunning = (handlerFunctions) => {
  let collectErrors = [];

  if (!handlerFunctions.includes("run")) {
    collectErrors.push({
      issue: "MissingFunction",
      file: "handler.js",
      missing: "run",
    });
  }

  if (!handlerFunctions.includes("authorizeUser")) {
    collectErrors.push({
      issue: "MissingFunction",
      file: "authorizer.js",
      missing: "authorizeUser",
    });
  }

  if (!handlerFunctions.includes("resolveUserFromHttpRequest")) {
    collectErrors.push({
      issue: "MissingFunction",
      file: "authorizer.js",
      missing: "resolveUserFromHttpRequest",
    });
  }

  if (!handlerFunctions.includes("getInputFromHttpRequest")) {
    collectErrors.push({
      issue: "MissingFunction",
      file: "inputValidator.js",
      missing: "getInputFromHttpRequest",
    });
  }

  if (!handlerFunctions.includes("validateInput")) {
    collectErrors.push({
      issue: "MissingFunction",
      file: "inputValidator.js",
      missing: "validateInput",
    });
  }

  return collectErrors;
};

module.exports = async (
  storyName = "blogs/canCreateBlog",
  inputPayload,
  user = {},
  source = "cmd"
) => {
  try {
    const storyContext = requireStory(storyName);

    const handlerFunctions = Object.keys(storyContext);

    let collectErrors = checkIfThereAreErrorsBeforeRunning(handlerFunctions);

    if (!collectErrors.length) {
      const executionContext = {};
      let isUserAuthorized = await storyContext.authorizeUser(user);

      if (isUserAuthorized) {
        let inputIsValid = await storyContext.validateInput(inputPayload);

        if (inputIsValid) {
          return await storyContext.run();
        }
      }
    } else {
      throw {
        errorCode: "MissingFunctionsOrFiles",
        message: "Missing Functions or Files",
        collectErrors,
      };
    }
  } catch (error) {
    return error;
  }
};

// API:

// authorize -> getInputFromHttpRequest -> validateInput -> handler -> sendResponse

// CMD:

// authorize -> validateInput -> handler
