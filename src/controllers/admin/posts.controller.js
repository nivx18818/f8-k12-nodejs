const postsService = require("@/services/posts.service");

exports.index = async (req, res) => {
  const { posts } = await postsService.getAll();
  res.render("admin/posts/index", {
    title: "Posts list",
    posts,
  });
};

exports.show = async (req, res) => {
  const post = await postsService.getById(req.params.id);
  res.render("admin/posts/show", {
    title: "Post detail",
    post,
  });
};
