import { Injectable } from '@angular/core';
import { environmet } from '../../environmets/environmet';
import { HttpClient } from '@angular/common/http';
import { OrderHistory } from '../models/orderHistory.interace';
import { GetResponse } from '../models/getResponse.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderHistoryService {

   private baseUrl = environmet.baseUrl;
  
    constructor(private httpClient: HttpClient) { }
  
   getOrderHistory(email: string, page: number, pageSize: number): Observable<GetResponse<'orders', OrderHistory>> {
      return this.httpClient.get<GetResponse<'orders', OrderHistory>>(`${this.baseUrl}orders/search/findByCustomerEmailOrderByDateCreatedDesc?email=${email}&page=${page}&size=${pageSize}`);
    }
}
