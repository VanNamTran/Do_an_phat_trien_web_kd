import { Component } from '@angular/core';
import { ProductTrangChuService } from '../services/product-trang-chu.service';


@Component({
  selector: 'app-trang-chu',
  templateUrl: './trang-chu.component.html',
  styleUrls: ['./trang-chu.component.css']
})
export class TrangChuComponent {
  phones:any;
  errMessage:string=''
  constructor(public _service: ProductTrangChuService){
    this._service.getProducts().subscribe({
      next:(data)=>{this.phones=data},
      error: (err)=>{this.errMessage=err}
    })
  }
}
