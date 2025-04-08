import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CartItem } from '../../models/cartItem.interface';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-order-history-details',
  standalone: false,
  templateUrl: './order-history-details.component.html',
  styleUrl: './order-history-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderHistoryDetailsComponent {
  displayedColumns = [
    'product',
    'price',
    'quantity',
    'subtotal'
  ];

  orderItems = signal<CartItem[]>([]);

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    
    this.orderItems.set(navigation?.extras.state!.orderItems);
  }
}
