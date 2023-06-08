import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import * as alertifyjs from 'alertifyjs';

@Component({
  selector: 'app-assign-task-worker',
  templateUrl: './assign-task-worker.component.html',
  styleUrls: ['./assign-task-worker.component.css']
})
export class AssignTaskWorkerComponent implements OnInit {

  statuslist = ['in progress'];
  tasklist = ['Plant', 'inspect','harvest crops','Irrigate farm soil','Apply fertilizer or pesticide solutions ']
  namelist:any;
  errerMessage:any;
  constructor(private formBuilder: UntypedFormBuilder,
    private service: AuthService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private dialog: MatDialogRef<AssignTaskWorkerComponent>) { }

  registerform=this.formBuilder.group({
    task_name:this.formBuilder.control('', Validators.required),
    time_start:this.formBuilder.control('', [Validators.required, Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]),
    time_assigned:this.formBuilder.control('', [Validators.required, Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]),
    name:this.formBuilder.control('', Validators.required),
    status:this.formBuilder.control('', Validators.required),
  })

  ngOnInit(): void {
    this.service.getFarm().subscribe(res=>{
      this.namelist = res.data.user;
      console.log(this.namelist);
    })
    console.log(this.data);
  }

  proceedregistration(){
    console.log(this.registerform.value);
    if(this.registerform.valid){
      this.service.assignTaskToWorker(this.registerform.value, this.data.id, this.registerform.value.name)
        .subscribe((res)=>{
          console.log(res);
          alertifyjs.success('Worker assign task sucessful');
          this.router.navigate(['/assigment']);
          this.registerform.reset();
          this.dialog.close('update');
        },
        (error)=>{
          this.errerMessage = error.error;
          alertifyjs.error(this.errerMessage.error);
          this.registerform.reset();
          this.dialog.close('update');
        })
    }
    else{
      
    }
  }
}
