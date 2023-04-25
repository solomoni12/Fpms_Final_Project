import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/service/auth.service';
import { AddworkerComponent } from '../addworker/addworker.component';
import { UpdateworkerComponent } from '../updateworker/updateworker.component';
import * as alertifyjs from 'alertifyjs';
import { AssignTaskWorkerComponent } from '../assign-task-worker/assign-task-worker.component';

@Component({
  selector: 'app-workerlisting',
  templateUrl: './workerlisting.component.html',
  styleUrls: ['./workerlisting.component.css']
})
export class WorkerlistingComponent implements OnInit {

  constructor(
    private service: AuthService,
    private dialog: MatDialog
  ) {
    this.LoadWorker();
   }

  workerlist:any;
  dataSource:any;
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !:MatSort;

  LoadWorker(){
    this.service.getWorker().subscribe(res=>{
      this.workerlist = res.data;
      // console.log(this.workerlist);
      this.dataSource = new MatTableDataSource(this.workerlist);
      // console.log(this.dataSource);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }
  ngOnInit(): void {
  }
  displayedColumns: string[] = ['fname', 'lname', 'sex', 'phone_number','physical_address', 'action'];

  AddWorker(){
    const addpop = this.dialog.open(AddworkerComponent,{
      enterAnimationDuration:'1000ms',
       exitAnimationDuration:'100ms',
       width:'50%',
    })
    addpop.afterClosed().subscribe(res=>{
      this.LoadWorker();
    });
  }

  assignTaskWorker(element:any){
    const assignWorker = this.dialog.open(AssignTaskWorkerComponent,{
      enterAnimationDuration:'1000ms',
      exitAnimationDuration:'100ms',
      width:'50%',
      data:element
    })
    assignWorker.afterClosed().subscribe(res=>{
      this.LoadWorker();
    });
  }
  updateWorker(element:any){
    const popup = this.dialog.open(UpdateworkerComponent,{
       enterAnimationDuration:'1000ms',
       exitAnimationDuration:'100ms',
       width:'50%',
       data:element
     })
     popup.afterClosed().subscribe(res=>{
       this.LoadWorker();
     });
   }

   deleteWorker(id: number){
    const deletepop = this.service.deleteworker(id)
          .subscribe({
            next:(res)=>{
             alertifyjs.success('Deleted successful');
            },
            error:()=>{
              alertifyjs.error('Failed. Please Try Again');
            }
          })
      if(deletepop){
        this.LoadWorker();
      }
    }
}
