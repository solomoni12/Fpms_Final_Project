import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import * as alertifyjs from 'alertifyjs';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-add-equipment',
  templateUrl: './add-equipment.component.html',
  styleUrls: ['./add-equipment.component.css']
})
export class AddEquipmentComponent implements OnInit {

  statuslist = ['sold','processed','in stock'];
  namelist:any;

  constructor(
     private formBuilder: UntypedFormBuilder,
     private service: AuthService, 
     private router: Router,
     @Inject(MAT_DIALOG_DATA) public data:any,
     private dialog: MatDialogRef<AddEquipmentComponent>
  ){
    this.registerform = this.formBuilder.group({
      name: ['', Validators.required],
      equipment_quantity: ['', Validators.required]
    });
  }

    registerform=this.formBuilder.group({
      name:this.formBuilder.control('', Validators.required),
      equipment_quantity:this.formBuilder.control('', Validators.required),
    })

    ngOnInit(): void {

    }
 
  proceedregistration(){
    console.log(this.registerform.value);
    if(this.registerform.valid){
      this.service.registerInput(this.registerform.value)
        .subscribe(res=>{
          console.log(res);
          alertifyjs.success('Input added sucessful');
          this.registerform.reset();
          this.dialog.close('update');
        },
        error =>{
          alertifyjs.error('Failed. Please Try Again');
        }
        );
        
    }
    else{
      
    }
}

}
