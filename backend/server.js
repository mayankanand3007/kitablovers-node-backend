import express from "express";
import cors from "cors";
import errorMiddleware from "./middleware/error.js"

// App Specs
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());
app.options('*', cors());
app.use(errorMiddleware);


// ENV Config
import dotenv from "dotenv";
dotenv.config();

// MongoDB Connectivity
import mongoose from "mongoose";
mongoose.set("strictQuery", true);
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to mongodb!");
    } catch(error) {
        console.log(error);
    }
};

//import swaggerUI from "swagger-ui-express";
//import swaggerDocument from "./utils/swagger.json" assert { type: 'json' };

//app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));


// Route Imports
import booksInventoryRoute from "./routes/bookInventory.route.js";
import bookConditionRoute from "./routes/bookCondition.route.js";
import warehouseCityRoute from "./routes/warehouseCity.route.js";
import bookRoute from "./routes/book.route.js";
import genreRoute from "./routes/genre.route.js";
import tagRoute from "./routes/tag.route.js";

//Routes
/**
 * @swagger
 * components:
 *  schemas:
 *      BooksInventory:
 *          type: object
 *          required:
 *              - isbn
 *              - mrp
 *              - pricing
 *                  - book_condition
 *                  - price
 *              - inventory
 *                  - book_condition
 *                  - city
 *                  - quantity
 *                  - location
 *          properties:
 *              isbn:
 *                  type: Number
 *                  description: ISBN of Book
 *              mrp:
 *                  type: Number
 *                  description: MRP of Book
 *          example:
 *              isbn: 1234567890123
 *              mrp: 400
 *              pricing: {
 *                  book_condition: "New",
 *                  price: 300
 *              }
 *              inventory: {
 *                  book_condition: "New",
 *                  city: "Delhi",
 *                  quantity: 5,
 *                  location: 'R1,C2'
 *              }
 * /api/BooksInventory:
 *  get:
 *      description: Get All Books' Inventories
 *      content:
 *          application/json:
 *              schema:
 *                  type: array
 *                  items:
 *                      $ref: '#/components/schemas/BooksInventory'
 *      responses:
 *          201: 
 *              description: Successful Response
 *  post:
 *      description: Add a single Books' Inventory
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/BooksInventory'
 *      responses:
 *          201:
 *              description: Successful Response
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/BooksInventory'
 *  put:
 *      description: Update single Books' Inventory
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/BooksInventory'
 *      responses:
 *          201:
 *              description: Successful Response
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/BooksInventory'
 */
app.use("/api/BooksInventory", booksInventoryRoute);

/**
 * @swagger
 * components:
 *  schemas:
 *      BookCondition:
 *          type: object
 *          required:
 *              - name
 *          example:1
 *              name: 'Original'
 * /api/BookCondition:
 *  get:
 *      description: Get All Book Conditions
 *      content:
 *          application/json:
 *              schema:
 *                  type: array
 *                  items:
 *                      $ref: '#/components/schemas/BookCondition'
 *      responses:
 *          201: 
 *              description: Successful Response
 * 
 *  post:
 *      description: Add a single Book Condition
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/BookCondition'
 *      responses:
 *          201:
 *              description: Successful Response
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/BookCondition'
 */
app.use("/api/BookCondition", bookConditionRoute);

/**
 * @swagger
 * components:
 *  schemas:
 *      WarehouseCity:
 *          type: object
 *          required:
 *              - name
 *          example:
 *              name: 'Delhi'
 * /api/WarehouseCity:
 *  get:
 *      description: Get All Warehouse Cities
 *      content:
 *          application/json:
 *              schema:
 *                  type: array
 *                  items:
 *                      $ref: '#/components/schemas/WarehouseCity'
 *      responses:
 *          201: 
 *              description: Successful Response
 * 
 *  post:
 *      description: Add a single Warehouse City
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/WarehouseCity'
 *      responses:
 *          201:
 *              description: Successful Response
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/WarehouseCity'
 */
app.use("/api/WarehouseCity", warehouseCityRoute);

/**
 * @swagger
 * components:
 *  schemas:
 *      Books:
 *          type: object
 *          required:
 *              - ISBN
 *          example:
 *              isbn: 123456789123
 * /api/Books:
 *  get:
 *      description: Get All Books
 *      content:
 *          application/json:
 *              schema:
 *                  type: array
 *                  items:
 *                      $ref: '#/components/schemas/Books'
 *      responses:
 *          201: 
 *              description: Successful Response
 * 
 *  post:
 *      description: Add a single Book using ISBN.
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Books'
 *      responses:
 *          201:
 *              description: Successful Response
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Books'
 */
app.use("/api/Books", bookRoute);

app.use("/api/Tag", tagRoute);

app.use("/api/Genre", genreRoute);


app.listen(process.env.PORT,() => {
    connect();
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});