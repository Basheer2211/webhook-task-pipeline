import { Worker } from "bullmq"
import { PrismaOrderRepository } from "../database/PrismaOrderRepository"
import { OrderStatus } from "../../domain/enums/OrderStatus"

const repository = new PrismaOrderRepository()

new Worker(
  "deliveryQueue",
  async (job) => {
    try {
      console.log("Processing delivery for order:", job.data.id)

      // محاكاة فشل 50% من الوقت
      if (Math.random() < 0.5) {
        throw new Error("Delivery system failed")
      }

      // بعد نجاح المعالجة، نغيّر الـ status
      await repository.updateStatus(job.data.id, OrderStatus.DELIVERY)
      console.log("Delivery started for order:", job.data.id)

    } catch (error) {
      console.error("Delivery failed for order:", job.data.id, error)

      // حدد status FAILED
      await repository.updateStatus(job.data.id, OrderStatus.FAILED)

      // أرجع الخطأ ليقوم BullMQ بالـ retry
      throw error
    }
  },
  {
    connection: { host: process.env.REDIS_HOST || "redis", port: 6379 }
  }
)