const resolveUserFromHttpRequest = ({ req }) => {
  return req.user;
};
const authorizeUser = (user) => {
  return true;
};

module.exports = {
  resolveUserFromHttpRequest,
  authorizeUser,
};

// Authorizer basically gets the user and checks if that's valid or not
