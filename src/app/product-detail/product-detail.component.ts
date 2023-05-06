import { Component } from '@angular/core';
import { ProductsViewService } from '../products-view.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {
  phoneProducts: any;
  errMessage: string=""
  selectedPhone: any;
  errorMessage: string=""
  constructor( private _service: ProductsViewService,
                private router: Router,
                private activatedRoute: ActivatedRoute)
    {
      this._service.getPhoneProducts().subscribe({
        next:(data)=>{this.phoneProducts=data},
        error:(err)=>{this.errMessage=err}
      })
        activatedRoute.paramMap.subscribe(
          (param)=>{
            let id = param.get('id')

            if (id!=null)
            {
              this.searchPhone(id)
            }
            else {
              this.router.navigate(["/products-view"])
            }
          }
        )
    }
    searchPhone(id: string){
      this._service.getPhoneProductsDetail(id).subscribe({
        next: (data)=>{this.selectedPhone=data},
        error: (err)=> {this.errorMessage=err}
      })
    }


}
