import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { ChangeDetectionStrategy, Component, inject, input, numberAttribute, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CreditCardService } from '../../services/credit-card.service';
import { Observable, Subscription } from 'rxjs';
import { CustomValidatorsService } from '../../services/custom-validators.service';
import { Order } from '../../models/order.inteface';
import { CartItem } from '../../models/cartItem.interface';
import { CartService } from '../../services/cart.service';
import { OrderItem } from '../../models/orderItem.inteface';
import { Purchase } from '../../models/purchase.interace';
import { Customer } from '../../models/customer.interface';
import { Address } from '../../models/address.inteface';
import { CheckoutService } from '../../services/checkout.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-check-out',
  standalone: false,
  templateUrl: './check-out.component.html',
  styleUrl: './check-out.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {showError: true},
    },
    CreditCardService,
  ],
})
export class CheckOutComponent implements OnInit {

  _formBuilder = inject(FormBuilder);
  private crediCardService = inject(CreditCardService);
  private cartService = inject(CartService);
  private checkoutService = inject(CheckoutService);
  private router = inject(Router);
  
  creditCardMonth$?: Observable<number[]>;
  creditCardYear$?: Observable<number[]>;
  cartItems: CartItem[] = [];
  private subscriptions: Subscription[] = [];

  totalPrice = input(undefined, { transform: numberAttribute});
  totalQuantity = input(undefined, { transform: numberAttribute});

  customer = this._formBuilder.group({
    firstName: ['', [Validators.required, Validators.minLength(2), CustomValidatorsService.notOnlyWhitespace]],
    lastName: ['', [Validators.required, Validators.minLength(2), CustomValidatorsService.notOnlyWhitespace]],
    email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
  });
  shippingAddress = this._formBuilder.group({
    country: ['', [Validators.required, Validators.minLength(2), CustomValidatorsService.notOnlyWhitespace]],
    street: ['', [Validators.required, Validators.minLength(2), CustomValidatorsService.notOnlyWhitespace]],
    city: ['', [Validators.required, Validators.minLength(2), CustomValidatorsService.notOnlyWhitespace]],
    state: ['', [Validators.required, Validators.minLength(2), CustomValidatorsService.notOnlyWhitespace]],
    zipCode: ['', [Validators.required, Validators.pattern('^[0-9]{2}-[0-9]{3}$')]],
  });
  creditCard = this._formBuilder.group({
    cardType: ['', [Validators.required, Validators.minLength(2), CustomValidatorsService.notOnlyWhitespace]],
    nameOnCard: ['', [Validators.required, Validators.minLength(2), CustomValidatorsService.notOnlyWhitespace]],
    cardNumber: ['',  [Validators.required, Validators.pattern('^[0-9]{16}$')]],
    securityCode: ['', [Validators.required, Validators.pattern('^[0-9]{3}$')]],
    expirationMonth: ['', Validators.required],
    expirationYear: ['', Validators.required],
  });

  ngOnInit(): void {
    this.creditCardMonth$ = this.crediCardService.getCreditCardMonth();
    this.creditCardYear$ = this.crediCardService.getCreditCardYears();   

    this.subscriptions.push(this.cartService.cartItems$.subscribe(items => this.cartItems = items));
  }

  onSubmit() {
    let purchase: Purchase;
    let order: Order = {} as Order;
    
    if (typeof this.totalPrice() === 'number' && typeof this.totalQuantity() === 'number') {
        order = {
          totalQuantity: this.totalQuantity() as number,
          totalPrice: this.totalPrice() as number
        }
    }

    let orderItems: OrderItem[] = [];
    for (let i=0; i < this.cartItems.length; i++) {
      orderItems[i] = {
        imageUrl: this.cartItems[i].imageUrl,
        unitPrice: this.cartItems[i].unitPrice,
        quantity: this.cartItems[i]._quantity,
        productId: this.cartItems[i].id
      }
    }
    
    purchase = {
      customer: this.customer.value as Customer,
      shippingAddress: this.shippingAddress.value as Address,
      order,
      orderItems: orderItems
    }

    this.checkoutService.placeOrder(purchase).subscribe(
      {
        next: res => {
          this.resetCart();
        },
        error: err => {
          console.log(err.message);
        }
      }
    )
  }

  resetCart() {
    this.cartService.cartItems = [];
    this.cartService.totalPrice$.next(0);
    this.cartService.totalQuantity$.next(0);

    this.customer.reset();
    this.shippingAddress.reset();
    this.creditCard.reset();
    this.cartService.clearStorage();

    this.router.navigateByUrl("/products");
  }
}
