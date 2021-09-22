module.exports = (err, req, res, next) => {
  console.log("global err handler ----->", err);

  // Sentry configuration

  if (err.statusCode) {
    let statusCode = err.statusCode;
    delete err.statusCode;
    return res.status(statusCode).send(err);
  }

  if (process.env.DEBUG === "true") {
    return res.status(500).send({ message: err.message });
  } else {
    return res.status(500).send({ message: "Something went wrong" });
  }
};
