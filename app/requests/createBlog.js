const validatorBase = require("./base");
const Blog = require("../models").Blog;

const constraints = {
  title: {
    presence: {
      allowEmpty: false,
      message: "^Please enter title",
    },
    type: "string",
    custom_callback: {
      message: "Blog Title should be unique",
      callback: async (req) => {
        let count =
          typeof req.body.name === "string"
            ? await Blog.count({
                where: {
                  name: req.body.name,
                },
              })
            : -1;
        return count === 0 ? true : false;
      },
    },
  },
};

module.exports = (...props) => {
  return validatorBase(constraints, ...props);
};
