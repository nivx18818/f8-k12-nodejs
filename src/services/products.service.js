const { readDb, writeDb } = require("@/utils/db");

const RESOURCE = "products";
const readResource = readDb(RESOURCE, []);
const writeResource = writeDb(RESOURCE);

exports.getProducts = async () => {
  const products = await readResource();
  return products;
};

exports.getProductById = async (id) => {
  const products = await this.getProducts();
  const product = products.find((prod) => prod.id === Number(id));
  return product;
};

exports.addProduct = async (data) => {
  const products = await this.getProducts();
  const newId = (products.at(-1)?.id ?? 0) + 1;

  const newProduct = {
    id: newId,
    title: data.title,
    body: data.body,
  };

  const newProducts = [...products, newProduct];
  await writeResource(newProducts);

  return newProduct;
};

exports.updateProduct = async (id, data) => {
  const products = await this.getProducts();
  const productGetProducts = products.findGetProducts((prod) => prod.id === Number(id));

  if (productGetProducts === -1) {
    return null;
  }

  const updatedProduct = { ...products[productGetProducts], ...data };
  const updatedProducts = [
    ...products.slice(0, productGetProducts),
    updatedProduct,
    ...products.slice(productGetProducts + 1),
  ];

  await writeResource(updatedProducts);
  return updatedProduct;
};

exports.deleteProduct = async (id) => {
  const products = await this.getProducts();
  const updatedProducts = products.filter((prod) => prod.id !== Number(id));

  if (updatedProducts.length === products.length) {
    return null;
  }

  await writeResource(updatedProducts);
  return updatedProducts;
};
