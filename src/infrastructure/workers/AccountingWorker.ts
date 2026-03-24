import { Worker } from "bullmq"
import { PrismaOrderRepository } from "../database/PrismaOrderRepository"
import { OrderStatus } from "../../domain/enums/OrderStatus"

const repository = new PrismaOrderRepository()

new Worker(
  "accountingQueue",
  async (job) => {
    try {
      console.log(`Processing accounting for order: ${job.data.id}`)

      if (Math.random() < 0.5) {
        throw new Error(`Accounting system failed for order ${job.data.id}`)
      }

      await repository.updateStatus(job.data.id, OrderStatus.ACCOUNTING)
      console.log(`Accounting completed successfully for order: ${job.data.id}`)

    } catch (error) {
      console.error(`Accounting failed for order: ${job.data.id}`, error)

      await repository.updateStatus(job.data.id, OrderStatus.FAILED)

      throw error
    }
  },
  {
    connection: { host: process.env.REDIS_HOST || "redis", port: 6379 },
  }
)