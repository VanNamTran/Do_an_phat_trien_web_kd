import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsViewService } from '../products-view.service';

@Component({
  selector: 'app-earphone-detail',
  templateUrl: './earphone-detail.component.html',
  styleUrls: ['./earphone-detail.component.css']
})
export class EarphoneDetailComponent {
  selectedEarphone: any;
  errorMessage: string=""
  constructor( private _service: ProductsViewService,
                private router: Router,
                private activatedRoute: ActivatedRoute)
    {
        activatedRoute.paramMap.subscribe(
          (param)=>{
            let id = param.get('id')

            if (id!=null)
            {
              this.searchEarphone(id)
            }
            else {
              this.router.navigate(["/earphone"])
            }
          }
        )
    }
    searchEarphone(id: string){
      this._service.getEarphoneProductsDetail(id).subscribe({
        next: (data)=>{this.selectedEarphone=data},
        error: (err)=> {this.errorMessage=err}
      })
    }
}