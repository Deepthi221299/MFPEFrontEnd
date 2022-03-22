import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SELECT_ITEM_HEIGHT_EM } from '@angular/material/select/select';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { SnackbarService, SnackType } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    formModel={
        UserId:0,
        UserName:'',
        Password:'',
        Location:''
      }
      userName:any;
        constructor(private service:AuthenticationService,private router:Router,private route:ActivatedRoute,private snackbarService:SnackbarService) { }
      
        ngOnInit(): void {
          this.userName=this.route.snapshot.paramMap.get('userName')
        }
      onSubmit(form:NgForm)
      {
        
        this.service.authenticationUser(form.value).subscribe(
        (res:any)=>{
          if(res!="User Not Found")
          {
            //username: 'Deepu', id: 'Deepu', address: '', length: 4}
            sessionStorage.setItem('token',res);
            sessionStorage.setItem('username',this.formModel.UserName);
            sessionStorage.setItem('password',this.formModel.Password);
            console.log(sessionStorage);
            //this.router.navigateByUrl(`/Product${this.formModel.UserName}`);
            this.router.navigateByUrl('/Product');
          }
            
        },error => {
          this.snackbarService.openSnackBar('Invalid Username or Password',SnackType.ERROR)

        });
      }
  }
