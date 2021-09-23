require("../../../bootstrap.js");
const runStory = nobeRequire("runStory");

test("can create a blog", async () => {
  let output = await runStory("blogs/canCreateBlog", {
    name: "Something",
  });

  expect(output).toEqual(
    expect.objectContaining({
      errorCode: expect.stringMatching("InputNotValid"),
    })
  );
});
