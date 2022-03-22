import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MFPE';
  constructor(private router: Router) { }
  ngOnInit() {
    this.router.navigate(['/login']);

  }

  onLogout() {
    this.removeSessionStorage();
    this.router.navigate(['/login']);
  }

  showButtons():boolean{
    return sessionStorage.getItem('token')!=null;
  }

  removeSessionStorage():void{
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('id');
    sessionStorage.removeItem('address');
  }

  ngOnDestroy(): void {
  this.removeSessionStorage();
  }
}
