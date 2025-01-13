import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../models/product.interface';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/cartItem.interface';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-product-details',
  standalone: false,
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDetailsComponent implements OnInit {
  private productService = inject(ProductService);
  private cartService = inject(CartService);        
  private route = inject(ActivatedRoute);
  productSignal = signal<Product | null>(null);

  ngOnInit(): void {
   this.getProduct();
  }

  getProduct() {
    const productId: number = +this.route.snapshot.params['id'];
    this.productService.getProduct(productId).pipe(take(1)).subscribe(data => this.productSignal.set(data));
  }

   
  
  addToCart(item: Product) {
    const cartItem: CartItem = {
      id: item.id,
      name: item.name,
      imageUrl: item.imageUrl,
      unitPrice: parseFloat(item.unitPrice),
      _quantity: 1,
    }
    this.cartService.addToCart(cartItem);
  }
}
