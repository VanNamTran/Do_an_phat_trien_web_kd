import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, retry, throwError } from 'rxjs';
import { Phone } from '../models/Phones';

@Injectable({
  providedIn: 'root'
})
export class AdminAPIProductService {
 constructor(private _http: HttpClient) { }
  getPhones():Observable<any>
  {
    const headers=new HttpHeaders().set("Content-Type","text/plain;charset=utf-8")
    const requestOptions:Object={
      headers:headers,
      responseType:"text"
    }
    return this._http.get<any>("/phone",requestOptions).pipe(
      map(res=>JSON.parse(res) as Array<Phone>),
      retry(3),
      catchError(this.handleError))
  }

  handleError(error:HttpErrorResponse){
    return throwError(()=>new Error(error.message))
  }


  getPhone(phoneId:string):Observable<any>
  {
    const headers=new HttpHeaders().set("Content-Type","text/plain;charset=utf-8")
    const requestOptions:Object={
      headers:headers,
      responseType:"text"
    }
    return this._http.get<any>("/phone/"+phoneId, requestOptions).pipe(
      map(res=>JSON.parse(res) as Phone),
      retry(3),
      catchError(this.handleError))
  }

  postPhone(aPhone:any):Observable<any>
  {
    const headers=new HttpHeaders().set("Content-Type","application/json;charset=utf-8")
    const requestOptions:Object={
      headers:headers,
      responseType:"text"
    }
    return this._http.post<any>("/phone",JSON.stringify(aPhone),requestOptions).pipe(
    map(res=>JSON.parse(res) as Array<Phone>),
    retry(3),
    catchError(this.handleError))
  }

  putPhone(aPhone:any):Observable<any>
  {
    const headers=new HttpHeaders().set("Content-Type","application/json;charset=utf-8")
    const requestOptions:Object={
      headers:headers,
      responseType:"text"
    }
    return this._http.put<any>("/phone",JSON.stringify(aPhone),requestOptions).pipe(
      map(res=>JSON.parse(res) as Array<Phone>),
      retry(3),
      catchError(this.handleError))
  }

  deletePhone(phoneId:string):Observable<any>
  {
    const headers=new HttpHeaders().set("Content-Type","application/json;charset=utf-8")
    const requestOptions:Object={
      headers:headers,
      responseType:"text"
    }
    return this._http.delete<any>("/phone/"+phoneId,requestOptions).pipe(
      map(res=>JSON.parse(res) as Array<Phone>),
      retry(3),
      catchError(this.handleError))
  }
}
