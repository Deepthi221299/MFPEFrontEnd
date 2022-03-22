import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Carts } from '../Models/Carts';

@Injectable({
  providedIn: 'root',
})
export class ProceedToBuyService {
  readonly ApiUrl = 'https://localhost:44331/api/ProceedToBuy';
  readonly ApiUrl1='https://localhost:44331/api/ProceedToBuy/AddingTocart';
  readonly ApiUrl2='https://localhost:44331/api/ProceedToBuy/AddingToWishList?customerId=1&productId=7&quantity=10&vendorid=1';
  userId = localStorage.getItem('id');
  vendorId=localStorage.getItem('id');
  constructor(private http: HttpClient) {}

  getCarts() {
    return this.http.get<any[]>(this.ApiUrl+'/GetAllcarts');
  }
  
  
  addCarts(emp:Carts):Observable<any>{
    return this.http.post<any>(this.ApiUrl1,emp);
  }
  
  createWishlist(val: number) {
    let apiurl = this.ApiUrl + '/AddingToWishList?customerId=' + this.userId + '&productId=' + val+'&vendorid='+this.vendorId;
    return this.http.post(apiurl, null).subscribe();
  }
  
  getWishlist() {
    return this.http.get(this.ApiUrl+'/GetAllWishList');
  }
  
  getVendorDetails(val: any) {
    return this.http.get<any>(this.ApiUrl+ val);
  }
  
  deleteCart(customerId:number){
    return this.http.get<any>(`${this.ApiUrl}/DeleteAll/${customerId}`);
  }
}