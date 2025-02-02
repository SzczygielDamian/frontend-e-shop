import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Purchase } from '../models/purchase.interace';
import { Observable } from 'rxjs';
import { environmet } from '../../environmets/environmet';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  private httpClient = inject(HttpClient)

  placeOrder(purchase: Purchase): Observable<any> {
    return this.httpClient.post<Purchase>(environmet.baseUrl + 'checkout/purchase', purchase);
  }
}
