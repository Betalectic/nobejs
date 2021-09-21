const endpoints = require("../features/endpoints");
const executeForResult = require("./executeForResult");
const executeForResponse = require("./executeForResponse");

module.exports = function (app) {
  const apis = endpoints();

  apis.forEach((api) => {
    api.endpoints.forEach((endpoint, i) => {
      let folderPaths = ["../features"];
      folderPaths.push(api.folder);
      folderPaths.push(endpoint[2]);
      folderPaths = folderPaths.map((p) => {
        return p.replace(/^\//, "").replace(/\/$/, "");
      });

      let functionPath = folderPaths.join("/");

      const functions = require(functionPath).apply(null);

      const routeFunctions = functions.map((func, index) => {
        return index + 1 < functions.length
          ? executeForResult(func)
          : executeForResponse(func);
      });

      let apiPaths = [];
      apiPaths.push(api.prefix);
      apiPaths.push(endpoint[1]);
      apiPaths = apiPaths.map((p) => {
        return p.replace(/^\//, "").replace(/\/$/, "");
      });

      let apiPath = "/" + apiPaths.join("/");

      app[endpoint[0]](apiPath, routeFunctions);
    });
  });
};
