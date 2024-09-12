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

      const cart = user.cart
      let quantity = 1;

      if (cart?.items && cart.items.some((item) => item.productId.toString() === product._id.toString())) {
        const existingItem = cart.items.find(
          (item) => item.productId.toString() === product._id.toString()
        );
        
        quantity = existingItem.quantity + 1;
      }

      const updatedCart = { items: [{ productId: product._id, quantity }] };

      
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
