import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, retry, throwError } from 'rxjs';
import { PhoneProduct } from './phone-product';
import { LaptopProduct } from './laptop-product';
import { WatchProduct } from './watch-product';
import { EarphoneProduct } from './earphone-product';

@Injectable({
  providedIn: 'root'
})
export class ProductsViewService {

  constructor(private _http: HttpClient) { }
  getPhoneProducts():Observable<any>{
    const headers = new HttpHeaders().set('Content-Type', 'text/plain;charset=utf-8');
    const requestOptions:Object={
      headers: headers,
      responseType: "text"
    }
    return this._http.get<any>("/phones", requestOptions).pipe(
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
    return this._http.get<any>("/laptops", requestOptions).pipe(
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
    return this._http.get<any>("/tablets", requestOptions).pipe(
      map(res=>JSON.parse(res) as Array<PhoneProduct>),
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
    return this._http.get<any>("/watches", requestOptions).pipe(
      map(res=>JSON.parse(res) as Array<WatchProduct>),
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
    return this._http.get<any>("/earphones", requestOptions).pipe(
      map(res=>JSON.parse(res) as Array<EarphoneProduct>),
      retry(3),
      catchError(this.handleError)
    )
  }
  handleError(error: HttpErrorResponse){
    return throwError(()=> new Error(error.message))
  }
  getPhoneProductsDetail(phoneId: string):Observable<any>{
    const headers = new HttpHeaders().set("Content-Type", "text/plain;charset=utf-8")
    const requestOptions:Object={
      headers: headers,
      responseType: "text"
    }
    return this._http.get<any>("/phones/"+phoneId, requestOptions).pipe(
      map(res=>JSON.parse(res.replace("[", "").replace("]","")) as Array<PhoneProduct>),
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
    return this._http.get<any>("/laptops/"+laptopId, requestOptions).pipe(
      map(res=>JSON.parse(res.replace("[", "").replace("]","")) as Array<LaptopProduct>),
      retry(3),
      catchError(this.handleError)
    )
  }
  getTabletProductsDetail(tabletId: string):Observable<any>{
    const headers = new HttpHeaders().set("Content-Type", "text/plain;charset=utf-8")
    const requestOptions:Object={
      headers: headers,
      responseType: "text"
    }
    return this._http.get<any>("/tablets/"+tabletId, requestOptions).pipe(
      map(res=>JSON.parse(res.replace("[", "").replace("]","")) as Array<PhoneProduct>),
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
    return this._http.get<any>("/watches/"+watchId, requestOptions).pipe(
      map(res=>JSON.parse(res.replace("[", "").replace("]","")) as Array<WatchProduct>),
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
    return this._http.get<any>("/earphones/"+earphoneId, requestOptions).pipe(
      map(res=>JSON.parse(res.replace("[", "").replace("]","")) as Array<EarphoneProduct>),
      retry(3),
      catchError(this.handleError)
    )
  }
  getPhonesWithBrand(brand: string):Observable<any>{
    const headers = new HttpHeaders().set("Content-Type", "text/plain;charset=utf-8")
    const requestOptions:Object={
      headers: headers,
      responseType: "text"
    }
    return this._http.get<any>("/phones/brand"+brand, requestOptions).pipe(
      map(res=>JSON.parse(res.replace("[", "").replace("]","")) as Array<PhoneProduct>),
      retry(3),
      catchError(this.handleError)
    )
  }
  getPhonesWithMinMaxPrice(minprice:number, maxprice:number):Observable<any>{
    const headers = new HttpHeaders().set("Content-Type", "text/plain;charset=utf-8")
    const requestOptions:Object={
      headers: headers,
      responseType: "text"
    }
    return this._http.get<any>("/phones/price/:"+minprice+"/:"+maxprice, requestOptions).pipe(
      map(res=>JSON.parse(res.replace("[", "").replace("]","")) as Array<PhoneProduct>),
      retry(3),
      catchError(this.handleError)
    )
  }
  getLaptopsWithBrand(brand: string):Observable<any>{
    const headers = new HttpHeaders().set("Content-Type", "text/plain;charset=utf-8")
    const requestOptions:Object={
      headers: headers,
      responseType: "text"
    }
    return this._http.get<any>("/laptops/brand"+brand, requestOptions).pipe(
      map(res=>JSON.parse(res.replace("[", "").replace("]","")) as Array<LaptopProduct>),
      retry(3),
      catchError(this.handleError)
    )
  }
  getLaptopsWithMinMaxPrice(minprice:number, maxprice:number):Observable<any>{
    const headers = new HttpHeaders().set("Content-Type", "text/plain;charset=utf-8")
    const requestOptions:Object={
      headers: headers,
      responseType: "text"
    }
    return this._http.get<any>("/laptops/price/:"+minprice+"/:"+maxprice, requestOptions).pipe(
      map(res=>JSON.parse(res.replace("[", "").replace("]","")) as Array<LaptopProduct>),
      retry(3),
      catchError(this.handleError)
    )
  }
  getTabletsWithBrand(brand: string):Observable<any>{
    const headers = new HttpHeaders().set("Content-Type", "text/plain;charset=utf-8")
    const requestOptions:Object={
      headers: headers,
      responseType: "text"
    }
    return this._http.get<any>("/tablets/brand"+brand, requestOptions).pipe(
      map(res=>JSON.parse(res.replace("[", "").replace("]","")) as Array<PhoneProduct>),
      retry(3),
      catchError(this.handleError)
    )
  }
  getTabletsWithMinMaxPrice(minprice:number, maxprice:number):Observable<any>{
    const headers = new HttpHeaders().set("Content-Type", "text/plain;charset=utf-8")
    const requestOptions:Object={
      headers: headers,
      responseType: "text"
    }
    return this._http.get<any>("/tablets/price/:"+minprice+"/:"+maxprice, requestOptions).pipe(
      map(res=>JSON.parse(res.replace("[", "").replace("]","")) as Array<PhoneProduct>),
      retry(3),
      catchError(this.handleError)
    )
  }
  getEarphonesWithBrand(brand: string):Observable<any>{
    const headers = new HttpHeaders().set("Content-Type", "text/plain;charset=utf-8")
    const requestOptions:Object={
      headers: headers,
      responseType: "text"
    }
    return this._http.get<any>("/earphones/brand"+brand, requestOptions).pipe(
      map(res=>JSON.parse(res.replace("[", "").replace("]","")) as Array<EarphoneProduct>),
      retry(3),
      catchError(this.handleError)
    )
  }
  getEarphonesWithMinMaxPrice(minprice:number, maxprice:number):Observable<any>{
    const headers = new HttpHeaders().set("Content-Type", "text/plain;charset=utf-8")
    const requestOptions:Object={
      headers: headers,
      responseType: "text"
    }
    return this._http.get<any>("/earphone/price/:"+minprice+"/:"+maxprice, requestOptions).pipe(
      map(res=>JSON.parse(res.replace("[", "").replace("]","")) as Array<EarphoneProduct>),
      retry(3),
      catchError(this.handleError)
    )
  }
  getWatchesWithBrand(brand: string):Observable<any>{
    const headers = new HttpHeaders().set("Content-Type", "text/plain;charset=utf-8")
    const requestOptions:Object={
      headers: headers,
      responseType: "text"
    }
    return this._http.get<any>("/watches/brand"+brand, requestOptions).pipe(
      map(res=>JSON.parse(res.replace("[", "").replace("]","")) as Array<WatchProduct>),
      retry(3),
      catchError(this.handleError)
    )
  }
  getWatchesWithMinMaxPrice(minprice:number, maxprice:number):Observable<any>{
    const headers = new HttpHeaders().set("Content-Type", "text/plain;charset=utf-8")
    const requestOptions:Object={
      headers: headers,
      responseType: "text"
    }
    return this._http.get<any>("/watches/price/:"+minprice+"/:"+maxprice, requestOptions).pipe(
      map(res=>JSON.parse(res.replace("[", "").replace("]","")) as Array<WatchProduct>),
      retry(3),
      catchError(this.handleError)
    )
  }
}
