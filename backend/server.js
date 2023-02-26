import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bookInventoryRoute from "./routes/bookInventory.route.js";
import bookConditionRoute from "./routes/bookCondition.route.js";
import warehouseCityRoute from "./routes/warehouseCity.route.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));
dotenv.config();
mongoose.set("strictQuery", true);

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to mongodb!");
    } catch(error) {
        console.log(error);
    }
};

app.use("/api/BooksInventory", bookInventoryRoute);
app.use("/api/BookCondition", bookConditionRoute);
app.use("/api/WarehouseCity", warehouseCityRoute);

app.listen(process.env.PORT,() => {
    connect();
    console.log("Backend Server is running!");
});