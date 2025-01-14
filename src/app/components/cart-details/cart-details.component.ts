import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/cartItem.interface';
import { Subscription } from 'rxjs';

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
    private subscriptions: Subscription[] = [];

    cartItems: CartItem[] = [];
    totalPrice: number = 0;
    totalQuantity: number = 0;

    

    ngOnInit(): void {
      this.cartDetails();  
    }

    cartDetails(): void {
      this.subscriptions.push(this.cartService.cartItems$.subscribe(items => this.cartItems = items));
      this.subscriptions.push(this.cartService.totalPrice$.subscribe(price => this.totalPrice = price));
      this.subscriptions.push(this.cartService.totalQuantity$.subscribe(quanity => this.totalQuantity = quanity));
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
