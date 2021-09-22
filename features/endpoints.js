module.exports = () => {
  return [
    {
      label: "Blogs",
      prefix: "blogs",
      folder: "/blogs",
      endpoints: [
        ["get", "/", "canCreateBlog"],
        ["post", "/", "create"],
        ["get", "/:id", "detail"],
        ["put", "/:id", "update"],
        ["delete", "/:id", "destroy"],
      ],
    },
  ];
};
