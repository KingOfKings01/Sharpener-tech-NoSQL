import { ObjectId } from "mongodb";
import { getDb } from "../utils/database.js";

class User {
  constructor(name, email, cart, id) {
    this.name = name;
    this.email = email;
    this.cart = cart;
    this._id = id;
  }

  async save() {
    try {
      const db = getDb();
      await db.collection("users").insertOne(this);
    } catch (err) {
      console.error(err);
      throw new Error("Failed to save user to the database.");
    }
  }
  async addToCart(product, user) {
    try {
      const db = getDb();
  
      const cart = user.cart || { items: [] }; // Initialize if cart is empty
      const updatedCartItems = [...cart.items];
      
      const cartProductIndex = cart.items.findIndex(
        (item) => item.productId.toString() === product._id.toString()
      );
  
      if (cartProductIndex >= 0) {
        // Product already exists in the cart, update quantity
        updatedCartItems[cartProductIndex].quantity += 1;
      } else {
        // New product, add to cart
        updatedCartItems.push({ productId: product._id, quantity: 1 });
      }
  
      const updatedCart = { items: updatedCartItems };
  
      const result = await db
        .collection("users")
        .updateOne(
          { _id: new ObjectId(this._id) },
          { $set: { cart: updatedCart } }
        );
        
      return result;
    } catch (err) {
      console.error(err);
      throw new Error("Failed to add product to the user's cart.");
    }
  }
  

  async getCart() {
    try {
      const db = getDb();
      console.log("Getting Cart");
      const productIds = this.cart.items.map((item) => item.productId);
      const products = await db
        .collection("products")
        .find({ _id: { $in: productIds } })
        .toArray();

      const data = products.map((product) => ({
        ...product,
        quantity: this.cart.items.find(
          (item) => item.productId.toString() === product._id.toString()
        ).quantity,
      }));
      return data;
    } catch (err) {
      console.error(err);
      return [];
    }
  }
  async deleteCardItem(productId) {
    try {
      const db = getDb();
      const result = await db
        .collection("users")
        .updateOne(
          { _id: new ObjectId(this._id) },
          { $pull: { 'cart.items': { productId: new ObjectId(productId) } } }
        );
      return result;
    } catch (err) {
      console.error(err);
      throw new Error("Failed to delete product from the user's cart.");
    }
  }
  

  static async findById(id) {
    try {
      const db = await getDb();
      const user = await db
        .collection("users")
        .findOne({ _id: new ObjectId(id) });

      return user;
    } catch (err) {
      console.error(err);
      throw new Error("Failed to find user from the database.");
    }
  }
}

export default User;
