import { Component, OnInit } from '@angular/core';
import { ProductTrangChuService } from '../services/product-trang-chu.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  phones:any;
  errMessage:string='';
  constructor(public _service: ProductTrangChuService, private router: Router){}
  ngOnInit(): void {
    this._service.getProducts().subscribe({
      next:(data)=>{this.phones=data},
      error: (err)=>{this.errMessage=err}
    })
  }
  viewProductDetail(f: any){
    const productType = f.substring(0, 2);
    switch (productType){
      case "dt":
        this.router.navigate(['phone', f])
        break
      case "la":
        this.router.navigate(['laptop', f])
        break
      case "mt":
        this.router.navigate(['tablets', f])
        break
      case "tn":
        this.router.navigate(['earphone', f])
        break
      case "dh":
        this.router.navigate(['watch', f])
        break;
      case "bg":
        this.router.navigate(['furniture', f])
        break
    }}


}
