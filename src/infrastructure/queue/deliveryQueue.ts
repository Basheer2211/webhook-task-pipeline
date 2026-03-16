import { Queue } from "bullmq"

export const deliveryQueue = new Queue("deliveryQueue", {
  connection: {
    host: "127.0.0.1",
    port: 6379
  }
})