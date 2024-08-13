import {asyncHandler} from "../utils/asyncHandler.js"
import {apiError} from "../utils/apiError.js"
import { configDotenv } from "dotenv"
import axios from "axios"

configDotenv({
    path : "./.env"
})



const calculateCost = asyncHandler(async(req, res)=>{
    const {md, ss, o_pin, d_pin, cgm, pt, cod} = req.body


    if(!md || !ss || !o_pin || !d_pin || !cgm || !pt){
        throw new apiError(400, "All fields is required")
    }
    const API_TOKEN = process.env.API_TOKEN
    
    const url = `https://track.delhivery.com/api/kinko/v1/invoice/charges/.json?md=${md}&ss=${ss}&d_pin=${d_pin}&o_pin=${o_pin}&cgm=${cgm}&pt=${pt}${(pt=="cod")?`&cod=${cod}`:`&cod=0`}`
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
    
    console.log(response)
    if(response.data?.error){
        throw new apiError(201, "Details not find with this order id")
    }
    const userResponse = response.data

    
    return res.status(200).json(userResponse)

})


export {calculateCost}

// "https://staging-express.delhivery.com/api/kinko/v1/invoice/charges/.json?md=E&ss=Delivered&d_pin=122015&o_pin=122002&cgm=200&pt=Pre-paid&cod=0"
                                                                          // md=E&ss=Delivered&d_pin=152012&o_pin=132103&cgm=200&pt=Pre-paid&cod=0