import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { Product } from '../../../models/product.interface';
import { CartService } from '../../../services/cart.service';
import { CartItem } from '../../../models/cartItem.interface';

@Component({
  selector: 'app-product',
  standalone: false,
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductComponent {
    product = input.required<Product>();
    private cartService = inject(CartService);        

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
