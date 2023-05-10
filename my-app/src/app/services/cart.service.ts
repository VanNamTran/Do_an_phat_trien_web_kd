import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartItems = new BehaviorSubject([]);
  currentCartItems = this.cartItems.asObservable();

  constructor() { }

  addToCart(item: any) {
    const currentValue = this.cartItems.value;
    const updatedValue:any = [...currentValue, item];
    this.cartItems.next(updatedValue);
  }
}
