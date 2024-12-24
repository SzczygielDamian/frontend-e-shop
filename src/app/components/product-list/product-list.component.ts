import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.interface';

@Component({
  selector: 'app-product-list',
  standalone: false,

  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent implements OnInit {

  productsSignal = signal<Product[] | []>([]);
  displayedColumns: string[] = ['img', 'name', 'price', 'unitsInStock']
  private productService = inject(ProductService);

  ngOnInit(): void {
    this.getProductsList();
  }

  getProductsList() {
    this.productService.getProductList().subscribe(data => {
      this.productsSignal.set(data);
    })
  }
}
