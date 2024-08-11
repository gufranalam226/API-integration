import app from "./app.js"
import { connectDB } from "./database/index.js"
import { apiError } from "./utils/apiError.js"
import dotenv  from "dotenv"

dotenv.config({
    path : "./.env"
})
const PORT = process.env.PORT

connectDB().then(()=>{
    try {
        app.listen(PORT, ()=>{
            console.log(`Server is running on port no. - ${PORT}`)
        })    
    } catch (err) {
        throw new apiError(401, "Unable to establish server")
    }
}).catch((err)=>{
    console.log("Something went worng ", err )
})
