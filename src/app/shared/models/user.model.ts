import { Product } from "./product.model";

export interface User {
    id?: string;
    fullName: string;
    nickname: string,
    email: string;
    password: string;
    phoneNumber: string;
    country: string;
    address: string;
    sex?: string;
    cartList: Array<Product>;
}