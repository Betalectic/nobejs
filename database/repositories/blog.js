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
    payload["created_at"] = new Date().toISOString();
    let blog = await knex("blogs").insert(payload).returning("*");
    return blog[0];
  } catch (error) {
    throw error;
  }
};

module.exports = {
  all,
  createBlog,
};
