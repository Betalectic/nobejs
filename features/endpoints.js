module.exports = () => {
  return [
    {
      prefix: "blogs",
      endpoints: [
        // ["get", "/", "index"],
        ["post", "/", "blogs/canCreateBlog"],
        // ["get", "/:id", "detail"],
        // ["put", "/:id", "update"],
        // ["delete", "/:id", "destroy"],
      ],
    },
  ];
};
