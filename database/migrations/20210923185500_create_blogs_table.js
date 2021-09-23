exports.up = function (knex) {
  return knex.schema
    .createTable("blogs", function (table) {
      table.increments("id");
      table.string("title", 255).notNullable();
      table.string("excerpt", 255);
      table.integer("author_id");
      table.text("content");
      table.datetime("created_at", { useTz: false });
      table.datetime("updated_at", { useTz: false });
    })
    .createTable("authors", function (table) {
      table.increments("id");
      table.string("name", 255).notNullable();
      table.datetime("created_at", { useTz: false });
      table.datetime("updated_at", { useTz: false });
    });
};

exports.down = function (knex) {
  return knex.schema.dropTable("blogs").dropTable("authors");
};
