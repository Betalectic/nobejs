require("./bootstrap.js");
const { Command } = require("commander");
const program = new Command();
// const Blog = modelRequire("Blog");
// const sequelize = modelRequire("sequelize");

program
  .option("-d, --debug", "output extra debugging")
  .option("-f, --file  <type>", "file to run")
  .option("-i, --input  <type>", "input to function");

const { Pool } = require("postgresql-client");

const knex = require("knex")({
  client: "pg",
  debug: true,
  connection: {
    host: "127.0.0.1",
    port: 5432,
    user: "postgres",
    password: "secret",
    database: "nobejs",
    application_name: "nobe-runner",
  },
});

// const db = new Pool({
//   host: "postgres://postgres:secret@localhost:5432/nobejs",
//   pool: {
//     min: 1,
//     max: 10,
//     idleTimeoutMillis: 5000,
//   },
// });

(async () => {
  program.parse(process.argv);
  const options = program.opts();
  const functionName = options.file;
  const functionInput = JSON.parse(options.input);
  //   console.log("options", functionName, JSON.parse(options.input));
  const functionPath = `./stories/${functionName}`;
  const functions = require(functionPath)();
  const handleIndex = functions.findIndex((f) => {
    return f.name === "handle";
  });

  const validateInputIndex = functions.findIndex((f) => {
    return f.name === "validateInput";
  });

  try {
    let blogs = await knex.select().table("blogs");
    let authors = await knex.select().table("authors");
    console.log(blogs, authors);
    // let blogs = await Blog.findAll();
    // await sequelize.query("SELECT * FROM blogs");
    // await functions[validateInputIndex](functionInput);
    // const result = await db.query("select * from blogs");
    // console.log("function", result.rows);
    // db.close();
    //   functions[handleIndex](functionInput);
  } catch (error) {
    console.log(error);
  } finally {
    // knex.destroy();
  }
})();
