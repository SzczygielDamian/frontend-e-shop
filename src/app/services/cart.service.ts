import { Injectable } from '@angular/core';
import { CartItem } from '../models/cartItem.interface';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];
  totalPrice: Subject<number> = new Subject<number>;
  totalQuantity: Subject<number> = new Subject<number>;

  addToCart(newItem: CartItem): void {
    const item = this.cartItems.find(item => item.id === newItem.id);
    
    if (item) {
      item._quantity++;
    } else {
      this.cartItems.push(newItem);
    }

    this.cartTotal();
  }


  cartTotal(): void {
    let totalCountItems: number = 0;
    let totalPriceItems: number = 0;
    for (let item of this.cartItems) {
      totalCountItems += item._quantity;
      totalPriceItems += item._quantity * item.unitPrice;
    }
    this.totalPrice.next(totalPriceItems);
    this.totalQuantity.next(totalCountItems);
  }
}
