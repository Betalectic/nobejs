if (process.env.LOAD_FROM_DOTENV === "true") {
  var dotenv = require("dotenv");
  dotenv.config({ path: ".env" });
}

global.modelRequire = (name) => require(`./database/models`)[name];
global.nobeRequire = (name) => require(`./core`)[name];
global.repoRequire = (name) => require(`./database/repositories/${name}`);
global.requireStory = (name) => require(`./stories/${name}/handler.js`);

const notFoundHandler = nobeRequire("notFoundHandler");
const errorHandler = require("./core/errorHandler");

module.exports = {
  notFoundHandler,
  errorHandler,
};
