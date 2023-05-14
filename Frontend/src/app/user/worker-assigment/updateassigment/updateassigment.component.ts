import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/service/auth.service';
import * as alertifyjs from 'alertifyjs';

@Component({
  selector: 'app-updateassigment',
  templateUrl: './updateassigment.component.html',
  styleUrls: ['./updateassigment.component.css']
})
export class UpdateassigmentComponent implements OnInit {

  updateForm !: FormGroup;
  status = ['incomplete', 'complete'];
  constructor(private formBuilder: UntypedFormBuilder,
    private service: AuthService,
    @Inject(MAT_DIALOG_DATA) public editData:any,
    private dialog: MatDialogRef<UpdateassigmentComponent>) { }

  ngOnInit(): void {
    this.updateForm = this.formBuilder.group({
      status:['', Validators.required],
      time_assigned:['', Validators.required],
      time_start:['', Validators.required],
      task_name:['', Validators.required],
      time_complished:['', [Validators.required, Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]],
    });

    console.log(this.editData);
    if(this.editData){
      this.updateForm.controls['time_complished'].setValue(this.editData.time_complished);
      this.updateForm.controls['status'].setValue(this.editData.status);
      this.updateForm.controls['task_name'].setValue(this.editData.task_name);
      this.updateForm.controls['time_start'].setValue(this.editData.time_start);
      this.updateForm.controls['time_assigned'].setValue(this.editData.time_assigned);
    }
  }

  Updateassigment(){
    console.log(this.updateForm.value);
    this.service.updateAssigment(this.updateForm.value, this.editData.id)
      .subscribe({
        next:(res)=>{
        alertifyjs.success('Assigment updated sucessful');
        console.log(res);
        this.updateForm.reset();
        this.dialog.close('update');
      },
      error:(er)=>{
        console.log(er);
        alertifyjs.error('Failed. Please Try Again');
      }
    });
  }
}
