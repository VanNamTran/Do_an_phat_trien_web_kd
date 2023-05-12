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


  handleError(error:HttpErrorResponse){
    return throwError(()=> new Error (error.message))
  }
}
