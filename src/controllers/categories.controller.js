const { readDb, writeDb } = require("../../utils/db");

const RESOURCE = "categories";
const readResource = readDb(RESOURCE, []);
const writeResource = writeDb(RESOURCE);

exports.index = async (req, res) => {
  const categories = await readResource();
  res.status(200).json({
    status: "success",
    data: categories,
  });
};

exports.show = async (req, res) => {
  const categories = await readResource();
  const category = categories.find((prod) => prod.id === Number(req.params.id));

  if (!category) {
    return res.status(404).json({
      status: "error",
      message: "Category not found",
    });
  }

  res.status(200).json({
    status: "success",
    data: category,
  });
};

exports.store = async (req, res) => {
  const categories = await readResource();
  const newId = (categories[categories.length - 1]?.id ?? 0) + 1;

  const newCategory = {
    id: newId,
    title: req.body.title,
    body: req.body.body,
  };

  const newCategories = [...categories, newCategory];
  await writeResource(newCategories);

  res.status(201).json({
    status: "success",
    data: newCategory,
  });
};

exports.update = async (req, res) => {
  const categories = await readResource();
  const categoryIndex = categories.findIndex(
    (prod) => prod.id === Number(req.params.id)
  );

  if (categoryIndex === -1) {
    return res.status(404).json({
      status: "error",
      message: "Category not found",
    });
  }

  const updatedCategory = { ...categories[categoryIndex], ...req.body };

  const updatedCategories = [
    ...categories.slice(0, categoryIndex),
    updatedCategory,
    ...categories.slice(categoryIndex + 1),
  ];

  await writeResource(updatedCategories);

  res.status(200).json({
    status: "success",
    data: updatedCategory,
  });
};

exports.destroy = async (req, res) => {
  const categories = await readResource();
  const categoryId = Number(req.params.id);
  const updatedCategories = categories.filter((prod) => prod.id !== categoryId);

  if (updatedCategories.length === categories.length) {
    return res.status(404).json({
      status: "error",
      message: "Category not found",
    });
  }

  await writeResource(updatedCategories);

  res.status(204).send();
};
