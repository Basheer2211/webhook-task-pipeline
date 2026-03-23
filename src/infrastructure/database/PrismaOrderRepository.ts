import { Order } from "../../domain/entities/Order"
import { OrderRepository } from "../../domain/repositories/OrderRepository"
import { prisma } from "./prisma"
import { OrderStatus } from "../../domain/enums/OrderStatus"

export class PrismaOrderRepository implements OrderRepository {
  private mapToOrder(order: any): Order {
  return {
    id: order.id,
    total: order.total,
    status: order.status,
    address: order.address,
    createdAt: order.createdAt
  }
}

  async create(order: Order): Promise<Order> {

    const newOrder = await prisma.orders.create({
      data: {
        total: order.total,
        status:  OrderStatus.PENDING ,
        address: order.address
      }
    })

   return this.mapToOrder(newOrder)
  }

  async update(order: Order): Promise<Order> {
  
      if (!order.id) {
       throw new Error("Order id is required for update")
        }
     const updatedOrder = await prisma.orders.update({
    where: { id: order.id },
    data: {
      ...(order.total !== undefined && { total: order.total }),
      ...(order.address && { address: order.address })
    }
  })

  return this.mapToOrder(updatedOrder)
  }

  async getById(id: number): Promise<Order | null> {

    const order = await prisma.orders.findUnique({
      where: { id }
    })

    return this.mapToOrder(order)
  }

  async delete(id: number): Promise<Order> {

    const deletedOrder = await prisma.orders.delete({
      where: { id }
    })

    return this.mapToOrder(deletedOrder)
  }

async getAll(): Promise<Order[]> {
  const orders = await prisma.orders.findMany()

  return orders.map(order => this.mapToOrder(order))
}
  async updateStatus(id:number, status:OrderStatus){
      const updatedOrder = await prisma.orders.update({
    where: { id },
    data: {
      status
    }
  })

  return this.mapToOrder(updatedOrder)
  }
}