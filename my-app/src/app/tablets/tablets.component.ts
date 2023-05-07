import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiProductsService } from '../services/api-products.service';
@Component({
  selector: 'app-tablets',
  templateUrl: './tablets.component.html',
  styleUrls: ['./tablets.component.css']
})

export class TabletsComponent {
  showAllBrands = false;
  showAllPrices = false;
  hideAllBrands = false;
  prices: string[] = [];
  products: any;
  showItem = false;
  errMessage: string = '';
  favoriteProducts: string[] = [];
  favorites: Set<string> = new Set();
  customerId : any;
  listFavoriteOfCTM: any;
  productsToShow: number = 18;
  constructor(private _service: ApiProductsService, private router: Router) { }
  ngOnInit() {
    this.customerId = localStorage.getItem('customerId');
    this.prices = ["> 30 triệu", "20 đến 30 triệu", "10 đến 20 triệu", "7 đến 10 triệu", "5 dến 7 triệu", "3 đến 5 triệu", "dưới 3 triệu"]
    // this.brands = ['Samsung', 'Apple', 'Huawei', 'Xiaomi', 'Oppo', 'Vivo', 'Nokia'];
    const gridLayoutButton = document.querySelector("#grid-layout") as HTMLButtonElement;
    const listLayoutButton = document.querySelector("#list-layout") as HTMLButtonElement;
    const productsGrid = document.querySelector(".products-list") as HTMLElement;
    const products = document.querySelectorAll(".product-info") as NodeListOf<HTMLElement>;

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

    this._service.getTabletProducts().subscribe({
      next: (data) => {
        this.products = data;
        this._service.getListFavorites(this.customerId).subscribe({
          next: (data) => {
            this.listFavoriteOfCTM = data.map((favorite: any) => favorite._id);
            for (let i = 0; i < this.products.length; i++) {
              const productId = this.products[i]._id;
              const favoriteOn = document.getElementById('favorite-on-' + productId);
              const favoriteOff = document.getElementById('favorite-off-' + productId);
              if (this.listFavoriteOfCTM.indexOf(productId) !== -1) {
                if (favoriteOn && favoriteOff) {
                  favoriteOn.classList.remove('hidden');
                  favoriteOff.classList.add('hidden');
                }
              } else {
                if (favoriteOn && favoriteOff) {
                  favoriteOn.classList.add('hidden');
                  favoriteOff.classList.remove('hidden');
                }
              }
            }
          },
          error: (err) => {
            this.errMessage = err;
          }
        });
      },
      error: (err) => {
        this.errMessage = err;
      }
    });



  }
  toggleFavorite(event: MouseEvent) {
    const target = event.target as HTMLImageElement;
    const productId = target.getAttribute('data-product-id');
    let favoriteStatus = target.getAttribute('data-favorite-status') === 'false';
    const favoriteOn = document.getElementById('favorite-on-' + productId);
    const favoriteOff = document.getElementById('favorite-off-' + productId);
    const customerId = this.customerId
    let isFavorite = favoriteStatus
    if (favoriteOn && favoriteOff) {
      if (!isFavorite) {
        favoriteOn.classList.add('hidden');
        favoriteOff.classList.remove('hidden');
        if (productId != null) {
          this._service.putFavorite(customerId, productId, isFavorite).subscribe({
            next: (data) => { this.favoriteProducts = data; console.log("remove", productId), console.log(isFavorite) },
            error: (err) => { this.errMessage = err }
          })
        }

      } else {
        favoriteOn.classList.remove('hidden');
        favoriteOff.classList.add('hidden');
        if (productId != null) {
          this._service.putFavorite(customerId, productId, isFavorite).subscribe({
            next: (data) => { this.favoriteProducts = data; console.log("add", productId), console.log(isFavorite) },
            error: (err) => { this.errMessage = err }
          })
        }
      }
    }
  }
  viewtabletProductDetail(f: any){
    this.router.navigate(['tablets', f._id])
  }
  loadMore() { this.productsToShow += 18; }


}
