import { Worker } from "bullmq"
import { PrismaOrderRepository } from "../database/PrismaOrderRepository"
import { OrderStatus } from "../../domain/enums/OrderStatus"

const repository = new PrismaOrderRepository()

new Worker(
  "accountingQueue",
  async (job) => {
    try {
      console.log(`Processing accounting for order: ${job.data.id}`)

      // محاكاة فشل 50% من الوقت
      if (Math.random() < 0.5) {
        throw new Error(`Accounting system failed for order ${job.data.id}`)
      }

      // بعد نجاح المعالجة، نحدث status
      await repository.updateStatus(job.data.id, OrderStatus.ACCOUNTING)
      console.log(`Accounting completed successfully for order: ${job.data.id}`)

    } catch (error) {
      console.error(`Accounting failed for order: ${job.data.id}`, error)

      // نحدد status FAILED
      await repository.updateStatus(job.data.id, OrderStatus.FAILED)

      // إعادة رمي الخطأ ليقوم BullMQ بالـ retry تلقائياً
      throw error
    }
  },
  {
    connection: { host: process.env.REDIS_HOST || "redis", port: 6379 },
  }
)