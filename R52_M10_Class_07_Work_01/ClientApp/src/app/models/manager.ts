import { Product } from "./product";

export interface Manager {
    managerId?:number
    managerName?:string;
    picture?:string;
    productId?:number
    product?:Product;
}
