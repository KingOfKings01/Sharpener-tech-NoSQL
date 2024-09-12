import { ObjectId } from "mongodb";
import { getDb } from "../utils/database.js";

class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
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

  static async findById(id) {
    try{

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


export default User