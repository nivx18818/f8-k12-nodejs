const categoriesService = require("@/services/categories.service");

exports.index = async (req, res) => {
  const { categories } = await categoriesService.getAll();
  res.render("admin/categories/index", {
    title: "Categories list",
    categories,
  });
};

exports.show = async (req, res) => {
  const category = await categoriesService.getById(req.params.id);
  res.render("admin/categories/show", {
    title: "Category detail",
    category,
  });
};
