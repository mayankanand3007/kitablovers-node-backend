import mongoose from "mongoose";
const { Schema } = mongoose;

const warehouseCitySchema = new Schema({
    name: {
       type: String,
       required: [ true, "Warehouse City is required."],
       unique: [ true, "Warehouse City value should be unique."]
    }
}, {
    timestamps:true,
});

export default mongoose.model("WarehouseCity", warehouseCitySchema)