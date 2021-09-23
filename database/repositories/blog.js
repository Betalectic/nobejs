const knex = require("../knex");

const all = async () => {
  try {
    let blogs = await knex.select().table("blogs");
    return blogs;
  } catch (error) {
    throw error;
  }
};

const createBlog = async (payload) => {
  try {
    let blog = await knex("blogs").insert(payload);
    return blog;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  all,
  createBlog,
};
