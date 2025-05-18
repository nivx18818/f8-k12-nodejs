const postsService = require("@/services/posts.service");

exports.index = async (req, res) => {
  const { posts } = await postsService.findAll();
  res.render("admin/posts/index", {
    title: "Posts list",
    posts,
  });
};

exports.show = async (req, res) => {
  const post = await postsService.findById(req.params.id);
  console.log(post);
  res.render("admin/posts/show", {
    title: "Post detail",
    post,
  });
};
