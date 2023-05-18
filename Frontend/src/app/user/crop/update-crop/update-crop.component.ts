import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import * as alertifyjs from 'alertifyjs';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-update-crop',
  templateUrl: './update-crop.component.html',
  styleUrls: ['./update-crop.component.css']
})
export class UpdateCropComponent implements OnInit {

  updateForm !: FormGroup;
  constructor(
    private formBuilder: UntypedFormBuilder,
    private service: AuthService,
    @Inject(MAT_DIALOG_DATA) public editData:any,
    private dialog: MatDialogRef<UpdateCropComponent>
    ) { }

  ngOnInit(): void {
    this.updateForm = this.formBuilder.group({
        crop_name:['', Validators.required],
        planting_date:['', Validators.required],
        harvest_date:['', Validators.required],
        expected_product:['', Validators.required],
      });
      console.log(this.editData);
      if(this.editData){
        this.updateForm.controls['crop_name'].setValue(this.editData.crop_name);
        this.updateForm.controls['planting_date'].setValue(this.editData.planting_date);
        this.updateForm.controls['harvest_date'].setValue(this.editData.harvest_date);
        this.updateForm.controls['expected_product'].setValue(this.editData.expected_product);
      }
      
  }

  Updatefarm(){
    if(this.updateForm.valid){
      this.service.UpdateCrop(this.updateForm.value, this.editData.id)
      .subscribe({
        next:(res)=>{
        alertifyjs.success('farm detail updated sucessful');
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
