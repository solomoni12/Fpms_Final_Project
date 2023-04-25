import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private formBuilder: UntypedFormBuilder,
    private service: AuthService,
    private router: Router,
  ) {
    sessionStorage.clear();
  }

  userdata: any;
  token:any;

  loginform = this.formBuilder.group({
    email: this.formBuilder.control('', Validators.compose([Validators.required, Validators.email])),
    password: this.formBuilder.control('', Validators.required),
  });

  proceedlogin() {
    if (this.loginform.valid){
      this.service.signin(this.loginform.value).subscribe(
        (result)=>{
          this.userdata = result.data.user;
          
          if(this.userdata.isactive == 1){
            this.token = result.data.token;
            localStorage.setItem('token', this.token);
            
            // console.log(this.token);
            sessionStorage.setItem('token', this.token);
            sessionStorage.setItem('userrole', this.userdata.role);
            sessionStorage.setItem('lastname', this.userdata.lname);
            sessionStorage.setItem('email', this.userdata.email);
            
            this.router.navigate(['']);
          }
        }
      );
    }
  }

  ngOnInit(): void {}
}
