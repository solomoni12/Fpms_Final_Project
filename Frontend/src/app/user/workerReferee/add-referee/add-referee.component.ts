import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import * as alertifyjs from 'alertifyjs';

@Component({
  selector: 'app-add-referee',
  templateUrl: './add-referee.component.html',
  styleUrls: ['./add-referee.component.css']
})
export class AddRefereeComponent implements OnInit {

  errorMessage:any;
  constructor(private formBuilder: UntypedFormBuilder,
    private service: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private dialog: MatDialogRef<AddRefereeComponent>) { }

  ngOnInit(): void {
  }

  registerform=this.formBuilder.group({
    fname:this.formBuilder.control('', Validators.required),
    lname:this.formBuilder.control('', Validators.required),
    phone_number:this.formBuilder.control('', Validators.required),
    physical_address:this.formBuilder.control('', Validators.required),
  })

  proceedregistration(){
    console.log(this.registerform.value);
    const workerId = Number(this.route.snapshot.queryParamMap.get('id'));
    console.log(workerId);
    if(this.registerform.valid){
      this.service.registerReferee(this.registerform.value, workerId)
        .subscribe((res)=>{
          console.log(res);
          alertifyjs.success('referee added sucessful!');
          this.registerform.reset();
          this.dialog.close('update');
        },
        (error)=>{
          this.errorMessage = error.error.message;
          alertifyjs.error(this.errorMessage);
        })
    }
    else{
      
    }
  }

}
