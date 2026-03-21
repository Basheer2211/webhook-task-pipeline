import { Worker } from "bullmq"

new Worker("deliveryQueue", async (job) => {

  console.log("Send order to delivery:", job.data)
  if (Math.random() < 0.5) {
    throw new Error("Delivery system failed")
  }
},
{
    connection: {
      host: "redis",
      port: 6379
    }
  })