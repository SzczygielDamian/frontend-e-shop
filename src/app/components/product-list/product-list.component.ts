import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.interface';
import { ActivatedRoute } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-product-list',
  standalone: false,
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent implements OnInit {

  productsSignal = signal<Product[] | []>([]);
  currentCategoryId: number = 1;
  pageNumber: number = 0;
  pageSize: number = 10;
  totalElements: number = 0;
  private productService = inject(ProductService);
  private route =  inject(ActivatedRoute);


  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      if (this.route.snapshot.paramMap.has('keyword')) {
        this.getSearchProducts();
      } else {
        this.getProductsList();
      }
      
    })
  }

  getProductsList() {
    this.currentCategoryId = this.route.snapshot.paramMap.has('id') ? +this.route.snapshot.params['id'] : 1;
    this.productService.getProductList(this.currentCategoryId, this.pageNumber, this.pageSize).subscribe(data => {
      this.productsSignal.set(data._embedded.products);
      this.pageNumber = data.page.number;
      this.pageSize = data.page.size;
      this.totalElements = data.page.totalElements;
    })
  }

  getSearchProducts() {
    this.productService.searchProducts(this.route.snapshot.paramMap.get('keyword') as string, this.pageNumber, this.pageSize).subscribe(data => {
      this.productsSignal.set(data._embedded.products);
      this.pageNumber = data.page.number;
      this.pageSize = data.page.size;
      this.totalElements = data.page.totalElements;
    });
  }

  pageChanged(event: PageEvent) {
    this.productService.getProductList(this.currentCategoryId, event.pageIndex, event.pageSize).subscribe(data => {
      this.productsSignal.set(data._embedded.products);
      this.pageNumber = data.page.number;
      this.pageSize = data.page.size;
      this.totalElements = data.page.totalElements;
    })
  }
}
