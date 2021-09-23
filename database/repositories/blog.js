const knex = require("../knex");

const all = async () => {
  try {
    let blogs = await knex.select().table("blogs");
    return blogs;
  } catch (error) {
    throw error;
  } finally {
    knex.destroy();
  }
};

module.exports = {
  all,
};
