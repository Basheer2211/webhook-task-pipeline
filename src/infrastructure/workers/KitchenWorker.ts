import { Worker } from "bullmq"

new Worker(
  "kitchenQueue",
  async (job) => {

    console.log("Send order to kitchen:", job.data)

    if (Math.random() < 0.5) {
      throw new Error("Kitchen system failed")
    }

    console.log("Cooking started")

  },
  {
    connection: {
      host: "127.0.0.1",
      port: 6379
    }
  }
)