import { Component, OnInit ,ChangeDetectorRef} from '@angular/core';
import { ApiProductsService, } from '../services/api-products.service';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';
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
  customerId:any
  // cartItems: any = [];

  constructor(private _service:ApiProductsService,private router: Router,private cartService: CartService){}
  ngOnInit() {
    this.customerId = localStorage.getItem('customerId');
    this._service.getListFavorites(this.customerId).subscribe({
      next: (data) => { localStorage.setItem('itemsfa', JSON.stringify(data)); },
      error: (err) => { this.errMessage = err }
    })
    this._service.getProductsInCart(this.customerId).subscribe({
      next:(data) =>{localStorage.setItem('itemscart', JSON.stringify(data));},
      error:(err) =>{this.errMessage =err}
    })
    const items = JSON.parse(localStorage.getItem('itemsfa') || '[]');
    this.listFavoriteProduct = items;


    const itemsCart = JSON.parse(localStorage.getItem('itemscart') || '[]');
    this.productsInCart = itemsCart;
    // save items to cartservice
    // this.cartService.currentCartItems.subscribe(items => this.cartItems = items);
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
      let index = this.listFavoriteProduct.findIndex((item: any) => item._id === productId);

      if (index !== -1) {
        this.listFavoriteProduct.splice(index, 1);
      }

      // indexproduct.classList.add('hidden');
      console.log(this.productsInCart)
      console.log(this.listFavoriteProduct)
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

      let index = this.listFavoriteProduct.findIndex((item: any) => item._id === productId);
      console.log(index)
      if (index !== -1 ) {
        if(this.productsInCart.findIndex((item: any) => item._id === productId) === -1){
          this.productsInCart.push(this.listFavoriteProduct[index]);
        }

      }

      console.log(this.productsInCart)
      console.log(this.listFavoriteProduct)
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
      let index = this.productsInCart.findIndex((item: any) => item._id === productId);

      if (index !== -1) {

       this.productsInCart.splice(index, 1);
      }

      // indexproduct.classList.add('hidden');
      console.log(this.productsInCart)
      console.log(this.listFavoriteProduct)
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
      let index = this.productsInCart.findIndex((item: any) => item._id === productId);

      if (index !== -1 ) {
        if(this.listFavoriteProduct.findIndex((item: any) => item._id === productId) === -1){
          this.listFavoriteProduct.push(this.productsInCart[index])
        }

        this.productsInCart.splice(index, 1);
      }
      console.log(this.productsInCart)
      console.log(this.listFavoriteProduct)
    }
  }
  getTotalPrice(): number {
    let totalPrice = 0;

    for (let item of this.productsInCart) {
      totalPrice += item.quantity * (item.initial_price - item.discount_amount);
    }
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
        break
    }

  }
  onPaymentClick(){

    this.router.navigate(['/payment']).then(() => {
      setTimeout(() => {
        location.reload();
      }, 500);});
  }

}
