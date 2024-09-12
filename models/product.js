import { ObjectId } from "mongodb";
import { getDb } from "../utils/database.js";

class Product {
  constructor(title, price, description, imageUrl, id) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this._id = id;
  }

  async save() {
    // Implement saving the product to the database
    try {
      const db = getDb();

      // If the product already exists, update it instead of creating a new one
      if (this._id) {
        console.log(`Update product: ${this.title}`);
        const result = await db
          .collection("products")
          .updateOne({ _id: new ObjectId(this._id) }, { $set: this });
        return result;
      }

      console.log(`Saving product: ${this.title}`);
      const result = await db.collection("products").insertOne(this);

      return result;
    } catch (err) {
      console.error(err.message);
    }
  }

  static async findAll() {
    try {
      const db = getDb();
      const products = await db.collection("products").find().toArray(); //! Not recommended
      return products;
    } catch (error) {
      console.error(error.message);
      return [];
    }
  }

  static async findById(prodId) {
    try {
      const db = getDb();
      const product = await db
        .collection("products")
        .findOne({ _id: new ObjectId(prodId) });
      console.log("Product: ", product);
      return product;
    } catch (err) {
      console.error(err.message);
      throw new Error(err.message);
    }
  }

  static async delete(prodId){
    try{
      const db = getDb();
      const result = await db.collection("products").deleteOne({_id: new ObjectId(prodId)});
      console.log(`Deleted product: ${prodId}`);
      return result;
    } catch(err){
      console.error(err.message);
      throw new Error(err.message);
    }
  }
}

export default Product;
