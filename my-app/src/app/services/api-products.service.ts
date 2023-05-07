import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse ,HttpHeaders} from '@angular/common/http';
import { catchError,map,Observable,retry,throwError } from 'rxjs';
import { IPhones, PhoneProduct } from '../interfaces/Phone';
import { IFavorites } from '../interfaces/favorite';
import { LaptopProduct } from '../interfaces/laptop-product';
import { EarphoneProduct } from '../interfaces/earphone-product';
import { WatchProduct } from '../interfaces/watch-product';

@Injectable({
  providedIn: 'root'
})
export class ApiProductsService {
  private apiFavorite = '/favorites';
  private apiProdCart = '/prod-in-cart'
  constructor(private _http:HttpClient) { }
  getPhones():Observable<any>
  {
    const headers = new HttpHeaders().set("Content-type","text/plain;charset=utf8")
    const requestOptions:Object={
      headers:headers,
      responseType:"text"
    }
    return this._http.get<any>("/techshop/phones",requestOptions).pipe(
      map(res =>JSON.parse(res)as Array<IPhones>),
      retry(3),
      catchError(this.handleError)
    )
  }
  getPhoneProductsDetail(phoneId: string):Observable<any>{
    const headers = new HttpHeaders().set("Content-Type", "text/plain;charset=utf-8")
    const requestOptions:Object={
      headers: headers,
      responseType: "text"
    }
    return this._http.get<any>("/techshop/phones/"+phoneId, requestOptions).pipe(
      map(res=>JSON.parse(res) as Array<PhoneProduct>),
      retry(3),
      catchError(this.handleError)
    )
  }
  getLaptopProducts():Observable<any>{
    const headers = new HttpHeaders().set('Content-Type', 'text/plain;charset=utf-8');
    const requestOptions:Object={
      headers: headers,
      responseType: "text"
    }
    return this._http.get<any>("/techshop/laptops", requestOptions).pipe(
      map(res=>JSON.parse(res) as Array<LaptopProduct>),
      retry(3),
      catchError(this.handleError)
    )
  }
  getLaptopProductsDetail(laptopId: string):Observable<any>{
    const headers = new HttpHeaders().set("Content-Type", "text/plain;charset=utf-8")
    const requestOptions:Object={
      headers: headers,
      responseType: "text"
    }
    return this._http.get<any>("/techshop/laptops/"+laptopId, requestOptions).pipe(
      map(res=>JSON.parse(res) as Array<LaptopProduct>),
      retry(3),
      catchError(this.handleError)
    )
  }
  getTabletProducts():Observable<any>{
    const headers = new HttpHeaders().set('Content-Type', 'text/plain;charset=utf-8');
    const requestOptions:Object={
      headers: headers,
      responseType: "text"
    }
    return this._http.get<any>("/techshop/tablets", requestOptions).pipe(
      map(res=>JSON.parse(res) as Array<PhoneProduct>),
      retry(3),
      catchError(this.handleError)
    )
  }
  getTabletProductsDetail(TabletId: string):Observable<any>{
    const headers = new HttpHeaders().set("Content-Type", "text/plain;charset=utf-8")
    const requestOptions:Object={
      headers: headers,
      responseType: "text"
    }
    return this._http.get<any>("/techshop/tablets/"+TabletId, requestOptions).pipe(
      map(res=>JSON.parse(res) as Array<PhoneProduct>),
      retry(3),
      catchError(this.handleError)
    )
  }
  getEarphoneProducts():Observable<any>{
    const headers = new HttpHeaders().set('Content-Type', 'text/plain;charset=utf-8');
    const requestOptions:Object={
      headers: headers,
      responseType: "text"
    }
    return this._http.get<any>("/techshop/earphones", requestOptions).pipe(
      map(res=>JSON.parse(res) as Array<EarphoneProduct>),
      retry(3),
      catchError(this.handleError)
    )
  }
  getEarphoneProductsDetail(earphoneId: string):Observable<any>{
    const headers = new HttpHeaders().set("Content-Type", "text/plain;charset=utf-8")
    const requestOptions:Object={
      headers: headers,
      responseType: "text"
    }
    return this._http.get<any>("/techshop/earphones/"+earphoneId, requestOptions).pipe(
      map(res=>JSON.parse(res) as Array<EarphoneProduct>),
      retry(3),
      catchError(this.handleError)
    )
  }
  getWatchProducts():Observable<any>{
    const headers = new HttpHeaders().set('Content-Type', 'text/plain;charset=utf-8');
    const requestOptions:Object={
      headers: headers,
      responseType: "text"
    }
    return this._http.get<any>("/techshop/watches", requestOptions).pipe(
      map(res=>JSON.parse(res) as Array<WatchProduct>),
      retry(3),
      catchError(this.handleError)
    )
  }
  getWatchProductsDetail(watchId: string):Observable<any>{
    const headers = new HttpHeaders().set("Content-Type", "text/plain;charset=utf-8")
    const requestOptions:Object={
      headers: headers,
      responseType: "text"
    }
    return this._http.get<any>("/techshop/watches/"+watchId, requestOptions).pipe(
      map(res=>JSON.parse(res) as Array<WatchProduct>),
      retry(3),
      catchError(this.handleError)
    )
  }

  handleError(error:HttpErrorResponse){
    return throwError(()=> new Error (error.message))
  }
  postFavorite(customerId:string):Observable<any>{
    const requestBody = {
      customerId: customerId,
    };
    return this._http.post<any>(this.apiFavorite, requestBody).pipe(
      map(res=>res),
      retry(3),
      catchError((error: HttpErrorResponse) => {
        return throwError(()=> new Error (error.message))
      })
    );
  }
  postCart(customerId:string):Observable<any>{
    const requestBody = {
      customerId: customerId,
    };
    return this._http.post<any>(this.apiProdCart, requestBody).pipe(
      map(res=>res),
      retry(3),
      catchError((error: HttpErrorResponse) => {
        return throwError(()=> new Error (error.message))
      })
    );
  }

  public putFavorite(customerId: string, productId: string, isFavorite: boolean): Observable<any> {
    const requestBody = {
      customerId: customerId,
      productId: productId,
      isFavorite: isFavorite
    };

    return this._http.put<any>(this.apiFavorite, requestBody).pipe(
      map(res => res),
      retry(3),
      catchError(this.handleError)
    );
  }
  public putProdCart(customerId: string, productId: string,quantity:number, isFavorite: boolean): Observable<any> {
    const requestBody = {
      customerId: customerId,
      productId: productId,
      quantity: quantity,
      inCart: isFavorite
    };

    return this._http.put<any>(this.apiProdCart, requestBody).pipe(
      map(res => res),
      retry(3),
      catchError(this.handleError)
    );
  }
  getListFavorites(customerId:any):Observable<any>
  {
    const headers = new HttpHeaders().set("Content-type","text/plain;charset=utf8")
    const requestOptions:Object={
      headers:headers,
      responseType:"text"
    }
    return this._http.get<any>("/favorites/"+customerId,requestOptions).pipe(
      map(res =>JSON.parse(res)as Array<IPhones>),
      retry(3),
      catchError(this.handleError)
    )
  }
  getProductsInCart(customerId:any):Observable<any>
  {
    const headers = new HttpHeaders().set("Content-type","text/plain;charset=utf8")
    const requestOptions:Object={
      headers:headers,
      responseType:"text"
    }
    return this._http.get<any>("/prod-in-cart/"+customerId,requestOptions).pipe(
      map(res =>JSON.parse(res)as Array<IPhones>),
      retry(3),
      catchError(this.handleError)
    )
  }

}
