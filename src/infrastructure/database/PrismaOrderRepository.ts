import { Order } from "../../domain/entities/Order"
import { OrderRepository } from "../../domain/repositories/OrderRepository"
import { prisma } from "./prisma"

export class PrismaOrderRepository implements OrderRepository {

  async create(order: Order): Promise<Order> {

    const newOrder = await prisma.orders.create({
      data: {
        total: order.total,
        status: order.status,
        address: order.address
      }
    })

    return {
      id: newOrder.id,
      total: newOrder.total,
      status: newOrder.status,
      address: newOrder.address,
      createdAt: newOrder.createdAt
    }
  }

  async update(order: Order): Promise<Order> {
  
      if (!order.id) {
       throw new Error("Order id is required for update")
        }
    const updatedOrder = await prisma.orders.update({
      where: { id: order.id },
      data: {
        total: order.total,
        status: order.status,
        address: order.address
      }
    })

    return updatedOrder
  }

  async getById(id: number): Promise<Order | null> {

    const order = await prisma.orders.findUnique({
      where: { id }
    })

    return order
  }

  async delete(id: number): Promise<Order> {

    const deletedOrder = await prisma.orders.delete({
      where: { id }
    })

    return deletedOrder
  }

  async getAll(): Promise<Order[]> {

    const orders = await prisma.orders.findMany()

    return orders
  }

}