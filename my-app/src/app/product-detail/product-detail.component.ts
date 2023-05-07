import { Component } from '@angular/core';
import { ApiProductsService } from '../services/api-products.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {
  selectedPhone: any;
  errorMessage: string = "";
  customerId:any;
  errMessage:string='';
  phoneProducts: any;
  productsToShow: number = 8;

  propertyMap: {[key: string]: string} = {
    "screen_details": "Màn hình",
    "backcamera_details": "Camera sau",
    "frontcamera_details": "Camera trước",
    "ram_details": "RAM",
    "rom_details": "Bộ nhớ trong",
    "cpu_detail": "CPU",
    "GPU": "Đồ họa",
    "battery_details": "Pin",
    "sim_details": "SIM",
    "os_details": "Hệ điều hành",
    "origin_details": "Xuất xứ",
    "release_details": "Năm phát hành"
  };


  constructor(private _service: ApiProductsService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    this._service.getPhones().subscribe({
      next:(data)=>{this.phoneProducts=data},
      error:(err)=>{this.errMessage=err}
    })
    activatedRoute.paramMap.subscribe(
      (param) => {
        let id = param.get('id')

        if (id != null) {
          this.searchPhone(id)
        }
        else {
          this.router.navigate(["/products-view"])
        }
      }
    )
  }
  searchPhone(id: string) {
    this._service.getPhoneProductsDetail(id).subscribe({

      next: (data) => {
        // Thay đổi tên key trong data
        for (let key in data) {
          if (key in this.propertyMap) {
            data[this.propertyMap[key]] = data[key];
            delete data[key];
          }
        }
        this.selectedPhone = data;
      },
      error: (err) => { this.errorMessage = err }
    })
  }
  getPropertyKey(item: any) {
    return item.key as any;
  }
  addToCart(){
    let incart=true
    let quantity=1
    this.customerId = localStorage.getItem('customerId');
    const productId=this.selectedPhone._id
    if(productId!= null ){

      this._service.putProdCart(this.customerId,productId,quantity,incart).subscribe({
        next:(data)=>{console.log("oke")},
        error:(err) =>{this.errMessage = err}
      })



      }
    this.router.navigate(['/cart']).then(() => {
      setTimeout(() => {
        location.reload();
      }, 500);

    });
  }
  loadMore() { this.productsToShow += 12; }


}
