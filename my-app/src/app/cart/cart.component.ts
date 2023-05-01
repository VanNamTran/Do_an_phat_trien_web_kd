import { Component, OnInit ,ChangeDetectorRef} from '@angular/core';
import { ApiProductsService } from '../services/api-products.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
  items: any[] = [];
  listFavoriteProduct:any;
  errMessage:string='';
  favoriteProducts: string[] = [];
  cartProducts: string[] = [];
  productsInCart:any;
  totalPrice: number | undefined;
  customerId="ctm000001"
  constructor(private _service:ApiProductsService,){}
  ngOnInit() {

    this._service.getListFavorites(this.customerId).subscribe({
      next: (data) => { this.listFavoriteProduct= data },
      error: (err) => { this.errMessage = err }
    })
    this._service.getProductsInCart(this.customerId).subscribe({
      next:(data) =>{this.productsInCart = data},
      error:(err) =>{this.errMessage =err}
    })
  }
  deletefavorite(event: MouseEvent){
    const target = event.target as HTMLImageElement;
    let productId = target.getAttribute('data-product-id')
    const indexproduct = document.getElementById('favorite-' + productId)
    let isFavorite=false
    if(productId!= null && indexproduct!=null){

      this._service.putFavorite(this.customerId,productId,isFavorite).subscribe({
        next:(data)=>{this.favoriteProducts = data;console.log("remove",productId),console.log(isFavorite)},
        error:(err) =>{this.errMessage = err}
      })
      indexproduct.classList.add('hidden');
    }
  }
  addProduct(event:MouseEvent){
    const target = event.target as HTMLImageElement;
    let productId = target.getAttribute('data-tocart-id')
    let incart=true
    let quantity=1
    console.log(productId)
    if(productId!= null ){

      this._service.putProdCart(this.customerId,productId,quantity,incart).subscribe({
        next:(data)=>{this.cartProducts = data;console.log("oke")},
        error:(err) =>{this.errMessage = err}
      })
    }
  }
  deleteProduct(event: MouseEvent){
    const target = event.target as HTMLImageElement;
    let productId = target.getAttribute('data-product-cart-id')
    const indexproduct = document.getElementById('prodCart-' + productId)
    let isFavorite=false
    let quantity =1
    if(productId!= null && indexproduct!=null){

      this._service.putProdCart(this.customerId,productId,quantity,isFavorite).subscribe({
        next:(data)=>{this.cartProducts = data;},
        error:(err) =>{this.errMessage = err}
      })
      indexproduct.classList.add('hidden');
    }
  }
  moveToFavorite(event: MouseEvent){
    const target = event.target as HTMLImageElement;
    let productId = target.getAttribute('data-product-movetofa-id')
    const indexproduct = document.getElementById('prodCart-' + productId)
    let quantity =1
    if(productId!= null && indexproduct!=null){

      this._service.putFavorite(this.customerId,productId,true).subscribe({
        next:(data)=>{this.cartProducts = data;},
        error:(err) =>{this.errMessage = err}
      })
      indexproduct.classList.add('hidden');
      this._service.putProdCart(this.customerId,productId,quantity,false).subscribe({
        next:(data)=>{this.cartProducts = data;},
        error:(err) =>{this.errMessage = err},

      })
      this.getTotalPrice()
      console.log(this.getTotalPrice())
    }
  }
  getTotalPrice(): number {
    let totalPrice = 0;

    for (let item of this.productsInCart) {
      totalPrice += item.quantity * (item.initial_price - item.discount_amount);
    }
    console.log(totalPrice)
    return totalPrice;
  }
  updateTotalPrice() {
    this.totalPrice = this.getTotalPrice();
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
