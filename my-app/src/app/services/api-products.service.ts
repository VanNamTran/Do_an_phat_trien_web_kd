import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse ,HttpHeaders} from '@angular/common/http';
import { catchError,map,Observable,retry,throwError } from 'rxjs';
import { IPhones } from '../interfaces/Phone';
import { Iputfavorite } from '../interfaces/favorite';

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
  handleError(error:HttpErrorResponse){
    return throwError(()=> new Error (error.message))
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
