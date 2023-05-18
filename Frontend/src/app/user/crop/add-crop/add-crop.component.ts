import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import * as alertifyjs from 'alertifyjs';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-add-crop',
  templateUrl: './add-crop.component.html',
  styleUrls: ['./add-crop.component.css']
})
export class AddCropComponent implements OnInit {

  constructor(private formBuilder: UntypedFormBuilder,
    private service: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private dialog: MatDialogRef<AddCropComponent>) { }

  ngOnInit(): void {
  }

  registerform=this.formBuilder.group({
    crop_name:this.formBuilder.control('', Validators.required),
    planting_date:this.formBuilder.control('', Validators.required),
    harvest_date:this.formBuilder.control('', Validators.required),
    expected_product:this.formBuilder.control('', Validators.required),
  })

  proceedregistration(){
    console.log(this.registerform.value);
    const farmId = Number(this.route.snapshot.queryParamMap.get('id'));
    console.log(farmId);
    if(this.registerform.valid){
      this.service.registerCrop(this.registerform.value, farmId)
        .subscribe(res=>{
          console.log(res);
          alertifyjs.success('crop added sucessful!');
          this.registerform.reset();
          this.dialog.close('update');
        })
        // alertifyjs.error('Failed. Please Try Again');
    }
    else{
      
    }
  }

}
