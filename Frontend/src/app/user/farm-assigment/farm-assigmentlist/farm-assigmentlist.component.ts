import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-farm-assigmentlist',
  templateUrl: './farm-assigmentlist.component.html',
  styleUrls: ['./farm-assigmentlist.component.css']
})
export class FarmAssigmentlistComponent implements OnInit {

  constructor(
    private service: AuthService,
    private dialog: MatDialog 
  ) { 
    this.LoadAssigment();
  }

  assigmentlist:any;
  dataSource:any;
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !:MatSort;

  LoadAssigment(){
    this.service.getAssigment().subscribe(res=>{
      this.assigmentlist = res.data;
      console.log(this.assigmentlist);
      this.dataSource = new MatTableDataSource(this.assigmentlist);
      // console.log(this.dataSource);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  ngOnInit(): void {
  }
  displayedColumns: string[] = [ 'task_name','time_assigned', 'time_start','time_complished','status','action'];
  AddAssigment(){}
  updateAssigment(){}
  deleteAssigment(){}
}
