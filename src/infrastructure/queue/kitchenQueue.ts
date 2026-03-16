import { Queue } from "bullmq"

export const kitchenQueue = new Queue("kitchenQueue", {
  connection: {
    host: "127.0.0.1",
    port: 6379
  }
})