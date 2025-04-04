import { Injectable } from '@angular/core';
import { CartItem } from '../models/cartItem.interface';
import { BehaviorSubject, ReplaySubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];
  totalPrice$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  totalQuantity$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  cartItems$: BehaviorSubject<CartItem[]> = new BehaviorSubject<CartItem[]>([]);

  addToCart(newItem: CartItem): void {
    const item = this.cartItems.find(item => item.id === newItem.id);
    
    if (item) {
      item._quantity++;
    } else {
      this.cartItems.push(newItem);
    }

    this.cartTotal();
    this.cartItems$.next(this.cartItems);
  }

  cartTotal(): void {
    let totalCountItems: number = 0;
    let totalPriceItems: number = 0;
    for (let item of this.cartItems) {
      totalCountItems += item._quantity;
      totalPriceItems += item._quantity * item.unitPrice;
    }
    this.totalPrice$.next(totalPriceItems);
    this.totalQuantity$.next(totalCountItems);
  }

  decrementalQuantity(item: CartItem): void {
      item._quantity--;
      [...this.cartItems, item]
        this.cartTotal();
  }

  removeItem(itemId: number): void {
      this.cartItems = this.cartItems.filter(item => item.id !== itemId);
      this.cartItems$.next(this.cartItems);
      this.cartTotal();
  }
}
