import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiProductsService } from '../services/api-products.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit{
  selectedPage = '';
  productsInCart:any;
  customerId:any;
  errMessage:string=''
  user:any;
  constructor(private router: Router,private _service:ApiProductsService) {}
  ngOnInit(): void {
    const itemsCart = JSON.parse(localStorage.getItem('itemscart') || '[]');
    this.productsInCart = itemsCart;
    this.customerId = localStorage.getItem('customerId');
    this._service.getUser(this.customerId).subscribe({
      next: (data) => {this.user = data; console.log(this.user)},
      error: (err) => {this.errMessage=err, alert("bạn cần đăng nhập tài khoản")}
    })
  }
  goToPage() {
    if (this.selectedPage!=''){
      this.router.navigate(['/' + this.selectedPage]);
    }else{
      alert("vui lòng chọn phương thức thanh toán")
    }
  }
  getTotalPrice(): number {
    let totalPrice = 0;

    for (let item of this.productsInCart) {
      totalPrice += item.quantity * (item.initial_price - item.discount_amount);
    }
    return totalPrice;
  }
  tax(){
    const tax=0.1;
    return tax
  }
  sum():number{
    let sum=this.getTotalPrice()*(1+this.tax())
    return sum
  }
}
