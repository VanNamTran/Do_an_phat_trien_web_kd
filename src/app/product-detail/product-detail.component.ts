import { Component } from '@angular/core';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {
  products =
    {
      "productImage": "ip11.jpg",
      "productName": "Iphone 11 64GB",
      "discountedPrice": 109800000,
      "initialPrice": 139800000,
      "discount": 3000000,
      "brand": "Iphone",
      "type": "11",
      "material": "Plastic",
      "design": "Flat",
      "cpu": "Snapdragon 8 gen 2",
      "ram": 8,
      "warranty": "2 years full warranty"
    }

}
