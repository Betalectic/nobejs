global.modelRequire = (name) => require(`./database/models`)[name];
global.nobeRequire = (name) => require(`./core`)[name];

const notFoundHandler = nobeRequire("notFoundHandler");
const errorHandler = require("./core/errorHandler");

module.exports = {
  notFoundHandler,
  errorHandler,
};
