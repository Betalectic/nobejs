const endpoints = require("../features/endpoints");
const executeStoryForResponse = require("./executeStoryForResponse");

module.exports = function (app) {
  const apis = endpoints();

  apis.forEach((api) => {
    api.endpoints.forEach((endpoint, i) => {
      let apiPaths = [];
      apiPaths.push(api.prefix);
      apiPaths.push(endpoint[1]);
      apiPaths = apiPaths.map((p) => {
        return p.replace(/^\//, "").replace(/\/$/, "");
      });

      let apiPath = "/" + apiPaths.join("/");

      app[endpoint[0]](apiPath, executeStoryForResponse(endpoint[2]));
    });
  });
};
