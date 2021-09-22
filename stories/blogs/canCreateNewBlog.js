const allow = () => {
  /**md
     ### ndlfndsf
        - sdlkfsldnfds
        - kldfslndfnds
        - *jdnjkdnfds*
  */
  //   authorization;
  return true;
};

const getInput = (req) => {
  // json schema v4
  attributesAllowed(req.body, ["title", "body"]);
};

const validateInput = (req) => {};
const giveOutput = (req) => {};

const handler = () => {
  /**md
     ### ndlfndsf
        - sdlkfsldnfds
        - kldfslndfnds
        - *jdnjkdnfds*
  */
  // user inputs a title name to create a blog
  // get the title, body of the blog
  // Validate title
  // not empty string
  // if any pattern
  // body can be empty
  // title should be unique under a user
  // get current time
  // create a unique id
  // store this in database
  // return response
};

// 1. Where should we write the story? - In the handler function itself

// handler -> input <- output
