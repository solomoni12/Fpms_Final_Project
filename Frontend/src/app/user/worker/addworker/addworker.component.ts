import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import * as alertifyjs from 'alertifyjs';

@Component({
  selector: 'app-addworker',
  templateUrl: './addworker.component.html',
  styleUrls: ['./addworker.component.css']
})
export class AddworkerComponent implements OnInit {


  sexlist = ['male','female'];
  constructor(private formBuilder: UntypedFormBuilder,
    private service: AuthService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private dialog: MatDialogRef<AddworkerComponent>) { }

  ngOnInit(): void {
  }

  registerform=this.formBuilder.group({
    fname:this.formBuilder.control('', Validators.required),
    mname:this.formBuilder.control('', Validators.required),
    lname:this.formBuilder.control('', Validators.required),
    sex:this.formBuilder.control('', Validators.required),
    phone_number:this.formBuilder.control('', Validators.required),
    physical_address:this.formBuilder.control('', Validators.required),
  })

  proceedregistration(){
    console.log(this.registerform.value);
    if(this.registerform.valid){
      this.service.registerWorker(this.registerform.value)
        .subscribe(res=>{
          console.log(res);
          alertifyjs.success('Worker added sucessful!');
          this.registerform.reset();
          this.dialog.close('update');
        },
        error=>{
          alertifyjs.error('Phone number already exist. Please Try Again');
        })
    }
    else{
      
    }
  }

}
