import { Queue } from "bullmq";

export const orderQueue = new Queue("orderQueue", {
  connection: {
    host: process.env.REDIS_HOST || "redis",
    port: Number(process.env.REDIS_PORT) || 6379
  }
});