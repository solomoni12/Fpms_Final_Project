import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import * as alertifyjs from 'alertifyjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  imageUrl = 'assets/Untitled-11.jpg';
  
  constructor(
    private formBuilder: UntypedFormBuilder,
    private service: AuthService,
    private router: Router,
  ) {
    sessionStorage.clear();
  }

  userdata: any;
  token: any;
  errorMessage: string = ''; // Variable to hold the error message

  loginform = this.formBuilder.group({
    email: this.formBuilder.control('', Validators.compose([Validators.required, Validators.email])),
    password: this.formBuilder.control('', Validators.required),
  });

  proceedlogin() {
    if (this.loginform.valid) {
      this.service.signin(this.loginform.value).subscribe(
        (result) => {
          this.userdata = result.data.user;

          if (this.userdata.isactive == 1) {
            this.token = result.data.token;

            localStorage.setItem('token', this.token);

            sessionStorage.setItem('token', this.token);
            sessionStorage.setItem('userrole', this.userdata.role);
            sessionStorage.setItem('firstname', this.userdata.fname);
            sessionStorage.setItem('lastname', this.userdata.lname);
            sessionStorage.setItem('email', this.userdata.email);
            sessionStorage.setItem('sex', this.userdata.sex);
            sessionStorage.setItem('phone_number', this.userdata.phone_number);
            sessionStorage.setItem('physical_address', this.userdata.physical_address);
            
            this.router.navigate(['']);
          } else {
            alertifyjs.error('You are not active. Please contact admin via mwalupani@gmail.com');
            this.loginform.reset();
          }
        },
        (error) => {
          alertifyjs.error('Invalid username or password. Please try again!');
        }
      );
    } else {
      alertifyjs.error('Invalid username or password. Please try again!');
    }
  }

  ngOnInit(): void {}
}
