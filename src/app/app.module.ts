import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ProductListComponent } from './components/product-list/product-list.component';
import { provideHttpClient } from '@angular/common/http';
import { ProductService } from './services/product.service';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SearchComponent } from './components/header/search/search.component';
import { CartSectionComponent } from './components/header/cart-section/cart-section.component';
import { MaterialModule } from './material.module';
import { EshopComponent } from './components/eshop/eshop.component';
import { ProductComponent } from './components/product-list/product/product.component';

@NgModule({
  declarations: [
    AppComponent,
    CartSectionComponent,
    EshopComponent,
    FooterComponent,
    HeaderComponent,
    ProductListComponent,
    ProductComponent,
    SidebarComponent,
    SearchComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule
  ],
  providers: [
    provideAnimationsAsync(),
    provideHttpClient(),
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
