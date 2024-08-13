import {asyncHandler} from "../utils/asyncHandler.js"
import {apiError} from "../utils/apiError.js"
import { configDotenv, parse } from "dotenv"
import axios from "axios"

configDotenv({
    path : "./.env"
})

const genShipLabel = asyncHandler(async(req, res)=>{
    const {waybill} = req.params

    if(!waybill && !order_id){
        throw new apiError(400, "Waybill or order_id is required")
    }
    const API_TOKEN = process.env.API_TOKEN
    
    const url = `https://track.delhivery.com/api/p/packing_slip?wbns=${waybill}&pdf=false`
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
    
    // if(response.data?.Error){
    //     throw new apiError(201, "Details not find with this order id")
    // }
    const userResponse = response.data

    
    return res.status(200).json(userResponse)

})


export {genShipLabel}