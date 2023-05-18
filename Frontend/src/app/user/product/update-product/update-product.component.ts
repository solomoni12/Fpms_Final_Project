import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import * as alertifyjs from 'alertifyjs';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

  updateForm !: FormGroup;
  constructor(
    private formBuilder: UntypedFormBuilder,
    private service: AuthService,
    @Inject(MAT_DIALOG_DATA) public editData:any,
    private dialog: MatDialogRef<UpdateProductComponent>
    ) { }
  ngOnInit(): void {
    this.updateForm = this.formBuilder.group({
      product_name:['', Validators.required],
      harvest_date:['', Validators.required],
      quantity:['', Validators.required],
      status:['', Validators.required],
      });
      console.log(this.editData);
      if(this.editData){
        this.updateForm.controls['product_name'].setValue(this.editData.product_name);
        this.updateForm.controls['harvest_date'].setValue(this.editData.harvest_date);
        this.updateForm.controls['quantity'].setValue(this.editData.quantity);
        this.updateForm.controls['status'].setValue(this.editData.status);
      }
      
  }

  Updatefarm(){
    if(this.updateForm.valid){
      this.service.UpdateProduct(this.updateForm.value, this.editData.id)
      .subscribe({
        next:(res)=>{
        alertifyjs.success('product detail updated sucessful');
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
