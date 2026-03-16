import { Order } from "../../domain/entities/Order"
import { orderQueue } from "../../infrastructure/queue/OrderQueue"
export class StorageInQueue {
  public constructor(){}

  async execute(order: Order): Promise<any> {

    const job=await orderQueue.add("process-order", order)
    return {
      status: "queued"
    }
    
  }

}
