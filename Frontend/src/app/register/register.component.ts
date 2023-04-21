import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private formBuilder: UntypedFormBuilder,
    private service: AuthService,
    private router: Router) { }

    registerform=this.formBuilder.group({
      //email:this.formBuilder.control('', Validators.compose([Validators.required, Validators.email])),
      fname:this.formBuilder.control('', Validators.required),
      lname:this.formBuilder.control('', Validators.required),
      phone_number:this.formBuilder.control('', Validators.required),
      physical_address:this.formBuilder.control('', Validators.required),
      password:this.formBuilder.control('', Validators.required),
      password_confirmation:this.formBuilder.control('', Validators.required),
      email:this.formBuilder.control('', Validators.compose([Validators.required,Validators.email])),
      sex:this.formBuilder.control('male'),
      role:this.formBuilder.control('0'),
      isactive:this.formBuilder.control('0'),
    })

    proceedregistration(){
      console.log(this.registerform.value);
      if(this.registerform.valid){
        this.service.register(this.registerform.value)
          .subscribe(res=>{
            console.log(res);
            this.router.navigate(['login']);
          });
      }else{

      }
    }

  ngOnInit(): void {
  }

}
