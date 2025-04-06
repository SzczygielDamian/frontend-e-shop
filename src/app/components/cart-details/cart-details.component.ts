import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/cartItem.interface';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-cart-details',
  standalone: false,
  templateUrl: './cart-details.component.html',
  styleUrl: './cart-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartDetailsComponent implements OnInit, OnDestroy {
  displayedColumns = [
    'product',
    'price',
    'quantity',
    'subtotal'
  ];
    private cartService = inject(CartService);
    private router = inject(Router);
    private subscriptions: Subscription[] = [];
    activeUrl: string = '';

    cartItems: CartItem[] = [];
    totalPrice: number = 0;
    totalQuantity: number = 0;

    ngOnInit(): void {
      this.cartDetails();
      this.activeUrl = this.router.url;
    }

    cartDetails(): void {
      this.subscriptions.push(
        combineLatest([
          this.cartService.cartItems$,
          this.cartService.totalPrice$,
          this.cartService.totalQuantity$
        ]).subscribe(([items, price, quantity]) => {
          this.cartItems = items;
          this.totalPrice = price;
          this.totalQuantity = quantity;   
        })
      );
    }

    incremental(item: CartItem): void { 
      this.cartService.addToCart(item);
    }

    decremental(item: CartItem): void {
      this.cartService.decrementalQuantity(item);   
    }

    delete(item: CartItem): void {
      this.cartService.removeItem(item.id);
    }

    ngOnDestroy() {
      this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }
}
