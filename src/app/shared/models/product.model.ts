export interface Product {
    id: string,
    name: string,
    brand: string,
    price: string,
    description: string,
    image: string,
    inStock: number,
    amount: number,
    inCart: boolean,
    rating: Array<any>,
}