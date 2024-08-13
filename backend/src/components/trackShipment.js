import {asyncHandler} from "../utils/asyncHandler.js"
import {apiError} from "../utils/apiError.js"
import { configDotenv, parse } from "dotenv"
import axios from "axios"

configDotenv({
    path : "./.env"
})

const trackShipment = asyncHandler(async(req, res)=>{
    const {waybill, order_id} = req.body
    console.log(waybill, order_id)

    if(!waybill && !order_id){
        throw new apiError(400, "Waybill or order_id is required")
    }
    const API_TOKEN = process.env.API_TOKEN
    
    const url = `https://track.delhivery.com/api/v1/packages/json/?${waybill?"waybill":"ref_ids"}=${waybill?waybill:order_id}`
    if (!API_TOKEN) {
        throw new apiError(500, "API Token is missing or undefined");
    }
    // console.log(API_TOKEN)
    const options = {
        headers: {
            "Content-Type":"application/json",
            "Authorization": `Token ${API_TOKEN}`
        }
    }

    const response = await axios.get(url, options)
    // if(response.data.delivery_codes.length === 0){
    //     return res.status(200).json({"Message" : "Either invalid pincode or delivery is not available"})
    // }
    // const filterResponse = response.data.delivery_codes[0].postal_code;
    // console.log(filterResponse)
    // response.data.ShipmentData[0].Shipment
    if(response.data?.Error){
        throw new apiError(201, "Details not find with this order id")
    }
    const userResponse = response.data.ShipmentData[0].Shipment

    
    return res.status(200).json(userResponse)

})


export {trackShipment}