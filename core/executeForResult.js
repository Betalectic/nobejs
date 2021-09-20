module.exports = (func, resultKey = "data") => {
  return async (req, res, next) => {
    try {
      console.log(func.name);
      let result = await func.apply(null, [req, res]);
      req.nobe[func.name] = result;
      next();
    } catch (error) {
      next(error);
    }
  };
};
