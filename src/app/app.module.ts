import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ProductListComponent } from './components/product-list/product-list.component';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ProductService } from './services/product.service';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SearchComponent } from './components/header/search/search.component';
import { CartSectionComponent } from './components/header/cart-section/cart-section.component';
import { MaterialModule } from './material.module';
import { EshopComponent } from './components/eshop/eshop.component';
import { ProductComponent } from './components/product-list/product/product.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { PaginationComponent } from './shared/pagination/pagination.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ShoppingSummaryComponent } from './components/check-out/shopping-summury/shopping-summary.component';
import { LoginComponent } from './components/login/login.component';
import { LoginStatusComponent } from './components/login-status/login-status.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { OrderHistoryDetailsComponent } from './components/order-history-details/order-history-details.component';
import { AuthService } from './services/AuthServices/auth.service';
import { AuthInterceptorService } from './services/AuthServices/auth-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    CartDetailsComponent,
    CartSectionComponent,
    CheckOutComponent,
    EshopComponent,
    FooterComponent,
    HeaderComponent,
    LoginComponent,
    LoginStatusComponent,
    OrderHistoryComponent,
    OrderHistoryDetailsComponent,
    PaginationComponent,
    ProductComponent,
    ProductDetailsComponent,
    ProductListComponent,
    SidebarComponent,
    SearchComponent,
    ShoppingSummaryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  providers: [
    provideAnimationsAsync(),
    provideHttpClient(withInterceptorsFromDi()),
    ProductService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
