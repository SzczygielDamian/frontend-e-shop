import { Product } from "./product.interface"

export interface GetResponse {
    _embedded: {
        products: Product[];
    }
}