const Blog = require("../../database/models").Blog;

const handler = async (req) => {
  try {
    let blog = await Blog.findByPk(req.params.id);

    if (!blog) {
      throw {
        message: "Not Found..",
        statusCode: 404,
      };
    }

    await blog.destroy();

    return {
      message: "Successfully deleted",
    };
  } catch (error) {
    throw error;
  }
};

const executeSequence = [handler];

module.exports = () => {
  return executeSequence;
};
