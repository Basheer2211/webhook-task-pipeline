export interface Order {
  id?: number
  total: number
  address: string
  status: string
  createdAt?: Date
}