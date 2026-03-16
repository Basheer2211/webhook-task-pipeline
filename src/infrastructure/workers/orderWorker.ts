import { Worker } from "bullmq"
import { processingOrder } from "../../application/use-cases/processingOrder"
import { PrismaOrderRepository } from "../database/PrismaOrderRepository"

import { accountingQueue } from "../queue/accountingQueue"
import { kitchenQueue } from "../queue/kitchenQueue"
import { deliveryQueue } from "../queue/deliveryQueue"

const repository = new PrismaOrderRepository()
const storage = new processingOrder(repository)

new Worker(
  "orderQueue",
  async (job) => {

    console.log("Processing order:", job.data)

    const order = await storage.create(job.data)

    await accountingQueue.add("send-to-accounting", order,{
      attempts :3,
      backoff:{type:"exponential" , delay:5000}
    })
    await kitchenQueue.add("send-to-kitchen", order,{
      attempts :3,
      backoff:{type:"exponential" , delay:5000}
    })
    await deliveryQueue.add("send-to-delivery", order,{
      attempts :3,
      backoff:{type:"exponential" , delay:5000}
    })

    console.log("Order sent to all systems")

  },
  {
    connection: {
      host: "127.0.0.1",
      port: 6379
    }
  }
)