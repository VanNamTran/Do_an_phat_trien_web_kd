import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AccResetComponent } from './acc-reset/acc-reset.component';
import { NewPasswordComponent } from './new-password/new-password.component';
import { AccInfoComponent } from './acc-info/acc-info.component';
import { AccInfoChangeComponent } from './acc-info-change/acc-info-change.component';
import { ConfirmPasswordComponent } from './confirm-password/confirm-password.component';

import { CartComponent } from './cart/cart.component';
import { PaymentComponent } from './payment/payment.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PaymentTransferComponent } from './payment-transfer/payment-transfer.component';
import { ProductsViewComponent } from './products-view/products-view.component';
import { NotDevelopedFeatureComponent } from './not-developed-feature/not-developed-feature.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { LaptopComponent } from './laptop/laptop.component';
import { TabletsComponent } from './tablets/tablets.component';
import { LaptopDetailComponent } from './laptop-detail/laptop-detail.component';
import { WatchComponent } from './watch/watch.component';
import { EarphoneComponent } from './earphone/earphone.component';
import { TabletDetailComponent } from './tablet-detail/tablet-detail.component';
import { WatchDetailComponent } from './watch-detail/watch-detail.component';
import { EarphoneDetailComponent } from './earphone-detail/earphone-detail.component';
// import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';

export const routes: Routes = [

  {path:"cart",component:CartComponent},
  {path:"payment",component:PaymentComponent},
  {path:"payment/payment-transfer",component:PaymentTransferComponent},
  // {path:"breadcrumb",component:BreadcrumbComponent},
  {path:"products-view",component:ProductsViewComponent},
  {path: 'not-developed-feature', component: NotDevelopedFeatureComponent},
  {path: 'products-view/:id', component: ProductDetailComponent},
  {path:'dangky', component: RegisterComponent},
  {path:'dangnhap', component: LoginComponent},
  {path:'quenmatkhau', component: AccResetComponent},
  {path:'matkhaumoi', component: NewPasswordComponent},
  {path:'thongtin', component: AccInfoComponent},
  {path:"capnhatthongtin", component: AccInfoChangeComponent},
  {path:"xacnhan", component: ConfirmPasswordComponent},
  {path: "laptop", component: LaptopComponent},
  {path: "laptop/:id", component: LaptopDetailComponent},
  {path: "tablets", component: TabletsComponent},
  {path: "tablets/:id", component: TabletDetailComponent},
  {path: "watch", component: WatchComponent},
  {path: "watch/:id", component: WatchDetailComponent},
  {path: "earphone", component: EarphoneComponent},
  {path: "earphone/:id", component: EarphoneDetailComponent},
   {path:"**",component:NotFoundComponent}
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }



export const RountingComponents=[
  CartComponent,
  PaymentComponent,
  NotFoundComponent,
  PaymentTransferComponent,
  // BreadcrumbComponent,
  ProductsViewComponent,
  NotDevelopedFeatureComponent,
  ProductDetailComponent,
  RegisterComponent,
  LoginComponent,
  AccResetComponent,
  NewPasswordComponent,
  AccInfoComponent,
  AccInfoChangeComponent,
  ConfirmPasswordComponent,
  LaptopComponent,
  LaptopDetailComponent,
  TabletsComponent,
  TabletDetailComponent,
  WatchComponent,
  WatchDetailComponent,
  EarphoneComponent,
  EarphoneDetailComponent
]

