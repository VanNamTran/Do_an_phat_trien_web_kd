import { Component } from '@angular/core';
import { ProductsViewService } from '../products-view.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-earphone',
  templateUrl: './earphone.component.html',
  styleUrls: ['./earphone.component.css']
})
export class EarphoneComponent {
  showAllBrands = false;
  showAllPrices =false
  hideAllBrands = false;
  brands: string[] = [];
  prices:string[]=[]
  ngOnInit() {
    this.prices=["> 30 triệu","20 đến 30 triệu","10 đến 20 triệu", "7 đến 10 triệu","5 dến 7 triệu","3 đến 5 triệu","dưới 3 triệu"]
    this.brands = ['samsung', 'airpods', 'xiaomi', 'sony', 'jbl', 'Aukey', 'rappo', 'TWS', 'marshall'];
    const gridLayoutButton = document.getElementById("grid-layout") as HTMLButtonElement;
    const listLayoutButton = document.getElementById("list-layout") as HTMLButtonElement;
    const productsGrid = document.querySelector(".products-list") as HTMLElement;
    const products = document.querySelectorAll(".product-info") as NodeListOf<HTMLElement>;
    // Lấy tất cả các hình ảnh "favorite-border" và "favorite"
    const favoriteIcons: NodeListOf<HTMLImageElement> = document.querySelectorAll(".favorite-icon img");


    // Lặp qua từng hình ảnh và thêm sự kiện click
    favoriteIcons.forEach((icon) => {
      icon.addEventListener("click", () => {
        // Kiểm tra xem hình ảnh đang hiển thị là "favorite-border" hay "favorite"
        if (icon.classList.contains("favorite-off")) {
          // Nếu đang hiển thị "favorite-border", thay đổi thành "favorite"
          icon.src = "./assets/icon/favorite.png";
          icon.classList.remove("favorite-off");
          icon.classList.add("favorite-on");
        } else {
          // Nếu đang hiển thị "favorite", thay đổi thành "favorite-border"
          icon.src = "./assets/icon/favorite_border.png";
          icon.classList.remove("favorite-on");
          icon.classList.add("favorite-off");
        }
      });
    });

    // sử lý sự kiện đổi layout grid-list
    gridLayoutButton.addEventListener("click", () => {
      productsGrid.classList.toggle("products-grid");
      productsGrid.classList.remove("products-list");
      productsGrid.classList.add("products-grid");
      products.forEach((product) => {
        product.classList.remove("products-list");
      });
    });

    listLayoutButton.addEventListener("click", () => {
      productsGrid.classList.remove("products-grid");
      productsGrid.classList.add("products-list");
      products.forEach((product) => {
        product.classList.add("products-list");
      });
    });
    this.getProducts();
  }

  earphoneProducts: any;
  arrays: any;
  errorMessage: string=""
  constructor(public _service: ProductsViewService, private router: Router){
    // this._service.getEarphoneProducts().subscribe({
    //   next:(data)=>{this.earphoneProducts=data},
    //   error:(err)=>{this.errorMessage=err}
    // })
  }

  getProducts(){
    this._service.getEarphoneProducts().subscribe({
      next:(data)=>{this.earphoneProducts=data},
      error:(err)=>{this.errorMessage=err}
    })
    this._service.getEarphoneProducts().subscribe({
      next:(data)=>{this.arrays=data}
    })
  }

  viewEarphoneProductDetail(f: any){
    this.router.navigate(['earphone', f._id])
  }
  temEarphones: any=[];
  newEarphones: any=[];
  onChange(event:any){
    if (event.target.checked){
      this.temEarphones = this.arrays.filter((phone: any)=>phone.brand == event.target.value)
      this.earphoneProducts = []
      this.newEarphones.push(this.temEarphones)
      for (let i=0; i<this.newEarphones.length; i++){
        var firstEarphone = this.newEarphones[i];
        for (let i=0; i<firstEarphone.length; i++){
          var obj = firstEarphone[i];
          this.earphoneProducts.push(obj);
        }
      }
    }
    else{
      this.getProducts();
      this.temEarphones = this.earphoneProducts.filter((phone: any)=>phone.brand != event.target.value)
      this.newEarphones = []
      this.earphoneProducts = []
      this.newEarphones.push(this.temEarphones)
      for (let i=0; i<this.newEarphones.length; i++){
        var firstEarphone = this.newEarphones[i]
        for (let i=0; i<firstEarphone.length; i++){
          var obj = firstEarphone[i]
          this.earphoneProducts.push(obj)
        }
      }
    }
  }
}
