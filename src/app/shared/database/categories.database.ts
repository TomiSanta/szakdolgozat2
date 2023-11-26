import { Category } from "../models/category.model";

export const CATEGORIES: Category[] = [
    {
        title: 'product list',
        icon: 'list',
        value: 'product-list',
        color: '#003366',
        url: '/home/products'
    },
    {
        title: 'cart',
        icon: 'shopping_cart',
        value: 'cart',
        color: 'teal',
        url: '/home/cart'
    },
];