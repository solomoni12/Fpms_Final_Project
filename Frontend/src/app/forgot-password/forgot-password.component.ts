import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import * as alertifyjs from 'alertifyjs';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(
    private formBuilder: UntypedFormBuilder,
    private service: AuthService,
    private router: Router,
  ) {

  }

  token: any;
  errorMessage: string = '';

  loginform = this.formBuilder.group({
    email: this.formBuilder.control('', Validators.compose([Validators.required, Validators.email]))
  });

  proceedsubmit() {
    if (this.loginform.valid) {
      this.service.forgotPassword(this.loginform.value).subscribe(
        (result) => {
          this.token = result.data;
          console.log(this.token.token);
          alertifyjs.success(this.token.message);
          this.router.navigate(['/reset-password'], { queryParams: { token: this.token.token } });
        },
        (error) => {
          this.errorMessage = error.error.message;
          console.log(this.errorMessage);
          alertifyjs.error(this.errorMessage);
        }
      );
    } else {
      alertifyjs.error('Failed. Please try again!');
    }
  }
  

  ngOnInit(): void {
  }

}
