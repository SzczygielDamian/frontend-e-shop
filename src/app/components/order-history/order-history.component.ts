import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { OrderHistoryService } from '../../services/order-history.service';
import { OrderHistory } from '../../models/orderHistory.interace';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-order-history',
  standalone: false,
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderHistoryComponent implements OnInit {
  displayedColumns = [
    'ordersTrackingNumber',
    'price',
    'quantity',
    'date',
    'details'
  ];

    pageNumber: number = 0;
    pageSize: number = 10;
    totalElements: number = 0;

  ordersHistory = signal<OrderHistory[]>([]);
  storage: Storage = sessionStorage;
  userEmail: string = '';

  private orderHistoryService = inject(OrderHistoryService);
  private router = inject(Router);

  constructor() { 
    this.userEmail = JSON.parse(this.storage.getItem('userEmail') as string);
  }

  ngOnInit(): void {
    this.getOrderHistory();
  }

  getOrderHistory(): void {
    this.orderHistoryService.getOrderHistory(this.userEmail, this.pageNumber,this.pageSize).subscribe(data => {  
      this.ordersHistory.set(data._embedded.orders)
      this.pageNumber = data.page.number;
      this.totalElements = data.page.totalElements;
    });
  }

  orderHistoryDetails(order: OrderHistory): void {
    this.router.navigate(['/order-history-details'], { state:  { ...order } });
  }

  pageChanged(event: PageEvent) {
    this.orderHistoryService.getOrderHistory(this.userEmail, event.pageIndex, event.pageSize).subscribe(data => {  
      this.ordersHistory.set(data._embedded.orders)
      this.pageNumber = data.page.number;
      this.pageSize = data.page.size;
      this.totalElements = data.page.totalElements;
    });
  }
}
