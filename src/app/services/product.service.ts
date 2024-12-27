import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from '../models/product.interface';
import { GetResponse } from '../models/getResponse.interface';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = "http://localhost:8080/api/";

  constructor(private httpClient: HttpClient) { }

  getProductList(theCategoryId: number): Observable<Product[]> {
    return this.httpClient.get<GetResponse>(this.baseUrl + "products/search/findByCategoryId?id=" + theCategoryId).pipe(
      map(res => res._embedded.products)
    );
  }
}
