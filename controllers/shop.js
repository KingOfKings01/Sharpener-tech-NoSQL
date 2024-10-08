import Order from "../models/order.js";
import Product from "../models/product.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.render("shop/product-list", {
      prods: products,
      pageTitle: "All Products",
      path: "/products",
    });
  } catch (err) {
    console.error(err);
    res.redirect("/");
  }
};

export const getProduct = async (req, res) => {
  const prodId = req.params.productId;
  try {
    const product = await Product.findById(prodId);
    res.render("shop/product-detail", {
      product: product,
      pageTitle: product.title,
      path: "/products",
    });
  } catch (err) {
    console.error(err);
    res.redirect("/");
  }
};

export const getIndex = (req, res) => {
  Product.find()
    .then((products) => {
      res.render("shop/index", {
        prods: products,
        pageTitle: "Shop",
        path: "/",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getCart = async (req, res) => {
  try {
    const user = await req.user.populate("cart.items.productId");
    // .execPopulate(); //? not needed in my case!

    const products = user.cart.items;

    res.render("shop/cart", {
      path: "/cart",
      pageTitle: "Your Cart",
      products: products,
    });
  } catch (err) {
    console.error(err);
    res.render("/products");
  }
};

export const postCart = async (req, res) => {
  const prodId = req.body.productId;
  const user = req.user;

  const product = await Product.findById(prodId);
  const result = await req.user.addToCart(product);

  res.redirect("/cart");
};

export const postCartDeleteProduct = async (req, res) => {
  try {
    console.log("Delete Product from Cart");
    const prodId = req.body.productId;
    await req.user.deleteCardItem(prodId);
    res.redirect("/cart");
  } catch (err) {
    console.error(err);
    res.redirect("/cart");
  }
};

export const postOrder = async (req, res) => {
  try {
    const user = await req.user.populate("cart.items.productId");
    const products = user.cart.items.map((product) => {
      return {
        product: { ...product.productId._doc },
        quantity: product.quantity,
      };
    });

    console.log(products);

    const order = new Order({
      user: {
        name: req.user.name,
        userId: req.user,
      },
      products: products,
    });

    // save the order
    await order.save();

    // clear cart data
    await req.user.clearCart();

    res.redirect("/orders");
  } catch (err) {
    console.log(err);
    res.redirect("/cart");
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
    res.render("shop/orders", {
      path: "/orders",
      pageTitle: "Your Orders",
      orders: orders,
    });
  } catch (err) {
    console.error(err);
    res.redirect("/");
  }
};
