const resolveUserFromHttpRequest = () => {};
const authorizeUser = () => {
  return true;
};

module.exports = () => {
  return {
    resolveUserFromHttpRequest,
    authorizeUser,
  };
};

// Authorizer basically gets the user and checks if that's valid or not
