module.exports = (func, resultKey = "data") => {
  return async (req, res, next) => {
    try {
      let result = await func.apply(null, [req, res, next]);
      req.nobe[func.name] = result;
      next();
    } catch (error) {
      next(error);
    }
  };
};
