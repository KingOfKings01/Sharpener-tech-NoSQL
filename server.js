import "dotenv/config";
import express from 'express'
import bodyParser from 'body-parser'
import {mongodbConnection} from './utils/database.js'
import productRoutes from './routes/productRoutes.js'

const app = express() 

app.use(bodyParser.urlencoded({ extended: false }))

// To parse application/json data
app.use(bodyParser.json())

app.use("/product", productRoutes)

mongodbConnection(client => {
    // console.log(client);
    app.listen(3000, () => {
        console.log("server listening on port 3000")
        console.log("http//localhost/3000")
    })
})