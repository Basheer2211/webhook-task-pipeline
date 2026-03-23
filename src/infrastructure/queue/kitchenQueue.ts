import { Queue } from "bullmq"

export const kitchenQueue = new Queue("kitchenQueue", {
  connection: {
    host: process.env.REDIS_HOST || "redis",
    port: Number(process.env.REDIS_PORT) || 6379
  }
})