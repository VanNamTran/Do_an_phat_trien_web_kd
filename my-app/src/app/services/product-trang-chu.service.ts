import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, retry, throwError } from 'rxjs';
import { Products } from '../interfaces/products';


@Injectable({
  providedIn: 'root'
})
export class ProductTrangChuService {
  constructor(private _http: HttpClient) { }
  getProducts():Observable<any>
  {
    const headers=new HttpHeaders().set("Content-Type","text/plain;charset=utf-8")
    const requestOptions:Object={
      headers:headers,
      responseType:"text"
    }
    return this._http.get<any>("/tonghop",requestOptions).pipe(
      map(res=>JSON.parse(res) as Array<Products>),
      retry(3),
      catchError(this.handleError))
  }

  handleError(error:HttpErrorResponse){
    return throwError(()=>new Error(error.message))
  }


  getproduct(productId:string):Observable<any>
  {
    const headers=new HttpHeaders().set("Content-Type","text/plain;charset=utf-8")
    const requestOptions:Object={
      headers:headers,
      responseType:"text"
    }
    return this._http.get<any>("/tonghop/"+productId, requestOptions).pipe(
      map(res=>JSON.parse(res) as Products),
      retry(3),
      catchError(this.handleError))
  }

  postProduct(aProduct:any):Observable<any>
  {
    const headers=new HttpHeaders().set("Content-Type","application/json;charset=utf-8")
    const requestOptions:Object={
      headers:headers,
      responseType:"text"
    }
    return this._http.post<any>("/tonghop",JSON.stringify(aProduct),requestOptions).pipe(
    map(res=>JSON.parse(res) as Products),
    retry(3),
    catchError(this.handleError))
  }
}
