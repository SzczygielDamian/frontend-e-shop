import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-cart-section',
  standalone: false,
  templateUrl: './cart-section.component.html',
  styleUrl: './cart-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartSectionComponent {

}
