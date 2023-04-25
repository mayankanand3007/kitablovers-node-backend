import warehouseCity from "../../models/books/warehouseCityModel.js";
import catchAsyncErrors from "../../middleware/catchAsyncErrors.js";

// Create Warehouse City
export const createWarehouseCityInventory = catchAsyncErrors(async (req, res, next) => {
    const newWarehouseCity = new warehouseCity ({
        ...req.body,
    });
    await newWarehouseCity.save();
    res.status(201).send("Warehouse City has been added.");
});

// Get All Warehouse Cities
export const getAllWarehouseCities = catchAsyncErrors(async (req, res, next) => {
    const warehouse_cities = await warehouseCity.find();
    let warehouseCity_resp = [];
    for (let warehouse_city in warehouse_cities) {
        warehouseCity_resp.push(
            {
                id: warehouse_cities[warehouse_city]._id,
                name: warehouse_cities[warehouse_city].name,
            });
    }
    res.status(201).send(warehouseCity_resp);
});

// Get Warehouse City by ID
export const getWarehouseCity = catchAsyncErrors(async (req, res, next) => {
    const warehouse_cities = await warehouseCity.findById(req.params.id);

    if(!warehouse_cities){
        return next(new ErrorHandler("Warehouse City not found.", 404));
    }

    res.status(200).json({
        success:true,
        warehouse_cities
    });
});


// Update Warehouse City by ID
export const updateWarehouseCity = catchAsyncErrors(async (req, res, next) => {
    let warehouse_cities = warehouseCity.findById(req.params.id);

    if(!warehouse_cities) {
        return next(new ErrorHandler("Warehouse City not found.", 404));
    }

    warehouse_cities = await warehouseCity.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindandModify:false
    });

    res.status(200).json({
        success:true,
        warehouse_cities
    });
    
 });

// Delete Warehouse City by ID
export const deleteWarehouseCity = catchAsyncErrors(async (req, res, next) => {
    const warehouse_cities = await warehouseCity.findById(req.params.id);

    if(!warehouse_cities){
        return res.status(500).json({
            success:false,
            message:"Warehouse City not found."
        })
    }
    
    await warehouse_cities.remove();

    res.status(200).json({
        success:true,
        message:"Warehouse City deleted successfully."
    })
});