import { Component } from '@angular/core';
import { ApiProductsService } from '../services/api-products.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-laptop-detail',
  templateUrl: './laptop-detail.component.html',
  styleUrls: ['./laptop-detail.component.css']
})
export class LaptopDetailComponent {
  selectedLaptop: any;
  errorMessage: string = "";
  customerId:any;
  errMessage:string='';
  laptopProducts: any;
  productsToShow: number = 8;
  // propertyMap: any = {
  //   "screen_details": "Màn hình",
  //   "backcamera_details": "Camera sau",
  //   "frontcamera_details": "Camera trước",
  //   "ram_details": "RAM",
  //   "rom_details": "Bộ nhớ trong",
  //   "cpu_detail": "CPU",
  //   "GPU": "Đồ họa",
  //   "battery_details": "Pin",
  //   "sim_details": "SIM",
  //   "os_details": "Hệ điều hành",
  //   "origin_details": "Xuất xứ",
  //   "release_details": "Năm phát hành"
  // }

  constructor(private _service: ApiProductsService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    this._service.getLaptopProducts().subscribe({
      next:(data)=>{this.laptopProducts=data},
      error:(err)=>{this.errMessage=err}
    })
    activatedRoute.paramMap.subscribe(
      (param) => {
        let id = param.get('id')

        if (id != null) {
          this.searchLaptop(id)
        }
        else {
          this.router.navigate(["/laptop"])
        }
      }
    )
  }
  searchLaptop(id: string) {
    this._service.getLaptopProductsDetail(id).subscribe({
      next: (data) => { this.selectedLaptop = data },
      error: (err) => { this.errorMessage = err }
    })
  }
  addToCart(){
    let incart=true
    let quantity=1
    this.customerId = localStorage.getItem('customerId');
    const productId=this.selectedLaptop._id
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
