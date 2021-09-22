const validator = nobeRequire("validator");
const Blog = modelRequire("Blog");
// const { parseDate } = require("../../dates.js");

const story = {
  description: "",
};

const constraints = {
  title: {
    presence: {
      allowEmpty: false,
      message: "^Please enter title",
    },
    type: "string",
    custom_callback: {
      message: "Blog Title should be unique",
      callback: async (payload) => {
        let count =
          typeof payload.title === "string"
            ? await Blog.count({
                where: {
                  title: payload.title,
                },
              })
            : -1;
        return count === 0 ? true : false;
      },
    },
  },
};

const before = (req) => {};

const after = (req) => {};

const getInput = (req) => {
  return req.body;
};

// Who can do the action of this story?
const validateInput = async (payload) => {
  try {
    await validator(payload, constraints);
  } catch (error) {
    throw error;
  }
};

const handle = (payload) => {
  // checkIfInvestorExists();
  // checkIfInvestorIsOnboarded();
  // placeAnOrder();
  // fireAnEvent();
  // Request
  // Response
  console.log("handle called", payload);
};

const giveOutput = () => {};

const executeSequence = [
  getInput,
  validateInput,
  handle,
  parseDate,
  giveOutput,
];

module.exports = () => {
  return executeSequence;
};
