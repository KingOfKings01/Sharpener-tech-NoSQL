import Product from "../models/product.js";

export const createProduct = async (req, res) => {
  try {
    const { title, price, description, imageUrl } = req.body;
  
    const product = new Product(title, price, description, imageUrl);

    const result = await product.save();

    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
