const blogSerializer = require("./blogSerializer");

module.exports = (req, res, next) => {
  let result = req["nobe"]["blogList"].map((i) => {
    return blogSerializer(i);
  });
  return result;
};
