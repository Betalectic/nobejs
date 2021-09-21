const Blog = modelRequire("Blog");
const Author = modelRequire("Author");
const blogCollectionResponse = require("../../app/responses/blogCollection");

const blogList = async () => {
  try {
    let blogs = await Blog.findAll({
      include: [
        {
          model: Author,
          as: "author",
        },
      ],
    });
    return blogs;
  } catch (error) {
    throw error;
  }
};

const executeSequence = [blogList, blogCollectionResponse];

module.exports = () => {
  return executeSequence;
};
