import giftWrapPrice from "../../models/surpriseBox/giftwrapModel.js";
import catchAsyncErrors from "../../middleware/catchAsyncErrors.js";

// Get Gift Wrap Price
export const getGiftWrap = catchAsyncErrors(async (req, res, next) => {
    let giftWrapPrices = await giftWrapPrice.find();

    if(!giftWrapPrices[0]){
        let price = {
            "gift_wrap": false,
            "price": 0
        }
        const newGiftWrap = new giftWrapPrice(price);
        await newGiftWrap.save();
    }
    
    giftWrapPrices = await giftWrapPrice.find();

    res.status(200).json({
        success:true,
        giftWrapPrices
    });
});

// Update Gift Wrap
export const updateGiftWrapPrices = catchAsyncErrors(async (req, res, next) => {
    let giftWrapPrices = await giftWrapPrice.find();

    if(!giftWrapPrices[0]) {
        let price = {
            "gift_wrap": false,
            "price": 0
        }
        const newGiftWrap = new giftWrapPrice(price);
        await newGiftWrap.save();
    }

    giftWrapPrices = await giftWrapPrice.find();

    giftWrapPrices = await giftWrapPrice.findByIdAndUpdate(giftWrapPrices[0]._id,req.body,{
        new:true,
        runValidators:true,
        useFindandModify:false
    });

    res.status(200).json({
        success:true,
        giftWrapPrices
    });
    
 });