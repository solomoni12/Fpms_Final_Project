import { Component, OnInit, Inject } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-updatepopup',
  templateUrl: './updatepopup.component.html',
  styleUrls: ['./updatepopup.component.css']
})
export class UpdatepopupComponent implements OnInit {

  rolelist:any;
  constructor(
    private formBuilder: UntypedFormBuilder,
    private service: AuthService,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private dialog: MatDialogRef<UpdatepopupComponent>
    ) { }

  registerform=this.formBuilder.group({
    id:this.formBuilder.control(''),
    fname:this.formBuilder.control(''),
    lname:this.formBuilder.control(''),
    phone_number:this.formBuilder.control(''),
    physical_address:this.formBuilder.control(''),
    password:this.formBuilder.control(''),
    email:this.formBuilder.control(''),
    sex:this.formBuilder.control('male'),
    role:this.formBuilder.control('', Validators.required),
    isactive:this.formBuilder.control('false')
  })

  updateuser(){
    if(this.registerform.valid){
      this.service
        
    }else{}
  }

  editdata:any;

  ngOnInit(): void {
    this.service.profileUser().subscribe(res=>{
      this.rolelist = res;
      console.log(this.rolelist);
    })
    if(this.data.usercode != null && this.data.usercode != ''){
      this.service.profileUser().subscribe(res=>{
        this.editdata = res;
        this.registerform.setValue({
          id:this.editdata.id,
          fname:this.editdata.fname,
          lname:this.editdata.lname,
          phone_number:this.editdata.phone_number,
          physical_address:this.editdata.physical_address,
          email:this.editdata.email,
          password:this.editdata.password,
          role:this.editdata.role,
          sex:this.editdata.gender,
          isactive:this.editdata.isactive
        })
      });
    }
  }

}
