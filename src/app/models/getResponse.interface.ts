import { Product } from "./product.interface"

export interface GetResponse<K extends string | number, V> {
    _embedded: {
        [key in K]: V[];
    }
}