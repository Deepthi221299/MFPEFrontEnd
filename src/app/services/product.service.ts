import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  readonly apiUrl = 'https://localhost:44339/api/Product';
  constructor(private http: HttpClient) {}

  getAllProducts() {
    return this.http.get(this.apiUrl + '/GetAllProducts');
  }
  getProductById(val: number) {
    return this.http.get<any>(`${this.apiUrl}/SearchProductById?productId=${val}`);
  }
  getProductByName(val: string) {
    return this.http.get<any>(`${this.apiUrl}/SearchProductByName?productName=${val}`);
  }
  updateRating(id:number,rating:number):Observable<any>{
    return this.http.put<any>(`${this.apiUrl}/AddProductRating/${id}/${rating}`,{
      headers:new HttpHeaders({
        'Content-Type':'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Method':'*'
      })
    });
  }
}