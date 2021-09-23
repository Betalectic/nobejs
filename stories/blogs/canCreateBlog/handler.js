const Blog = repoRequire("blog");
const { authorizeUser, resolveUserFromHttpRequest } = require("./authorizer");
const { getInputFromHttpRequest, validateInput } = require("./inputValidator");

const execute = async () => {
  // let result = await Blog.all();
  // console.log(result);

  return {
    message: "success",
  };
};

module.exports = {
  run: execute,
  authorizeUser: authorizeUser,
  resolveUserFromHttpRequest: resolveUserFromHttpRequest,
  getInputFromHttpRequest: getInputFromHttpRequest,
  validateInput: validateInput,
};
