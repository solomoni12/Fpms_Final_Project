import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/service/auth.service';
import * as alertifyjs from 'alertifyjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-farm-assigmentlist',
  templateUrl: './farm-assigmentlist.component.html',
  styleUrls: ['./farm-assigmentlist.component.css']
})
export class FarmAssigmentlistComponent implements OnInit {

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

  viewAssigment(workerId: number) {
    this.service.getAssigment(workerId).subscribe(res => {
      this.assignmentlist = res.data;
      console.log(this.assignmentlist);
      this.router.navigate(['/worker-assigment'], { queryParams: { id: workerId } });
    });
  }

}
