import "dotenv/config"
import express from 'express'
import bodyParser from 'body-parser'
// import {mongodbConnection} from './utils/database.js'
import { get404 } from "./controllers/error.js"

import productRoutes from './routes/productRoutes.js'
import adminRoutes from './routes/admin.js';
import shopRoutes from './routes/shop.js'

//* __dirname don't work in ES6 so we have to get it this way.
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
// import User from "./models/user.js"
import mongoose from "mongoose"

const app = express()

app.set('view engine', 'ejs')
app.set('views', 'views')

// ES6 way to get dirname and filename
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(join(__dirname,"public")))

// To parse application/json data
app.use(bodyParser.json())

// app.use((req, res, next) => {
//     User.findById('66e361bf667fdcb21585244d')
//       .then(user => {
//         req.user = new User(user.name, user.email, user.cart, user.orders, user._id);
//         next();
//       })
//       .catch(err => console.log(err));
//   });

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use("/product", productRoutes)

app.use(get404)

const URL = process.env.MONGODB_SERVER_URL

// mongodbConnection(client => {
//     // console.log(client);
//     app.listen(3000, () => {
//         console.log("server listening on port 3000")
//         console.log("http//localhost/3000")
//     })
// })

async function run(){
    try {
        await mongoose.connect(URL)
        app.listen(3000, () => {
            console.log("server listening on port 3000")
            console.log("http//localhost/3000")
        })
    } catch (err) {
        console.error(err)
        process.exit(1)
    }
}

run()
