import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/service/auth.service';
import { ActivatedRoute } from '@angular/router';
import { UpdateassigmentComponent } from './updateassigment/updateassigment.component';
import { MatDialog } from '@angular/material/dialog';
import * as alertifyjs from 'alertifyjs';

@Component({
  selector: 'app-worker-assigment',
  templateUrl: './worker-assigment.component.html',
  styleUrls: ['./worker-assigment.component.css']
})
export class WorkerAssigmentComponent implements OnInit {

  constructor(
    private service: AuthService,
    private dialog: MatDialog,
    private route: ActivatedRoute
  ) {
    this.LoadAssigment();
  }

  assignmentlist: any;
  dataSource: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  LoadAssigment() {
    const workerId = Number(this.route.snapshot.queryParamMap.get('id'));
    this.service.getAssigment(workerId).subscribe(res => {
      this.assignmentlist = res.data.map((assignment: any) => {
        return {
          ...assignment,
          farm_name: assignment.farm.attributes.name // Add the farm name to each assignment object
        };
      });
      console.log(this.assignmentlist);
      this.dataSource = new MatTableDataSource(this.assignmentlist);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  
  
  // LoadAssigment() {
  //   const workerId = Number(this.route.snapshot.queryParamMap.get('id'));
  //   this.service.getAssigment(workerId).subscribe(res => {
  //     this.assignmentlist = res.data;
  //     console.log(this.assignmentlist);
  //     this.dataSource = new MatTableDataSource(this.assignmentlist);
  //     this.dataSource.paginator = this.paginator;
  //     this.dataSource.sort = this.sort;
  //   });
  // }

  ngOnInit(): void {
  }

  displayedColumns: string[] = ['task_name', 'farm_name', 'time_assigned', 'time_start', 'time_complished','status', 'action'];


  updateAssigment(element:any){
    const popup = this.dialog.open(UpdateassigmentComponent,{
       enterAnimationDuration:'1000ms',
       exitAnimationDuration:'100ms',
       width:'50%',
       data:element
     })
     popup.afterClosed().subscribe(res=>{
       this.LoadAssigment();
     });
   }

   deleteAssigment(id: number){
    const deletepop = this.service.deleteAssigment(id)
          .subscribe({
            next:(res)=>{
             alertifyjs.success('Deleted successful');
            },
            error:()=>{
              alertifyjs.error('Failed. Please Try Again');
            }
          })
      if(deletepop){
        this.LoadAssigment();
      }
    }
}
