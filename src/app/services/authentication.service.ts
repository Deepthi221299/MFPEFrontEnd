import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  //readonly ApiUrl =    'https://retailmanagementsystemapp.azurewebsites.net/api/Auth';
  readonly ApiUrl = 'https://localhost:44368/api/Auth';
  //https://localhost:44368/api/Auth/GetAllUsers
  constructor(private http: HttpClient) {}
  authenticationUser(formData: any) {
    return this.http.post(this.ApiUrl, formData,{responseType:'text'});
  }
  authenticationGetAllUser() {
    return this.http.get(`${this.ApiUrl}/GetAllUsers`);
  } 
}