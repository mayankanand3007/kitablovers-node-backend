import warehouseCity from "../models/warehouseCityModel.js";

// Create Warehouse City
export const createWarehouseCityInventory = async (req, res, next) => {
    try {
        const newWarehouseCity = new warehouseCity ({
            ...req.body,
        });
        await newWarehouseCity.save();
        res.status(201).send("Warehouse City has been added.");
    } catch(err) {
        next(err);
    }
}

// Get Books Inventories
export const getAllWarehouseCities = async (req, res, next) => {
    try{
        const warehouse_cities = await warehouseCity.find();
        res.status(201).send(warehouse_cities);
    } catch(err) {
        next(err);
    }
} 