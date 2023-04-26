import { Component, OnInit } from '@angular/core';
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
  customerId="ctm000001"
  constructor(private _service:ApiProductsService){}
  ngOnInit() {

    this._service.getListFavorites(this.customerId).subscribe({
      next: (data) => { this.listFavoriteProduct= data },
      error: (err) => { this.errMessage = err }
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

}
