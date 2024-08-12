import express from "express"
import router from "./routes/routes.js"
import cors from "cors"

const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173/',
    optionsSuccessStatus: 200 
}))

app.use("/", router)



export default app