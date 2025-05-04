const { readDb, writeDb } = require("../../utils/db");

const RESOURCE = "products";
const readResource = readDb(RESOURCE, []);
const writeResource = writeDb(RESOURCE);

exports.index = async (req, res) => {
  const products = await readResource();
  res.status(200).json({
    status: "success",
    data: products,
  });
};

exports.show = async (req, res) => {
  const products = await readResource();
  const product = products.find((prod) => prod.id === Number(req.params.id));

  if (!product) {
    return res.status(404).json({
      status: "error",
      message: "Product not found",
    });
  }

  res.status(200).json({
    status: "success",
    data: product,
  });
};

exports.store = async (req, res) => {
  const products = await readResource();
  const newId = (products[products.length - 1]?.id ?? 0) + 1;

  const newProduct = {
    id: newId,
    title: req.body.title,
    body: req.body.body,
  };

  const newProducts = [...products, newProduct];
  await writeResource(newProducts);

  res.status(201).json({
    status: "success",
    data: newProduct,
  });
};

exports.update = async (req, res) => {
  const products = await readResource();
  const productIndex = products.findIndex(
    (prod) => prod.id === Number(req.params.id)
  );

  if (productIndex === -1) {
    return res.status(404).json({
      status: "error",
      message: "Product not found",
    });
  }

  const updatedProduct = { ...products[productIndex], ...req.body };

  const updatedProducts = [
    ...products.slice(0, productIndex),
    updatedProduct,
    ...products.slice(productIndex + 1),
  ];

  await writeResource(updatedProducts);

  res.status(200).json({
    status: "success",
    data: updatedProduct,
  });
};

exports.destroy = async (req, res) => {
  const products = await readResource();
  const productId = Number(req.params.id);
  const updatedProducts = products.filter((prod) => prod.id !== productId);

  if (updatedProducts.length === products.length) {
    return res.status(404).json({
      status: "error",
      message: "Product not found",
    });
  }

  await writeResource(updatedProducts);

  res.status(204).send();
};
