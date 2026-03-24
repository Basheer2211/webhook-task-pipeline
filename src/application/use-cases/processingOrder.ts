import { Order } from "../../domain/entities/Order"
import  {OrderRepository} from "../../domain/repositories/OrderRepository"
import {OrderStatus} from "../../domain/enums/OrderStatus"
export class processingOrder {
  public constructor(private OrderRepository:OrderRepository){}
   async create(order: Order): Promise<Order> {

    const savedOrder = await this.OrderRepository.create(order)

    return savedOrder

  }

  
    async update(order: Order): Promise<{ success: boolean; message: string; order?: Order }> {
  if (!order.id) {
    return { success: false, message: "Order id is required for update" }
  }

  const existingOrder = await this.OrderRepository.getById(order.id)
  if (!existingOrder) {
    return { success: false, message: "Order not found" }
  }

  if (existingOrder.status !== OrderStatus.PENDING) {
    return { success: false, message: "Only orders with PENDING status can be updated" }
  }

  const updatedOrder = await this.OrderRepository.update(order)
  return { success: true, message: "Order updated successfully", order: updatedOrder }
}
  
    async getById(id: number): Promise<Order | null> {
  
      const order = await this.OrderRepository.getById(id);
      if(!order){
        throw new Error("Order not found");
      }
  
      return order
    }
  
   async delete(id: number): Promise<{ success: boolean; message: string; order?: Order }> {
  const existingOrder = await this.OrderRepository.getById(id)
  
  if (!existingOrder) {
    return { success: false, message: "Order not found" }
  }

  if (existingOrder.status !== OrderStatus.PENDING) {
    return { success: false, message: "Only orders with PENDING status can be deleted" }
  }

  const deletedOrder = await this.OrderRepository.delete(id)
  return { success: true, message: "Order deleted successfully", order: deletedOrder }
}
  
    async getAll(): Promise<Order[]> {
  
      const orders = await this.OrderRepository.getAll();
  
      return orders
    }
}