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
      map(res=>JSON.parse(res.slice(1,-1)) as Array<PhoneProduct>),
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
      map(res=>JSON.parse(res.slice(1,-1)) as Array<LaptopProduct>),
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
      map(res=>JSON.parse(res.slice(1,-1)) as Array<PhoneProduct>),
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
      map(res=>JSON.parse(res.slice(1,-1)) as Array<WatchProduct>),
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
      map(res=>JSON.parse(res.slice(1,-1)) as Array<EarphoneProduct>),
      retry(3),
      catchError(this.handleError)
    )
  }
}
