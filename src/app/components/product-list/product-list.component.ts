import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.interface';
import { ActivatedRoute } from '@angular/router';

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
  private productService = inject(ProductService);
  private route =  inject(ActivatedRoute);

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.getProductsList();
    })
  }

  getProductsList() {
    this.currentCategoryId = this.route.snapshot.paramMap.has('id') ? +this.route.snapshot.params['id'] : 1;
    this.productService.getProductList(this.currentCategoryId).subscribe(data => {
      this.productsSignal.set(data);
    })
  }
}
