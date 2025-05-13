const productsService = require("@/services/products.service");
const throwError = require("@/utils/throwError");
const response = require("@/utils/response");

const throw404 = () => throwError(404, "Product not found");

exports.index = async (req, res) => {
  const products = await productsService.getProducts();
  return response.success(res, 200, products);
};

exports.show = async (req, res) => {
  const product = await productsService.getProductById(req.params.id);
  if (!product) throw404();
  return response.success(res, 200, product);
};

exports.store = async (req, res) => {
  const newProduct = await productsService.addProduct(req.body);
  return response.success(res, 201, newProduct);
};

exports.update = async (req, res) => {
  const updatedProduct = await productsService.updateProduct(req.params.id, req.body);
  if (!updatedProduct) throw404();
  return response.success(res, 200, updatedProduct);
};

exports.destroy = async (req, res) => {
  const updatedProducts = productsService.deleteProduct(req.params.id);
  if (!updatedProducts) throw404();
  return response.success(res, 204);
};
