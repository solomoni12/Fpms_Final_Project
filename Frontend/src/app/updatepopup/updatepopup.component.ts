import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import * as alertifyjs from 'alertifyjs';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-updatepopup',
  templateUrl: './updatepopup.component.html',
  styleUrls: ['./updatepopup.component.css']
})
export class UpdatepopupComponent implements OnInit {

  updateForm !: FormGroup;
  constructor(
    private formBuilder: UntypedFormBuilder,
    private service: AuthService,
    @Inject(MAT_DIALOG_DATA) public editData:any,
    private dialog: MatDialogRef<UpdatepopupComponent>
    ) { }
  ngOnInit(): void {
    this.updateForm = this.formBuilder.group({
      fname:['', Validators.required],
      lname:['', Validators.required],
      role:['', Validators.required],
      sex:['',Validators.required],
      isactive:['', Validators.required],
      physical_address:['', Validators.required],
      phone_number:['', Validators.required],
      email:['', Validators.required],
      });
      console.log(this.editData.usercode);
      if(this.editData.usercode){
        this.updateForm.controls['fname'].setValue(this.editData.usercode.fname);
        this.updateForm.controls['lname'].setValue(this.editData.usercode.lname);
        this.updateForm.controls['role'].setValue(this.editData.usercode.role);
        this.updateForm.controls['sex'].setValue(this.editData.usercode.sex);
        this.updateForm.controls['isactive'].setValue(this.editData.usercode.isactive);
        this.updateForm.controls['physical_address'].setValue(this.editData.usercode.physical_address);
        this.updateForm.controls['phone_number'].setValue(this.editData.usercode.phone_number);
        this.updateForm.controls['email'].setValue(this.editData.usercode.email);
      }
      
  }

  UpdateUser(){
    if(this.updateForm.valid){
      this.service.UpdateUser(this.updateForm.value, this.editData.usercode.id)
      .subscribe({
        next:(res)=>{
        alertifyjs.success('user updated sucessful');
        console.log(res);
        this.updateForm.reset();
        this.dialog.close('update');
      }
    });
    }else{
      alertifyjs.error('failed. Please Try again');
    }
  
  }
}
