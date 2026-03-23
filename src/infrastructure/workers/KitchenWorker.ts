import { Worker } from "bullmq"
import { processingOrder } from "../../application/use-cases/processingOrder"
import { PrismaOrderRepository } from "../database/PrismaOrderRepository"
import {OrderStatus} from "../../domain/enums/OrderStatus"

const repository = new PrismaOrderRepository()
const storage = new processingOrder(repository)
new Worker(
  "kitchenQueue",
  async (job) => {

    console.log("Send order to kitchen:", job.data)

    if (Math.random() < 0.5) {
      throw new Error("Kitchen system failed")
    }

    console.log("Cooking started")
    await repository.updateStatus(job.data.id, OrderStatus.KITCHEN)

  },
  {
    connection: {
      host: process.env.REDIS_HOST || "redis",
      port: 6379
    }
  }
)