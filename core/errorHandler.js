module.exports = (err, req, res, next) => {
  if (process.env.DEBUG === "true") {
    return res.status(err.status || 500).send({ message: err.message });
  } else {
    return res.status(500).send({ message: "Something went wrong" });
  }
};
