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
import { AboutUsComponent } from './about-us/about-us.component';
import { LaptopComponent } from './laptop/laptop.component';
import { TabletsComponent } from './tablets/tablets.component';
import { WatchComponent } from './watch/watch.component';
import { EarphoneComponent} from './earphone/earphone.component';
import { LaptopDetailComponent } from './laptop-detail/laptop-detail.component';
import { TabletDetailComponent } from './tablet-detail/tablet-detail.component';
import { WatchDetailComponent } from './watch-detail/watch-detail.component';
import { EarphoneDetailComponent } from './earphone-detail/earphone-detail.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { HomeComponent } from './home/home.component';
import { FurnitureDetailComponent } from './furniture-detail/furniture-detail.component';
import { FurnitureComponent } from './furniture/furniture.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { LoginModalComponent } from './login-modal/login-modal.component';
import { AdminComponent } from './admin/admin.component';
// import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';

const routes: Routes = [
  {path:"cart",component:CartComponent},
  {path:"payment",component:PaymentComponent},
  {path:"payment/payment-transfer",component:PaymentTransferComponent},
  // {path:"breadcrumb",component:BreadcrumbComponent},
  {path:"phone",component:ProductsViewComponent},
  {path: 'not-developed-feature', component: NotDevelopedFeatureComponent},
  {path:'dangky', component: RegisterComponent},
  {path:'dangnhap', component: LoginComponent},
  {path:'quenmatkhau', component: ForgetPasswordComponent},
  {path:'datlaimatkhau', component: AccResetComponent},
  {path:'thongtin', component: AccInfoComponent},
  {path:'capnhatthongtin', component: AccInfoChangeComponent,
  pathMatch: 'full',
  data: {
    user: {
      phone: '',
      email: '',
      name: '',
      address: '',
      password: ''
    }}
  },
  {path: 'doimatkhau', component: ChangePasswordComponent},
  {path: 'phone/:id', component: ProductDetailComponent},
  {path:"gioithieu",component:AboutUsComponent},
  {path: "laptop", component: LaptopComponent},
  {path: "laptop/:id", component: LaptopDetailComponent},
  {path: "tablets", component: TabletsComponent},
  {path: "tablets/:id", component: TabletDetailComponent},
  {path: "watch", component: WatchComponent},
  {path: "watch/:id", component: WatchDetailComponent},
  {path: "earphone", component: EarphoneComponent},
  {path: "earphone/:id", component: EarphoneDetailComponent},
  {path:"furniture",component:FurnitureComponent},
  {path:"furniture/:id",component:FurnitureDetailComponent},
  {path:"order-success", component: OrderSuccessComponent},
  {path:'',component:HomeComponent},
  {path:'admin',component:AdminComponent},
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
  // NewPasswordComponent,
  AccInfoComponent,
  AccInfoChangeComponent,
  ConfirmPasswordComponent,
  NotFoundComponent,
  FurnitureComponent,
]

