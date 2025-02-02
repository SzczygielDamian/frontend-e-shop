import { Address } from "./address.inteface";
import { Customer } from "./customer.interface";
import { Order } from "./order.inteface";
import { OrderItem } from "./orderItem.inteface";

export interface Purchase {
    customer: Customer;
    shippingAddress: Address;
    order: Order;
    orderItems: OrderItem[];
}