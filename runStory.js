(async () => {
  try {
    // get the story name
    const storyName = "blogs/canCreateBlog";
    // Check if the story has handler function
    const handlerPath = `./stories/${storyName}/handler.js`;
    const authorizerPath = `./stories/${storyName}/authorizer.js`;
    const inputValidatorPath = `./stories/${storyName}/inputValidator.js`;
    const handlerFunctions = require(handlerPath)().map((f) => f.name);
    const authorizerFunctions = require(authorizerPath)().map((f) => f.name);
    const inputValidatorFunctions = require(inputValidatorPath)().map(
      (f) => f.name
    );

    console.log(handlerFunctions, authorizerFunctions, inputValidatorFunctions);
  } catch (error) {
    console.log("Encountered an error with message:", error.message);
  }
})();
