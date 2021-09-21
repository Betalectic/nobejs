const Blog = require("../../database/models").Blog;
const blogResourceResponse = require("../../app/responses/blogResource");
const validatorBase = require("../../core/baseValidator");
const { Op } = require("sequelize");

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
      custom_callback: {
        message: "Blog Title should be unique",
        callback: async (payload) => {
          if (!payload.title) {
            return true;
          }

          let count =
            typeof payload.title === "string"
              ? await Blog.count({
                  where: {
                    title: payload.title,
                    id: {
                      [Op.not]: req.params.id,
                    },
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
    let payload = req.nobe.passthru;

    let blog = await Blog.findByPk(req.params.id);

    if (!blog) {
      throw {
        message: "Not Found..",
        statusCode: 404,
      };
    }

    blog = await blog.update({
      author_id: payload.author_id || blog.author_id,
      title: payload.title || blog.title,
      excerpt: payload.excerpt || blog.excerpt,
      content: payload.content || blog.content,
    });

    return blog;
  } catch (error) {
    throw error;
  }
};

const executeSequence = [passthru, validate, handler, blogResourceResponse];

module.exports = () => {
  return executeSequence;
};
