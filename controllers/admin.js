import { ObjectId } from "mongodb";
import Product from "../models/product.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    // .cursor()
    // .next();

    res.render("admin/products", {
      prods: products,
      pageTitle: "Admin Products",
      path: "/admin/products",
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

export const getAddProduct = (req, res) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};

export const postAddProduct = async (req, res) => {
  try {
    const { title, price, description, imageUrl } = req.body;

    const product = new Product({ title, price, description, imageUrl });

    const result = await product.save();
    console.log("Product saved");

    console.log(result);

    res.redirect("/admin/products");
  } catch (err) {
    console.log(err);
    res.redirect("/admin/add-product");
  }
};

export const getEditProduct = async (req, res) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }

  try {
    const prodId = req.params.productId;

    const product = await Product.findById(prodId);
    if (!product) {
      return res.redirect("/");
    }
    res.render("admin/edit-product", {
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      editing: editMode,
      product: product,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

export const postEditProduct = async (req, res) => {
  try {
    const { productId, title, price, imageUrl, description } = req.body;

    await Product.findByIdAndUpdate(productId, {
      title,
      price,
      imageUrl,
      description,
    });

    console.log("UPDATED PRODUCT!");
    res.redirect("/admin/products");
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
};

export const postDeleteProduct = async (req, res) => {
  try {
    const prodId = req.body.productId;
    await Product.deleteOne({"_id":prodId});

    console.log("Product deleted");
    res.redirect("/admin/products");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
