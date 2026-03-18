import express from "express"
import { StorageInQueue } from "../../application/use-cases/StorageInQueue"
import {processingOrder} from "../../application/use-cases/processingOrder"
import { PrismaOrderRepository } from "../../infrastructure/database/PrismaOrderRepository";
import { authMiddleware } from "../middlewares/authMiddleware"
import { verifyWebhookSignature } from "../../infrastructure/security/verifyWebhookSignature"

import { adminMiddleware } from "../middlewares/adminMiddleware"
const router = express.Router()

const storageInQueue = new StorageInQueue()
const orderRepo = new PrismaOrderRepository();  
const orderService = new processingOrder(orderRepo);

router.post("/webhook/order", async (req, res) => {
  const signature = req.headers["x-signature"] as string

  if (!signature) {
    return res.status(401).json({
      message: "Missing signature"
    })
  }

  const valid = verifyWebhookSignature(
    JSON.stringify(req.body),
    signature
  )

  if (!valid) {
    return res.status(401).json({
      message: "Invalid signature"
    })
  }


  const order = req.body

  const savedOrder = await storageInQueue.execute(order)

  res.status(200).json({
    message: "Order received",
    data: savedOrder
  })

})

router.get("/webhook/order/get/:id",authMiddleware, async (req, res) => {

  const id = Number(req.params.id)
  const order=await orderService.getById(id);

  res.json({
    message: "Order id received",
    data:order
  })

})
router.get("/webhook/order/getAllOrders",authMiddleware,adminMiddleware, async (req, res) => {
  const order=await orderService.getAll();

  res.json({
    message: "Order id received",
    data:order
  })

})
router.put("/webhook/order/update/:id",authMiddleware, async (req, res) => {

  const id = Number(req.params.id)

  const existingOrder = await orderService.getById(id)

  if (!existingOrder) {
    return res.status(404).json({
      message: "Order not found"
    })
  }

  const updatedData = {
    ...existingOrder,
    ...req.body,
    id
  }

  const order = await orderService.update(updatedData)

  res.json({
    message: "Order updated",
    data: order
  })

})
router.delete("/webhook/order/delete/:id", authMiddleware,adminMiddleware, async (req, res) => {

  const id = Number(req.params.id)

  const existingOrder = await orderService.getById(id)

  if (!existingOrder) {
    return res.status(404).json({
      message: "Order not found"
    })
  }

  await orderService.delete(id)

  res.json({
    message: "Order deleted successfully"
  })

})

export default router