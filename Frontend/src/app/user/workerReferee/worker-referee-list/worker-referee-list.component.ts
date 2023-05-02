import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { AddRefereeComponent } from '../add-referee/add-referee.component';

@Component({
  selector: 'app-worker-referee-list',
  templateUrl: './worker-referee-list.component.html',
  styleUrls: ['./worker-referee-list.component.css']
})
export class WorkerRefereeListComponent implements OnInit {

  constructor(
    private service: AuthService,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
  ){
    this.LoadWorker();
   }

  workerlist:any;
  farmlist:any;
  dataSource:any;
  assignmentlist:any;
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !:MatSort;

  LoadWorker(){
    this.service.getWorker().subscribe(res=>{
      this.workerlist = res.data;
      console.log(this.workerlist);
      this.dataSource = new MatTableDataSource(this.workerlist);
      console.log(this.dataSource);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }
  
  ngOnInit(): void {
  }

  displayedColumns: string[] = ['fname', 'lname', 'sex', 'phone_number', 'physical_address', 'action'];

  viewWorkerReferee(workerId: number) {
    this.service.getReferee(workerId).subscribe(res => {
      this.assignmentlist = res.data;
      console.log(this.assignmentlist);
      this.router.navigate(['/referee'], { queryParams: { id: workerId} });
    });
  }

  AddReferee(){
    const addpop = this.dialog.open(AddRefereeComponent,{
      enterAnimationDuration:'1000ms',
       exitAnimationDuration:'100ms',
       width:'50%',
    })
    addpop.afterClosed().subscribe(res=>{
      this.LoadWorker();
    });
  }
}
