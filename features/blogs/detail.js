const Blog = modelRequire("Blog");
const Author = modelRequire("Author");
const blogResourceResponse = require("../../app/responses/blogResource");

const handler = async (req) => {
  try {
    let blog = await Blog.findByPk(req.params.id, {
      include: [
        {
          model: Author,
          as: "author",
        },
      ],
    });
    if (!blog) {
      throw {
        message: "Not Found",
        statusCode: 404,
      };
    }
    return blog;
  } catch (error) {
    throw error;
  }
};

const executeSequence = [handler, blogResourceResponse];

module.exports = () => {
  return executeSequence;
};
