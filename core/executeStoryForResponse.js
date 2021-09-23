const runStory = require("./runStory");

module.exports = (story) => {
  return async (req, res, next) => {
    try {
      let result = await runStory(story, req, res, next);
      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  };
};
