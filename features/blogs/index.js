const Blog = require("../../database/models").Blog;
const Author = require("../../database/models").Author;
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
