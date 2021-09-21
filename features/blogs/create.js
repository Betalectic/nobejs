const Blog = require("../../database/models").Blog;
const blogResourceResponse = require("../../app/responses/blogResource");
const validatorBase = require("../../core/baseValidator");

const passthru = (req) => {
  return {
    author_id: req.body.author_id,
    title: req.body.title,
    excerpt: req.body.excerpt,
    content: req.body.content,
  };
};

const validate = (req) => {
  const constraints = {
    title: {
      presence: {
        allowEmpty: false,
        message: "^Please enter title",
      },
      type: "string",
      custom_callback: {
        message: "Blog Title should be unique",
        callback: async (payload) => {
          let count =
            typeof payload.title === "string"
              ? await Blog.count({
                  where: {
                    title: payload.title,
                  },
                })
              : -1;
          return count === 0 ? true : false;
        },
      },
    },
  };

  return validatorBase(constraints, req.nobe.passthru);
};

const handler = async (req) => {
  try {
    let blog = await Blog.create(req.nobe.passthru);
    return blog;
  } catch (error) {
    throw error;
  }
};

const executeSequence = [passthru, validate, handler, blogResourceResponse];

module.exports = () => {
  return executeSequence;
};
