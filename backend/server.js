import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
import cors from "cors";
import booksInventoryRoute from "./routes/bookInventory.route.js";
import bookConditionRoute from "./routes/bookCondition.route.js";
import warehouseCityRoute from "./routes/warehouseCity.route.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());
app.options('*', cors());
dotenv.config();
mongoose.set("strictQuery", true);

const swaggerOptions = {
    definition: {
        openapi: '3.0.0.',
        info: {
            title: 'Kitab Lovers Ecommerce App',
            description: 'API Docs for Kitab Lovers Ecommerce App',
            version: '1.0.0'
        },
        servers: [
            {
                url: 'http://localhost:4000/'
            }
        ]
    },
    apis: ['./server.js']
}

const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to mongodb!");
    } catch(error) {
        console.log(error);
    }
};

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
 *          example:
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

app.listen(process.env.PORT,() => {
    connect();
    console.log("Backend Server is running!");
});