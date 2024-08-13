import Router from "express";
import { serviceability } from "../components/serviceability.js";
import {fetchWayBill} from "../components/fetchWay-Bill.js"
import { trackShipment } from "../components/trackShipment.js";
import {calculateCost} from "../components/calculateCost.js"
import {genShipLabel} from "../components/genShipLabel.js"
const router = Router()

router.route("/").get((req, res)=>{
    res.send("Hello from server")
})

router.route("/pincode/:pincode").get(serviceability)
router.route("/fetchWayBill/:count").get(fetchWayBill)
router.route("/trackShipment").get(trackShipment)
router.route("/calculateCost").get(calculateCost)
router.route("/genShipLabel/:waybill").get(genShipLabel)


export default router

