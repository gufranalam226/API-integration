import { asyncHandler } from "../utils/asyncHandler.js";

import {apiError} from "../utils/apiError.js"
import { configDotenv } from "dotenv"
import axios from "axios"

configDotenv({
    path : "./.env"
})

const fetchWayBill = asyncHandler(async(req, res)=>{
    const {count} = req.params

    if(!count){
        throw new apiError(400, "Count is required")
    }
    const API_TOKEN = process.env.API_TOKEN
    const CLIENT_NAME = process.env.CLIENT_NAME
    const url = `https://track.delhivery.com/waybill/api/bulk/json/?cl=${CLIENT_NAME}&count=${count}`
    if (!API_TOKEN || !CLIENT_NAME) {
        throw new apiError(500, "API Token or client name is missing or undefined");
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
    const filterResponse = response.data;

    const userResponse = {
        
    }

    
    return res.status(200).json(filterResponse)

})

export {fetchWayBill}