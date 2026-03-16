import { Queue } from "bullmq"

export const accountingQueue = new Queue("accountingQueue", {
  connection: {
    host: "127.0.0.1",
    port: 6379
  }
})