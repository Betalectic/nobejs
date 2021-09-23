// require("../../../bootstrap.js");
const runStory = nobeRequire("runStory");

test("cannot create a blog with invalid input", async () => {
  let output = await runStory("blogs/canCreateBlog", {
    name: "Something",
  });

  expect(output).toEqual(
    expect.objectContaining({
      errorCode: expect.stringMatching("InputNotValid"),
    })
  );
});

test("can create a blog with valid input", async () => {
  let output = await runStory("blogs/canCreateBlog", {
    title: "Something",
  });

  expect(output).toEqual(
    expect.objectContaining({
      message: expect.stringMatching("success"),
    })
  );
});
