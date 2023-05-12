import { Component } from '@angular/core';
import { AdminAPIProductService } from '../services/admin-apiproduct.service';
import { Products } from '../interfaces/products';
// import { ApiProductsService } from '../services/api-products.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  phone=new Products();
  phones:any
  errMessage:string=''
  constructor(private _service: AdminAPIProductService){
    this._service.getPhones().subscribe({
      next:(data)=>{this.phones=data},
      error:(err)=>{this.errMessage=err}
    })
  }
  public setPhone(f:Products)
  {
    this.phone=f
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

  searchPhone(phoneId:string)
  {
    this._service.getPhone(phoneId).subscribe({
      next:(data)=>{this.phones=data},
      error: (err)=>{this.errMessage=err}
    })
  }

  postPhone()
  {
    this._service.postPhone(this.phone).subscribe({
      next:(data)=>{this.phones=data},
      error:(err)=>{this.errMessage=err}
    })
  }

  putPhone()
  {
    this._service.putPhone(this.phone).subscribe({
      next:(data)=>{this.phones=data},
      error:(err)=>{this.errMessage=err}
    })
  }

  deletePhone(phoneId:any)
  {
   this._service.deletePhone(phoneId).subscribe({
     next:(data)=>{this.phones=data},
     error:(err)=>{this.errMessage=err}
   })
  }
}
