const Blog = repoRequire("blog");
const { authorizeUser, resolveUserFromHttpRequest } = require("./authorizer");
const { getInputFromHttpRequest, validateInput } = require("./inputValidator");
const { generateOutput } = require("./sendResponse");

const execute = async (payload) => {
  console.log("payload", payload);
  let result = await Blog.createBlog(payload);
  return result;
};

module.exports = {
  run: execute,
  authorizeUser: authorizeUser,
  resolveUserFromHttpRequest: resolveUserFromHttpRequest,
  getInputFromHttpRequest: getInputFromHttpRequest,
  validateInput: validateInput,
  generateOutput: generateOutput,
};
