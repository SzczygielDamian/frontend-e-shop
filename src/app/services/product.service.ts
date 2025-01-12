import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from '../models/product.interface';
import { GetResponse } from '../models/getResponse.interface';
import { ProductCategory } from '../models/productCategory.interface';
import { environmet } from '../../environmets/environmet';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = environmet.baseUrl;

  constructor(private httpClient: HttpClient) { }

  getProductList(theCategoryId: number, page: number, pageSize: number): Observable<GetResponse<'products', Product>> {

    const url = `${this.baseUrl}products/search/findByCategoryId?id=${theCategoryId}`+ 
                `&page=${page}&size=${pageSize}`

    return this.httpClient.get<GetResponse<'products', Product>>(url);
  }

  searchProducts(name: string, page: number, pageSize: number): Observable<GetResponse<'products', Product>> {
    const url = `${this.baseUrl}products/search/findByNameContaining?name=${name}` + 
                `&page=${page}&size=${pageSize}`
    
    return this.httpClient.get<GetResponse<'products', Product>>(url);
  }

  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient.get<GetResponse<'productCategory', ProductCategory>>(this.baseUrl + 'product-category').pipe(
      map(res => res._embedded.productCategory)
    );
  }

  getProduct(id: number): Observable<Product> {
    return this.httpClient.get<Product>(this.baseUrl + 'products/' + id);
  }
}
