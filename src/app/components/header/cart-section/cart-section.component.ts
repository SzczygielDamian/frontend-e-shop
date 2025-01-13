import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart-section',
  standalone: false,
  templateUrl: './cart-section.component.html',
  styleUrl: './cart-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartSectionComponent implements OnInit, OnDestroy {

   private cartService = inject(CartService);
   totalPrice = signal<number>(0);
   totalQuantity = signal<number>(0);

   private subscriptions: Subscription[] = [];

   ngOnInit(): void {
      this.updateCartStatus();
  }

  updateCartStatus(): void  {
    this.subscriptions.push(this.cartService.totalPrice.subscribe(price => this.totalPrice.set(price)));
    this.subscriptions.push(this.cartService.totalQuantity.subscribe(quanity => this.totalQuantity.set(quanity)));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
