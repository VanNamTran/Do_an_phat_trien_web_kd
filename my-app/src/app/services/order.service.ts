import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse ,HttpHeaders} from '@angular/common/http';
import { catchError,map,Observable,retry,throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiOrder='/order'
  constructor(private _http:HttpClient) { }

  postNewOrder(customerId:string,products: any[],user:any):Observable<any>{
    const requestBody = {
      customerId: customerId,
      info:user,
      products:products
    };

    return this._http.post<any>(this.apiOrder, requestBody).pipe(
      map(res=>res),
      retry(3),
      catchError((error: HttpErrorResponse) => {
        return throwError(()=> new Error (error.message))
      })
    );
  }
  getOrder():Observable<any>{
    const headers = new HttpHeaders().set('Content-Type', 'text/plain;charset=utf-8');
    const requestOptions:Object={
      headers: headers,
      responseType: "text"
    }
    return this._http.get<any>("/order", requestOptions).pipe(
      map(res=>JSON.parse(res) ),
      retry(3),
      catchError(this.handleError)
    )
  }


  handleError(error:HttpErrorResponse){
    return throwError(()=> new Error (error.message))
  }
}
