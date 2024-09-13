import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  cart: {
    items: [
      {
        productId: { type: Schema.Types.ObjectId, required:true, ref: "Product" },
        quantity: { type: Number, required: true }
      }
    ]
  }
})

userSchema.methods.addToCart = async function(product){
  try {

          console.log("object: " + product);
    
          const updatedCartItems = [...this.cart.items];
    
          const cartProductIndex = this.cart.items.findIndex(
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

          this.cart = updatedCart;

          const result = this.save()
          
          // await db
          //   .collection("users")
          //   .updateOne(
          //     { _id: new ObjectId(this._id) },
          //     { $set: { cart: updatedCart } }
          //   );
    
          return result;
        } catch (err) {
          console.error(err);
          throw new Error("Failed to add product to the user's cart.");
        }
}


export default mongoose.model("User", userSchema);  

// import { ObjectId } from "mongodb";
// import { getDb } from "../utils/database.js";

// class User {
//   constructor(name, email, cart, orders, id) {
//     this.name = name;
//     this.email = email;
//     this.cart = cart;
//     this.orders = orders;
//     this._id = id;
//   }

//   async save() {
//     try {
//       const db = getDb();
//       await db.collection("users").insertOne(this);
//     } catch (err) {
//       console.error(err);
//       throw new Error("Failed to save user to the database.");
//     }
//   }
//   async addToCart(product, user) {
//     try {
//       const db = getDb();

//       const cart = user.cart || { items: [] }; // Initialize if cart is empty
//       const updatedCartItems = [...cart.items];

//       const cartProductIndex = cart.items.findIndex(
//         (item) => item.productId.toString() === product._id.toString()
//       );

//       if (cartProductIndex >= 0) {
//         // Product already exists in the cart, update quantity
//         updatedCartItems[cartProductIndex].quantity += 1;
//       } else {
//         // New product, add to cart
//         updatedCartItems.push({ productId: product._id, quantity: 1 });
//       }

//       const updatedCart = { items: updatedCartItems };

//       const result = await db
//         .collection("users")
//         .updateOne(
//           { _id: new ObjectId(this._id) },
//           { $set: { cart: updatedCart } }
//         );

//       return result;
//     } catch (err) {
//       console.error(err);
//       throw new Error("Failed to add product to the user's cart.");
//     }
//   }

//   async getCart() {
//     try {
//       const db = getDb();
//       console.log("Getting Cart");
//       const productIds = this.cart.items.map((item) => item.productId);
//       const products = await db
//         .collection("products")
//         .find({ _id: { $in: productIds } })
//         .toArray();

//       const data = products.map((product) => ({
//         ...product,
//         quantity: this.cart.items.find(
//           (item) => item.productId.toString() === product._id.toString()
//         ).quantity,
//       }));
//       return data;
//     } catch (err) {
//       console.error(err);
//       return [];
//     }
//   }
//   async deleteCardItem(productId) {
//     try {
//       const db = getDb();
//       const result = await db
//         .collection("users")
//         .updateOne(
//           { _id: new ObjectId(this._id) },
//           { $pull: { "cart.items": { productId: new ObjectId(productId) } } }
//         );
//       return result;
//     } catch (err) {
//       console.error(err);
//       throw new Error("Failed to delete product from the user's cart.");
//     }
//   }

//   static async findById(id) {
//     try {
//       const db = await getDb();
//       const user = await db
//         .collection("users")
//         .findOne({ _id: new ObjectId(id) });

//       return user;
//     } catch (err) {
//       console.error(err);
//       throw new Error("Failed to find user from the database.");
//     }
//   }

//   async placeOrder() {
//     try {
//       console.log("Placing order");
//       const db = getDb();
//       // const result = await db
//       //   .collection("users")
//       //   .updateOne(
//       //     { _id: new ObjectId(this._id) },
//       //     { $push: { orders: this.cart } }
//       //   );
//       const products = await this.getCart()
//       const order = {
//         items: products,
//         user: {
//           _id: new ObjectId(this._id)
//         },
//         date: new Date(),
//         totalPrice: products.reduce((acc, product) => acc + product.price * product.quantity, 0)
//       }
//       const result = await db.collection("orders").insertOne(order)
      
//       // empty cart
//       await db
//         .collection("users")
//         .updateOne(
//           { _id: new ObjectId(this._id) },
//           { $set: { cart: { items: [] } } }
//         );

//       return result;
//     } catch (err) {
//       console.error(err);
//       throw new Error("Failed to place order for the user.");
//     }
//   }
//   async getOrders() {
//     try {
//       const db = getDb();
      
//       const orders = await db.collection('orders').find({"user._id":new ObjectId(this._id)}).toArray()
//       // console.log(orders);
//       return orders;
//     } catch (err) {
//       console.error(err);
//       return [];
//     }
//   }
  
// }

// export default User;
