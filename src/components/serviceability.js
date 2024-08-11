import {asyncHandler} from "../utils/asyncHandler.js"
import {apiError} from "../utils/apiError.js"
import { configDotenv } from "dotenv"
import axios from "axios"

configDotenv({
    path : "./.env"
})

const serviceability = asyncHandler(async(req, res)=>{
    const {pincode} = req.params
    console.log(pincode)

    if(!pincode){
        throw new apiError(400, "Pincode is required")
    }
    // const url = `https://staging-express.delhivery.com/c/api/pin-codes/json/?filter_codes=${pincode}`
    const url = `https://track.delhivery.com/c/api/pin-codes/json/?filter_codes=${pincode}`
    // const url = `https://track.delhivery.com/api/v1/packages/json/?waybill=31610010000055`
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
        return res.status(200).json({"Message" : "Either invalid pincode or delivery is not available"})
    }
    const filterResponse = response.data.delivery_codes[0].postal_code;
    console.log(filterResponse)

    const userResponse = {
        "City" : filterResponse.city,
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