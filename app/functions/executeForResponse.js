module.exports = (func) => {
  return async (req, res, next) => {
    try {
      let result = await func.apply(null, [req, res]);
      return res.status(res.statusCode || 200).send(result);
    } catch (error) {
      next(error);
    }
  };
};
