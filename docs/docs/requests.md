---
sidebar_position: 6
---

# Requests

We used: `https://validatejs.org/`

We will take an example here:

```js
router.post(
  "/blogs",
  createBlogRequest,
  executeForResult(blogController.store),
  executeForResponse(blogResourceResponse)
);
```

There are many ways to run your validator, but we pass it as a middleware/function to router itself: `createBlogRequest` is the function which will do validation. If req.body is good, next immediate function would be executed, else it will return a 422.

Again we used: https://validatejs.org/

Checkout: `app/requests/createBlog.js`

```js
const validatorBase = require("./base");

const constraints = {
  title: {
    presence: {
      allowEmpty: false,
      message: "^Please enter title",
    },
  },
};

module.exports = (...props) => {
  return validatorBase(constraints, ...props);
};
```

You just need to create a similar files and write your own constraints.

You can your validation library, and just customize `base.js` to format your response.

But, we suggest, pick one validation library, and master it (write custom validators) like your life depends on it.

Valiate.js is powerful, but mastering it means write custom validators to suit various cases. To cover you initially, we added a simple but very scalable validator.

Let's take a use case that we want our Blog Titles to be unique, what do we need to do? Essentially, when we get a create blog request, we have to check our database if there exists a blog with that title. If you notice the following piece of code, `custom_callback` is such object which expects two keys.

1. message - What message to give back in response
2. callback - A function which returns true or false, in turn suggesting if input is valid or not

In the following example, we are making a database query and checking count of blogs with the same title, if there are blog with the same title, we return false, else we return true, suggesting input is valid.

You can make this function as complicated as possible, but keep in mind that what is passed as an input to this function is `req`, so you might want to put your custom inputs if any into req like `req['my_data'] = anything`

```js
const constraints = {
  title: {
    presence: {
      allowEmpty: false,
      message: "^Please enter title",
    },
    type: "string",
    custom_callback: {
      message: "Blog Title should be unique",
      callback: async (req) => {
        let count =
          typeof req.body.name === "string"
            ? await Blog.count({
                where: {
                  name: req.body.name,
                },
              })
            : -1;
        return count === 0 ? true : false;
      },
    },
  },
};
```

Note: You can `app/requests/base.js` for the implementation of custom_callback