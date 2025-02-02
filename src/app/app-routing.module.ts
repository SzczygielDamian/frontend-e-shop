import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CheckOutComponent } from './components/check-out/check-out.component';

const routes: Routes = [
  { path: 'check-out', component: CheckOutComponent },
  { path: 'cart-details', component: CartDetailsComponent },
  { path: 'product/:id', component: ProductDetailsComponent },
  { path: 'category/:id', component: ProductListComponent },
  { path: 'search/:keyword', component: ProductListComponent },
  { path: 'products', component: ProductListComponent },
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: '**', redirectTo: '/products', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot([...routes], {
      bindToComponentInputs: true,
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
