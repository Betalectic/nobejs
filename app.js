var debug = require("debug")("nobe:server");
const express = require("express");
var router = express.Router();
var http = require("http");
const { notFoundHandler, errorHandler } = require("./bootstrap.js");

var port = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.set("port", port);

app.use(function (req, res, next) {
  req.nobe = {};
  next();
});

// Before Middlewares
// app.use();
// Endpoints

nobeRequire("loadEndpoints")(app);

// After Middlewares

app.use(notFoundHandler);
app.use(errorHandler);

var server = http.createServer(app);
server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }
  var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  var addr = server.address();
  var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  console.log("I am listening...");
  debug("Listening on " + bind);
}
