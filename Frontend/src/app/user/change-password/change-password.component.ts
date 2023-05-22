import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import * as alertifyjs from 'alertifyjs';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(
    private formBuilder: UntypedFormBuilder,
    private service: AuthService,
    private router: Router) { }

  registerform = this.formBuilder.group({
    password: this.formBuilder.control('', Validators.required),
    password_confirmation: this.formBuilder.control('', Validators.required)
  });

  proceedregistration() {
    console.log(this.registerform.value);
    if (this.registerform.valid) {
      const password = this.registerform.get('password')?.value;
      const confirmPassword = this.registerform.get('password_confirmation')?.value;

      if (password === confirmPassword) {
        this.service.changepassword(this.registerform.value)
          .subscribe(
            res => {
              console.log(res);
              alertifyjs.success('Password changed successfully');
              this.registerform.reset();
              this.router.navigate(['/']); // Navigate to home page
            },
            error => {
              alertifyjs.error('Failed. Please try again');
            }
          );
      } else {
        alertifyjs.error('Password and Confirm Password do not match');
      }
    } else {
      // Handle form validation errors if needed
    }
  }

  ngOnInit(): void {
  }

}
