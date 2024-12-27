import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Product } from '../../../models/product.interface';

@Component({
  selector: 'app-product',
  standalone: false,
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductComponent {
    product = input.required<Product>();
}
