import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiProductsService } from '../services/api-products.service';
import { OrderService } from '../services/order.service';

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

  products:any
  constructor(private router: Router,private _service:ApiProductsService, private _Oservice:OrderService ) {}
  ngOnInit(): void {

    this.loadCartData();
     // Đăng ký hàm lắng nghe cho sự kiện storage
    window.addEventListener('storage', (event) => {
      if (event.key === 'itemscart') {
        this.loadCartData();
      }

    });


    this._service.getUser(this.customerId).subscribe({
      next: (data) => {this.user = data},
      error: (err) => {this.errMessage=err, alert("bạn cần đăng nhập tài khoản"),this.router.navigate(['/dangnhap'])}
    })

  }
  loadCartData(): void {

    this.customerId = localStorage.getItem('customerId');
    const cartJson = localStorage.getItem('itemscart');
    const cart = cartJson ? JSON.parse(cartJson) : [];
    this.productsInCart = cart;
    this.products = cart.map((item: { _id: string; quantity: number; }) => ({
      product_id: item._id,
      quantity: item.quantity
    }));



  }
  goToPage() {
    if (this.selectedPage!=''){
      this.router.navigate(['/' + this.selectedPage]);
      let userData = [{
        phone: this.user.phone,
        name: this.user.name,
        address: this.user.address
      }];

      this._Oservice.postNewOrder(this.customerId, this.products, userData).subscribe({
        next: (data) => {
          this.products = data;
        },
        error: (err) => {
          this.errMessage = err;
        }
      });
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
