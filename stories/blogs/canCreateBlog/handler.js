const Blog = repoRequire("blog");

const run = async () => {
  // let result = await Blog.all();
  // console.log(result);

  return {
    message: "success",
  };
};

module.exports = () => {
  return {
    run: run,
  };
};
