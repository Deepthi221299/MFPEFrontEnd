import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuard implements CanActivate {
  constructor(private router:Router){}
  canActivate(route: ActivatedRouteSnapshot,  state: RouterStateSnapshot): boolean {
      if(sessionStorage.getItem('token')!=null)
      return true;
        else
        this.router.navigate(['/login']);
        return false;
  }
  
}
