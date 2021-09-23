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

module.exports = async (story, req, res, next) => {
  try {
    const storyContext = requireStory(story);

    const handlerFunctions = Object.keys(storyContext);

    let collectErrors = checkIfThereAreErrorsBeforeRunning(handlerFunctions);

    if (!collectErrors.length) {
      const executionContext = {
        req,
        res,
        next,
        requestBody: req.body,
        requestParams: req.params,
        requestQuery: req.query,
      };
      const user = await storyContext.resolveUserFromHttpRequest(
        executionContext
      );
      const isUserAuthorized = await storyContext.authorizeUser(
        user,
        executionContext
      );

      if (isUserAuthorized) {
        const inputPayload = await storyContext.getInputFromHttpRequest(
          executionContext
        );

        let inputIsValid = await storyContext.validateInput(
          inputPayload,
          executionContext
        );

        if (inputIsValid) {
          const handlerResult = await storyContext.run(
            inputPayload,
            executionContext
          );

          const finalResult = await storyContext.generateOutput(
            handlerResult,
            executionContext
          );

          return finalResult;
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
