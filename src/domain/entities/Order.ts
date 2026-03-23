import {OrderStatus} from "../enums/OrderStatus"
export interface Order {
  id?: number
  total: number
  address: string
  status: OrderStatus
  createdAt?: Date
}