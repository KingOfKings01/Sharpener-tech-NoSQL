import { getDb } from "../utils/database.js";

class Product {
    constructor(title, price, description, imageUrl) {
        this.title = title;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
    }

    async save() {
        // Implement saving the product to the database
        try{
            console.log(`Saving product: ${this.title}`);
            
            const db = getDb()
            const result = await db.collection('products').insertOne(this)
            
            return result
        } catch(e){
            console.error(e.message)
        }
    }
}

export default Product;