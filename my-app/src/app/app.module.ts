import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, RountingComponents } from './app-routing.module';
import { AppComponent } from './app.component';

import { HeaderComponent } from './header/header.component';
import { SubheaderComponent } from './subheader/subheader.component';
import { FooterComponent } from './footer/footer.component';
import { PopupLoginComponent } from './popup-login/popup-login.component';
import { CartComponent } from './cart/cart.component';
import { PaymentComponent } from './payment/payment.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PaymentTransferComponent } from './payment-transfer/payment-transfer.component';
import { ProductsViewComponent } from './products-view/products-view.component';
// import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { NotDevelopedFeatureComponent } from './not-developed-feature/not-developed-feature.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';


@NgModule({
  declarations: [
    AppComponent,

    HeaderComponent,
    SubheaderComponent,
    FooterComponent,
    PopupLoginComponent,
    CartComponent,
    PaymentComponent,
    RountingComponents,
    NotFoundComponent,
    PaymentTransferComponent,
    ProductsViewComponent,
    // BreadcrumbComponent

    NotDevelopedFeatureComponent,
    ProductDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
