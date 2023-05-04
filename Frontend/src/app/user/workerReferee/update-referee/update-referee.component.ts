import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/service/auth.service';
import * as alertifyjs from 'alertifyjs';

@Component({
  selector: 'app-update-referee',
  templateUrl: './update-referee.component.html',
  styleUrls: ['./update-referee.component.css']
})
export class UpdateRefereeComponent implements OnInit {

  updateForm !: FormGroup;
  constructor(private formBuilder: UntypedFormBuilder,
    private service: AuthService,
    @Inject(MAT_DIALOG_DATA) public editData:any,
    private dialog: MatDialogRef<UpdateRefereeComponent>) { }

  ngOnInit(): void {
    this.updateForm = this.formBuilder.group({
      fname:['', Validators.required],
      lname:['', Validators.required],
      phone_number:['', Validators.required],
      physical_address:['', Validators.required],
    });

    console.log(this.editData);
    if(this.editData){
      this.updateForm.controls['fname'].setValue(this.editData.fname);
      this.updateForm.controls['lname'].setValue(this.editData.lname);
      this.updateForm.controls['phone_number'].setValue(this.editData.phone_number);
      this.updateForm.controls['physical_address'].setValue(this.editData.physical_address);
    }
  }
  Updatereferee(){
    this.service.updateReferee(this.updateForm.value, this.editData.id)
      .subscribe({
        next:(res)=>{
        alertifyjs.success(' worker referee updated sucessful');
        console.log(res);
        this.updateForm.reset();
        this.dialog.close('update');
      },
      error:(th)=>{
        alertifyjs.error('Failed. Please Try Again');
      }
    });
  }

}
