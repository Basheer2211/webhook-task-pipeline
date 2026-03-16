import { Worker } from "bullmq"

new Worker("deliveryQueue", async (job) => {

  console.log("Send order to delivery:", job.data)
  if (Math.random() < 0.5) {
    throw new Error("Delivery system failed")
  }
},
{
    connection: {
      host: "127.0.0.1",
      port: 6379
    }
  })