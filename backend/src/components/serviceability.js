import {asyncHandler} from "../utils/asyncHandler.js"
import {apiError} from "../utils/apiError.js"
import { configDotenv } from "dotenv"
import axios from "axios"

configDotenv({
    path : "./.env"
})

const serviceability = asyncHandler(async(req, res)=>{

    const {pincode} = req.params

    if(!pincode){
        throw new apiError(400, "Pincode is required")
    }
    // const url = `https://staging-express.delhivery.com/c/api/pin-codes/json/?filter_codes=${pincode}`
    const url = `https://track.delhivery.com/c/api/pin-codes/json/?filter_codes=${pincode}`
    const API_TOKEN = process.env.API_TOKEN
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
    if(response.data.delivery_codes.length === 0){
        return res.status(200).json({"error" : "Either invalid pincode or delivery is not available"})
    }

    const responsee = await response.data
    const filterResponse = responsee.delivery_codes[0].postal_code;

    const userResponse = {
        "city" : filterResponse.city,
        "COD" : filterResponse.cod,
        "district" : filterResponse.district,
        "pin" :filterResponse.pin,
        "pre_paid" : filterResponse.pre_paid,
        "state_code" : filterResponse.state_code,
        "country_code" : filterResponse.country_code
    }

    
    return res.status(200).json(userResponse)

})


export {serviceability}