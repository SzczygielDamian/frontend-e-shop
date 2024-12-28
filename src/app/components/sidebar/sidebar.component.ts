import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { ProductCategory } from '../../models/productCategory.interface';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent implements OnInit {
  
  productCategories = signal<ProductCategory[] | []>([]);
  private productService = inject(ProductService);

  ngOnInit(): void {
   this.listProductCategories();
  }


  listProductCategories() {
   this.productService.getProductCategories().subscribe(data => {
    this.productCategories.set(data);
   })
  }
}
