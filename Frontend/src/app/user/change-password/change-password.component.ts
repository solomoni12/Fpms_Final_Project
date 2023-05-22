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

    registerform=this.formBuilder.group({
      password:this.formBuilder.control('', Validators.required),
      password_confirmation:this.formBuilder.control('', Validators.required),
      email:this.formBuilder.control('', Validators.compose([Validators.required,Validators.email]))
    })

    proceedregistration(){
      console.log(this.registerform.value);
      if(this.registerform.valid){
        this.service.changepassword(this.registerform.value)
          .subscribe(res=>{
            console.log(res);
            alertifyjs.success('Password changed sucessful');
            this.registerform.reset();
          },
          error =>{
            alertifyjs.error('Failed. Please Try Again');
          }
          );
          
      }
      else{
        
      }
  }

  ngOnInit(): void {
  }

}
