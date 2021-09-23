// const Blog = modelRequire("Blog");
const Author = modelRequire("Author");
const Blog = repoRequire("blog");

const blogCollectionResponse = require("../../app/responses/blogCollection");

const blogList = async () => {
  try {
    let blogs = await Blog.all();
    return blogs;
  } catch (error) {
    throw error;
  }
};

module.exports = () => {
  return [blogList, blogCollectionResponse];
};
