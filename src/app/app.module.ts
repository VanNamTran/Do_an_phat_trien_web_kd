import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule, RountingComponents, routes } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AccResetComponent } from './acc-reset/acc-reset.component';
import { NewPasswordComponent } from './new-password/new-password.component';
import { AccInfoComponent } from './acc-info/acc-info.component';
import { AccInfoChangeComponent } from './acc-info-change/acc-info-change.component';
import { ConfirmPasswordComponent } from './confirm-password/confirm-password.component';

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
import { LaptopComponent } from './laptop/laptop.component';
import { TabletsComponent } from './tablets/tablets.component';
import { RouterModule } from '@angular/router';
import { LaptopDetailComponent } from './laptop-detail/laptop-detail.component';
import { WatchComponent } from './watch/watch.component';
import { EarphoneComponent } from './earphone/earphone.component';
import { TabletDetailComponent } from './tablet-detail/tablet-detail.component';
import { WatchDetailComponent } from './watch-detail/watch-detail.component';
import { EarphoneDetailComponent } from './earphone-detail/earphone-detail.component';



@NgModule({
  declarations: [
    AppComponent,
    RountingComponents,
    RegisterComponent,
    LoginComponent,
    AccResetComponent,
    NewPasswordComponent,
    AccInfoComponent,
    AccInfoChangeComponent,
    ConfirmPasswordComponent,
    HeaderComponent,
    SubheaderComponent,
    FooterComponent,
    PopupLoginComponent,
    CartComponent,
    PaymentComponent,

    NotFoundComponent,
    PaymentTransferComponent,
    ProductsViewComponent,
    // BreadcrumbComponent
    NotDevelopedFeatureComponent,
    ProductDetailComponent,
    LaptopComponent,
    TabletsComponent,
    LaptopDetailComponent,
    WatchComponent,
    EarphoneComponent,
    TabletDetailComponent,
    WatchDetailComponent,
    EarphoneDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
