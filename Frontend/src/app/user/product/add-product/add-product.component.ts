import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import * as alertifyjs from 'alertifyjs';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  statuslist = ['sold','processed','in stock'];
  namelist:any;
  constructor(private formBuilder: UntypedFormBuilder,
    private service: AuthService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private dialog: MatDialogRef<AddProductComponent>) { }

  registerform=this.formBuilder.group({
    product_name:this.formBuilder.control('', Validators.required),
    harvest_date:this.formBuilder.control('', Validators.required),
    quantity:this.formBuilder.control('', Validators.required),
    crop_name:this.formBuilder.control('', Validators.required),
    status:this.formBuilder.control('', Validators.required),
  })

  ngOnInit(): void {
    this.service.getCrop(this.data.id).subscribe(res => {
      this.namelist = res.data;
      console.log(this.namelist);
    });
    console.log(this.data);
  }

  proceedregistration(){
    console.log(this.registerform.value);
    if(this.registerform.valid){
      this.service.registerProduct(this.registerform.value, this.data.id, this.registerform.value.crop_name)
        .subscribe({ next:res=>{
          console.log(res);
          alertifyjs.success('Product added sucessful');
          this.registerform.reset();
          this.dialog.close('update');
        }, 
        error:()=>{
          alertifyjs.error('Failed. Please Try Again');
        }}) 
    }
    else{
      
    }
  }
}
