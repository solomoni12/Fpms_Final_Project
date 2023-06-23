import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/service/auth.service';
import * as alertifyjs from 'alertifyjs';

@Component({
  selector: 'app-updatefarm',
  templateUrl: './updatefarm.component.html',
  styleUrls: ['./updatefarm.component.css']
})
export class UpdatefarmComponent implements OnInit {

updateForm !: FormGroup;
  constructor(
    private formBuilder: UntypedFormBuilder,
    private service: AuthService,
    @Inject(MAT_DIALOG_DATA) public editData:any,
    private dialog: MatDialogRef<UpdatefarmComponent>
    ) { }

  ngOnInit(): void {
    this.updateForm = this.formBuilder.group({
        name:['', Validators.required],
        location:['', Validators.required],
        land_title:['', Validators.required],
        size:['', Validators.required],
      });
      console.log(this.editData);
      if(this.editData){
        this.updateForm.controls['name'].setValue(this.editData.name);
        this.updateForm.controls['location'].setValue(this.editData.location);
        this.updateForm.controls['land_title'].setValue(this.editData.land_title);
        this.updateForm.controls['size'].setValue(this.editData.size);
      }
      
  }

  Updatefarm(){
    if(this.updateForm.valid){
      this.service.updatFarm(this.updateForm.value, this.editData.id)
      .subscribe({
        next:(res)=>{
        alertifyjs.success('farm detail updated sucessful');
        console.log(res);
        this.updateForm.reset();
        this.dialog.close('update');
      }, 
      error: ()=>{
        alertifyjs.error('failed. Please Try again');
      }
    });
  }else{
    alertifyjs.error('failed. Please Try again');
  }
  
  }
}
