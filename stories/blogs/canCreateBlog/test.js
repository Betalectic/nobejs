const runStory = nobeRequire("runStory");

test("adds 1 + 2 to equal 3", () => {
  let output = runStory(
    canCreateBlog(
      {
        title: "Something",
      },
      user1
    )
  );

  expect(output).toBe(3);
});

// 1. User will write - yarn test storyName.js
// 2. The execution order is known by us
// 3. So, we execute, get the result, compare with expected output
