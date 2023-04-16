import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { PaymentComponent } from './payment/payment.component';
import { count } from 'rxjs';
import { NotFoundComponent } from './not-found/not-found.component';
import { PaymentTransferComponent } from './payment-transfer/payment-transfer.component';
import { ProductsViewComponent } from './products-view/products-view.component';
import { NotDevelopedFeatureComponent } from './not-developed-feature/not-developed-feature.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
// import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';

const routes: Routes = [
  {path:"cart",component:CartComponent},
  {path:"payment",component:PaymentComponent},
  {path:"payment/payment-transfer",component:PaymentTransferComponent},
  // {path:"breadcrumb",component:BreadcrumbComponent},
  {path:"products-view",component:ProductsViewComponent},
  {path: 'not-developed-feature', component: NotDevelopedFeatureComponent},
  {path: 'product-detail', component: ProductDetailComponent},
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
  ProductDetailComponent
]
