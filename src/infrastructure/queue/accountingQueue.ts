import { Queue } from "bullmq"

export const accountingQueue = new Queue("accountingQueue", {
  connection: {
    host: process.env.REDIS_HOST || "redis",
    port: Number(process.env.REDIS_PORT) || 6379
  }
})