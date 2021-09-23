const resolveUserFromHttpRequest = () => {};
const authorizeUser = () => {
  console.log("See if we can authorize user");
  return true;
};

module.exports = () => {
  return {
    resolveUserFromHttpRequest,
    authorizeUser,
  };
};

// Authorizer basically gets the user and checks if that's valid or not
