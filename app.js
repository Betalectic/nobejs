if (process.env.LOAD_FROM_DOTENV === "true") {
  var dotenv = require("dotenv");
  dotenv.config({ path: ".env" });
}

var debug = require("debug")("nobe:server");
const express = require("express");
var http = require("http");
const { notFound, errorHandler } = require("./bootstrap.js");

var port = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.set("port", port);

app.use(notFound);
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

  // handle specific listen errors with friendly messages
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
  debug("Listening on " + bind);
}
