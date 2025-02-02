import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-shopping-summary',
  standalone: false,
  templateUrl: './shopping-summary.component.html',
  styleUrl: './shopping-summary.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShoppingSummaryComponent {
  _customer = input.required<any>();
  _shippingAddress = input.required<any>();
  _creditCard = input.required<any>();
}
