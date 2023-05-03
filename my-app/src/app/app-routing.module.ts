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
import { count } from 'rxjs';
import { NotFoundComponent } from './not-found/not-found.component';
import { PaymentTransferComponent } from './payment-transfer/payment-transfer.component';
import { ProductsViewComponent } from './products-view/products-view.component';
import { NotDevelopedFeatureComponent } from './not-developed-feature/not-developed-feature.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { TrangChuComponent } from './trang-chu/trang-chu.component';
import { AboutUsComponent } from './about-us/about-us.component';
// import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';

const routes: Routes = [
  {path:"cart",component:CartComponent},
  {path:"payment",component:PaymentComponent},
  {path:"payment/payment-transfer",component:PaymentTransferComponent},
  // {path:"breadcrumb",component:BreadcrumbComponent},
  {path:"products-view",component:ProductsViewComponent},
  {path: 'not-developed-feature', component: NotDevelopedFeatureComponent},
  {path: 'product-detail', component: ProductDetailComponent},
  {path:'dangky', component: RegisterComponent},
  {path:'dangnhap', component: LoginComponent},
  {path:'quenmatkhau', component: AccResetComponent},
  {path:'matkhaumoi', component: NewPasswordComponent},
  {path:'thongtin', component: AccInfoComponent},
  {path:'capnhatthongtin', component: AccInfoChangeComponent},
  {path:'xacnhan', component: ConfirmPasswordComponent},
  {path:"trang-chu", component:TrangChuComponent},
  {path:"gioithieu",component:AboutUsComponent},
  {path:"**",component:NotFoundComponent}
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }



export const RoutingComponents=[
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
  TrangChuComponent,
  NotFoundComponent
]

