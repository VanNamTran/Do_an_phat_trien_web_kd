import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotDevelopedFeatureComponent } from './not-developed-feature/not-developed-feature.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';

const routes: Routes = [
  {path: 'not-developed-feature', component: NotDevelopedFeatureComponent},
  {path: 'product-detail', component: ProductDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const RoutingComponents = [NotDevelopedFeatureComponent,
                                  ProductDetailComponent]
