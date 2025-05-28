const categoriesService = require("@/services/categories.service");

// Admin Categories Controller

// Display a list of categories
exports.index = async (req, res) => {
  const { categories } = await categoriesService.getAll();
  res.render("admin/categories/index", {
    title: "Categories list",
    categories,
  });
};

// Show the form for creating a new category
exports.create = (req, res) => {
  // Assuming you will create a 'create.ejs' for categories
  res.render("admin/categories/create");
};

// Store a newly created category in storage
exports.store = (req, res) => {
  // Logic for storing a new category
  res.send("Store new category POST request");
};

// Show the form for editing the specified category
exports.edit = (req, res) => {
  const { id } = req.params;
  // Assuming you will create an 'edit.ejs' for categories
  res.render("admin/categories/edit", { categoryId: id });
};

// Update the specified category in storage
exports.update = (req, res) => {
  const { id } = req.params;
  // Logic for updating a category
  res.send(`Update category POST request for ID: ${id}`);
};

// Remove the specified category from storage
exports.destroy = (req, res) => {
  const { id } = req.params;
  // Logic for deleting a category
  res.send(`Delete category POST request for ID: ${id}`);
};
