import { Order } from "../entities/Order.js"
import { mainRepositoryInterface } from "./mainRepository.js";

export interface OrderRepository extends mainRepositoryInterface<Order>
{}