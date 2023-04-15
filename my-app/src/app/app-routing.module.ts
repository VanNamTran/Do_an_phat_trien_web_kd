import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { PaymentComponent } from './payment/payment.component';
import { count } from 'rxjs';
import { NotFoundComponent } from './not-found/not-found.component';
import { PaymentTransferComponent } from './payment-transfer/payment-transfer.component';
import { ProductsViewComponent } from './products-view/products-view.component';
// import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';

const routes: Routes = [
  {path:"cart",component:CartComponent},
  {path:"payment",component:PaymentComponent},
  {path:"payment/payment-transfer",component:PaymentTransferComponent},
  // {path:"breadcrumb",component:BreadcrumbComponent},
  {path:"products-view",component:ProductsViewComponent},
  {path:"**",component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const RountingComponent=[
  CartComponent,
  PaymentComponent,
  NotFoundComponent,
  PaymentTransferComponent,
  // BreadcrumbComponent,
  ProductsViewComponent
]
