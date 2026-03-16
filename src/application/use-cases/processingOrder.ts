import { Order } from "../../domain/entities/Order"
import  {OrderRepository} from "../../domain/repositories/OrderRepository"

export class processingOrder {
  public constructor(private OrderRepository:OrderRepository){}
   async create(order: Order): Promise<Order> {

    const savedOrder = await this.OrderRepository.create(order)

    return savedOrder

  }

  
    async update(order: Order): Promise<Order> {
      if (!order.id) {
      throw new Error("Order id is required for update")
    }
      const updatedOrder = await this.OrderRepository.update(order)
  
      return updatedOrder
    }
  
    async getById(id: number): Promise<Order | null> {
  
      const order = await this.OrderRepository.getById(id);
  
      return order
    }
  
    async delete(id: number): Promise<Order> {
  
      const deletedOrder = await this.OrderRepository.delete(id);
  
      return deletedOrder
    }
  
    async getAll(): Promise<Order[]> {
  
      const orders = await this.OrderRepository.getAll();
  
      return orders
    }
}