import { Component } from '@angular/core';
// import { AdminAPIProductService } from '../services/admin-apiproduct.service';
import { Products } from '../interfaces/products';
import { ApiProductsService } from '../services/api-products.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

  items:any;
  errMessage:string='';
  selectedItem: any;
  listprod = false;
  listorder=false
  constructor(private _service: ApiProductsService){
    this._service.getPhones().subscribe({
      next:(data)=>{this.items=data},
      error:(err)=>{this.errMessage=err}
    })
  }
  order(){
    this.listorder = true;
    this.listprod = false
  }
  product(){
    this.listorder = false;
    this.listprod = true
  }
  public setPhone(f:Products)
  {
    this.items=f
  }
  clickOnCategory(category:string){
    switch (category){
      case "dt":
        this._service.getPhones().subscribe({
          next:(data)=>{this.items=data},
          error:(err)=>{this.errMessage=err}
        })
        break
      case "la":
        this._service.getLaptopProducts().subscribe({
          next:(data)=>{this.items=data},
          error:(err)=>{this.errMessage=err}
        })
        break
      case "mt":
        this._service.getTabletProducts().subscribe({
          next:(data)=>{this.items=data},
          error:(err)=>{this.errMessage=err}
        })
        break
      case "tn":
        this._service.getEarphoneProducts().subscribe({
          next:(data)=>{this.items=data},
          error:(err)=>{this.errMessage=err}
        })
        break
      case "dh":
        this._service.getWatchProducts().subscribe({
          next:(data)=>{this.items=data},
          error:(err)=>{this.errMessage=err}
        })
        break
      case "bg":
        this._service.getFurnitureProducts().subscribe({
          next:(data)=>{this.items=data},
          error:(err)=>{this.errMessage=err}
        })
        break
  }}
  clickOnProduct(item: any) {
    this.selectedItem = item;
  }

clickOrders(){
  this._service.getPhones().subscribe({
    next:(data)=>{this.items=data},
    error:(err)=>{this.errMessage=err}
  })
}
  onFileSelected(event:any,phone:Products)
  {
    let me = this;
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function ()
      {
        phone.image=reader.result!.toString()
      };
      reader.onerror = function (error)
      {
        console.log('Error: ', error);
      };
  }

  // searchPhone(phoneId:string)
  // {
  //   this._service.getPhone(phoneId).subscribe({
  //     next:(data)=>{this.items=data},
  //     error: (err)=>{this.errMessage=err}
  //   })
  // }

  // postPhone()
  // {
  //   this._service.postPhone(this.phone).subscribe({
  //     next:(data)=>{this.items=data},
  //     error:(err)=>{this.errMessage=err}
  //   })
  // }

  // putPhone()
  // {
  //   this._service.putPhone(this.phone).subscribe({
  //     next:(data)=>{this.items=data},
  //     error:(err)=>{this.errMessage=err}
  //   })
  // }

  // deletePhone(phoneId:any)
  // {
  //  this._service.deletePhone(phoneId).subscribe({
  //    next:(data)=>{this.items=data},
  //    error:(err)=>{this.errMessage=err}
  //  })
  // }
}
