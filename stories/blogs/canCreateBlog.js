const validator = nobeRequire("validator");
const Blog = modelRequire("Blog");

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

const getInput = () => {};

// Who can do the action of this story?
const validateInput = async (payload) => {
  try {
    await validator(payload, constraints);
  } catch (error) {
    throw error;
  }
};

const handle = (payload) => {
  console.log("handle called", payload);
};

const giveOutput = () => {};

const executeSequence = [getInput, validateInput, handle, giveOutput];

module.exports = () => {
  return executeSequence;
};
