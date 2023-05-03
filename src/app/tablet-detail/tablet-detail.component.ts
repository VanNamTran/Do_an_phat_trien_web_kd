import { Component } from '@angular/core';
import { ProductsViewService } from '../products-view.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tablet-detail',
  templateUrl: './tablet-detail.component.html',
  styleUrls: ['./tablet-detail.component.css']
})
export class TabletDetailComponent {
  selectedTablet: any;
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
              this.searchTablet(id)
            }
            else {
              this.router.navigate(["/tablets"])
            }
          }
        )
    }
    searchTablet(id: string){
      this._service.getTabletProductsDetail(id).subscribe({
        next: (data)=>{this.selectedTablet=data},
        error: (err)=> {this.errorMessage=err}
      })
    }

}