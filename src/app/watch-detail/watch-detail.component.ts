import { Component } from '@angular/core';
import { ProductsViewService } from '../products-view.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-watch-detail',
  templateUrl: './watch-detail.component.html',
  styleUrls: ['./watch-detail.component.css']
})
export class WatchDetailComponent {
  selectedWatch: any;
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
              this.searchWatch(id)
            }
            else {
              this.router.navigate(["/watch"])
            }
          }
        )
    }
    searchWatch(id: string){
      this._service.getWatchProductsDetail(id).subscribe({
        next: (data)=>{this.selectedWatch=data},
        error: (err)=> {this.errorMessage=err}
      })
    }
}
