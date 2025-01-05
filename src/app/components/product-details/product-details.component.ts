import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../models/product.interface';

@Component({
  selector: 'app-product-details',
  standalone: false,
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDetailsComponent implements OnInit  {

  private productService = inject(ProductService);
  private route = inject(ActivatedRoute);
  productSignal = signal<Product | null>(null);

  ngOnInit(): void {
   this.getProduct();
  }

  getProduct() {
    const productId: number = +this.route.snapshot.params['id'];
    this.productService.getProduct(productId).subscribe(data => this.productSignal.set(data));
  }

}
