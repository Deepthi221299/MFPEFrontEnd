import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class VendorService {
  readonly ApiUrl='https://localhost:44330/api/Vendor';
  
  constructor(private http:HttpClient) { }
  
  getAllVendors(){
    return this.http.get(this.ApiUrl);
  }
  getVendorId(id:any){
   return this.http.get(this.ApiUrl+'/',id);
  }
  //https://localhost:44330/api/Vendor/VendorId?Id=1
  getVendorStockId(id:any){
    return this.http.get(`${this.ApiUrl}/VendorId?Id=${id}`);
   }

  
}