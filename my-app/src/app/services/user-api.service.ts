import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, retry, throwError } from 'rxjs';
import { User } from '../models/User';
import { Otp } from '../models/OTP';


@Injectable({
  providedIn: 'root'
})
export class UserAPIService {

  constructor(private _http:HttpClient) { }

  // sign up
  postUser(aUser:any):Observable<any>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8')
    const requestOptions:Object = {
      headers: headers,
      responseType: 'text'
    }
    return this._http.post<any>('/techshop/register', JSON.stringify(aUser), requestOptions).pipe(
      map(res=>JSON.parse(res) as User),
      retry(3),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 400 && error.error === "Email or phone number already exists") {
          return throwError(() => new Error("Số điện thoại hoặc email này đã được đăng ký"));
        } else {
          return throwError(() => new Error(error.message));
        }
      })
    );
  }
  // login
  loginUser(aUser: any): Observable<User> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    const requestOptions: Object = {
      headers: headers,
      responseType: 'text'
    };
    return this._http.post<any>('/techshop/login', JSON.stringify(aUser), requestOptions).pipe(
      map(res => JSON.parse(res) as User),
      retry(3),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 400 && error.error === "User not found") {
          return throwError(() => new Error("Tài khoản không tồn tại!"));
        } else if (error.status === 400 && error.error === "Wrong password") {
          return throwError(() => new Error("Sai thông tin đăng nhập!"));
        } else {
          return throwError(() => new Error(error.message));
        }
      })
    );
  }

  // Send Email
  sendEmail(email: string): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    const requestOptions: Object = {
      headers: headers,
      responseType: 'text'
    };
    const body = { email: email };
    return this._http.post<any>('/techshop/forget-password', body, requestOptions).pipe(
      retry(3),
      catchError((error: HttpErrorResponse) => {
        return throwError(() => new Error(error.message));
      })
    );
  }

  // Send OTP
  sendOTP(otp: string): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    const requestOptions: Object = {
      headers: headers,
      responseType: 'text'
    };
    const body = { otp: otp };
    return this._http.post<any>('/techshop/check-otp', body, requestOptions).pipe(
      retry(3),
      catchError((error: HttpErrorResponse) => {
        return throwError(() => new Error(error.message));
      })
    );
  }

  // Reset password
  resetPassword(email: string, otp: string, password: string): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    const requestOptions: Object = {
      headers: headers,
      responseType: 'text'
    };
    const body = {
      email,
      otp,
      password
    }
    return this._http.post<any>('/techshop/reset-password', body, requestOptions).pipe(
      retry(3),
      catchError((error: HttpErrorResponse) => {
        return throwError(() => new Error(error.message));
      })
    );
  }

  handleError(error: HttpErrorResponse){
    return throwError(() => new Error(error.message));
  }
}
