import { Component,Inject, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/service/auth.service';
import * as alertifyjs from 'alertifyjs';

@Component({
  selector: 'app-updateworker',
  templateUrl: './updateworker.component.html',
  styleUrls: ['./updateworker.component.css']
})
export class UpdateworkerComponent implements OnInit {

  updateForm !: FormGroup;
  constructor(private formBuilder: UntypedFormBuilder,
    private service: AuthService,
    @Inject(MAT_DIALOG_DATA) public editData:any,
    private dialog: MatDialogRef<UpdateworkerComponent>) { }

  ngOnInit(): void {
    this.updateForm = this.formBuilder.group({
      fname:['', Validators.required],
      lname:['', Validators.required],
      sex:['', Validators.required],
      phone_number:['', Validators.required],
      physical_address:['', Validators.required],
    });

    console.log(this.editData);
    if(this.editData){
      this.updateForm.controls['fname'].setValue(this.editData.fname);
      this.updateForm.controls['lname'].setValue(this.editData.lname);
      this.updateForm.controls['sex'].setValue(this.editData.sex);
      this.updateForm.controls['phone_number'].setValue(this.editData.phone_number);
      this.updateForm.controls['physical_address'].setValue(this.editData.physical_address);
    }
  }

  Updateworker(){
    this.service.updatWorker(this.updateForm.value, this.editData.id)
      .subscribe({
        next:(res)=>{
        alertifyjs.success('worker updated sucessful');
        console.log(res);
        this.updateForm.reset();
        this.dialog.close('update');
      },
      error:()=>{
        alertifyjs.error('Failed. Please Try Again');
      }
    });
  }
}
