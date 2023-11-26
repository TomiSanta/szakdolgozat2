import { Product } from "./product.model";

export interface Order {
    id: string,
    fullName: string,
    email: string,
    phoneNumber: string,
    address: string,
    description: string,
    orderDate: string,
    fullPrice: number,
    orderList: Product[]
}