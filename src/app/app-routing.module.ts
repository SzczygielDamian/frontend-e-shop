import { Injector, NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CheckOutComponent } from './components/check-out/check-out.component';

import { OktaAuthModule, OktaCallbackComponent, OKTA_CONFIG, OktaAuthGuard } from '@okta/okta-angular';

import { OktaAuth } from '@okta/okta-auth-js'; 

import myAppConfig from './config/my-app-config';
import { LoginComponent } from './components/login/login.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { OrderHistoryDetailsComponent } from './components/order-history-details/order-history-details.component';

const oktaConfig = myAppConfig.oidc;

const oktaAuth = new OktaAuth(oktaConfig);

function sendToLoginPage(oktaAuth: OktaAuth, injcetor: Injector) {
  const router = injcetor.get(Router);

  router.navigate(['/login']);
}

const routes: Routes = [
  { path: 'order-history-details', component: OrderHistoryDetailsComponent, canActivate: [ OktaAuthGuard ],
    data: { onAuthRequiared: sendToLoginPage }
  },
  { path: 'orders-history', component: OrderHistoryComponent, canActivate: [ OktaAuthGuard ],
    data: { onAuthRequiared: sendToLoginPage }
  },
  { path: 'login/callback', component: OktaCallbackComponent },
  { path: 'login', component: LoginComponent },
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
    }),
    OktaAuthModule,
  ],
  providers: [{
    provide: OKTA_CONFIG, useValue: { oktaAuth }}
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
