import { Queue } from "bullmq"

export const deliveryQueue = new Queue("deliveryQueue", {
  connection: {
    host: process.env.REDIS_HOST || "redis",
    port: Number(process.env.REDIS_PORT) || 6379
  }
})