import { Component } from '@angular/core';
import { ProductsViewService } from '../products-view.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-laptop-detail',
  templateUrl: './laptop-detail.component.html',
  styleUrls: ['./laptop-detail.component.css']
})
export class LaptopDetailComponent {
  laptopProducts: any;
  errMessage: string=""
  selectedLaptop: any;
  errorMessage: string=""
  constructor( private _service: ProductsViewService,
                private router: Router,
                private activatedRoute: ActivatedRoute)
    {
      this._service.getLaptopProducts().subscribe({
        next:(data)=>{this.laptopProducts=data},
        error:(err)=>{this.errMessage=err}
      })

        activatedRoute.paramMap.subscribe(
          (param)=>{
            let id = param.get('id')

            if (id!=null)
            {
              this.searchLaptop(id)
            }
            else {
              this.router.navigate(["/laptop"])
            }
          }
        )
    }
    searchLaptop(id: string){
      this._service.getLaptopProductsDetail(id).subscribe({
        next: (data)=>{this.selectedLaptop=data},
        error: (err)=> {this.errorMessage=err}
      })
    }
}
