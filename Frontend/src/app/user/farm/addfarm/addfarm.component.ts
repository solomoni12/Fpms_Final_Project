import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import * as alertifyjs from 'alertifyjs';

@Component({
  selector: 'app-addfarm',
  templateUrl: './addfarm.component.html',
  styleUrls: ['./addfarm.component.css']
})
export class AddfarmComponent implements OnInit {

  constructor(
    private formBuilder: UntypedFormBuilder,
    private service: AuthService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private dialog: MatDialogRef<AddfarmComponent>
  ) { }

  ngOnInit(): void {
    this.proceedregistration();
  }

  registerform=this.formBuilder.group({
    name:this.formBuilder.control('', Validators.required),
    location:this.formBuilder.control('', Validators.required),
    land_title:this.formBuilder.control('', Validators.required),
    size:this.formBuilder.control('', Validators.required),
  })

  proceedregistration(){
    // console.log(this.registerform.value);
    if(this.registerform.valid){
      this.service.registerFarm(this.registerform.value)
        .subscribe(res=>{
          console.log(res);
          alertifyjs.success('added sucessful');
          this.registerform.reset();
          this.dialog.close('update');
        })
        error:()=>{
          alertifyjs.error('Failed. Please Try Again');
        }
    }
  }
}