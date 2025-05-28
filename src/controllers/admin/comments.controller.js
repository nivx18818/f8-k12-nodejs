// Admin Comments Controller

// Display a list of comments
exports.index = (req, res) => {
  res.render("admin/comments/index");
};

// Display the specified comment
exports.show = (req, res) => {
  const { id } = req.params;
  res.render("admin/comments/show", { commentId: id });
};

// Show the form for editing the specified comment
exports.edit = (req, res) => {
  const { id } = req.params;
  res.render("admin/comments/edit", { commentId: id });
};

// Update the specified comment in storage
exports.update = (req, res) => {
  const { id } = req.params;
  // Logic for updating a comment
  res.send(`Update comment POST request for ID: ${id}`);
};

// Remove the specified comment from storage
exports.destroy = (req, res) => {
  const { id } = req.params;
  // Logic for deleting a comment
  res.send(`Delete comment POST request for ID: ${id}`);
};
