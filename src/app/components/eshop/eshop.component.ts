import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-eshop',
  standalone: false,
  templateUrl: 'eshop.component.html',
  styleUrl: './eshop.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EshopComponent { }
