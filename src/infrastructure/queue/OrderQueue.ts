import { Queue } from "bullmq";

export const orderQueue = new Queue("orderQueue", {
  connection: {
    host: process.env.REDIS_HOST || "127.0.0.1",
    port: Number(process.env.REDIS_PORT) || 6379
  }
});