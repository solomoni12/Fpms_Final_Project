import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/service/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-worker-assigment',
  templateUrl: './worker-assigment.component.html',
  styleUrls: ['./worker-assigment.component.css']
})
export class WorkerAssigmentComponent implements OnInit {

  constructor(
    private service: AuthService,
    private route: ActivatedRoute
  ) {
    this.LoadWorker();
  }

  assignmentlist: any;
  dataSource: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  LoadWorker() {
    const workerId = Number(this.route.snapshot.queryParamMap.get('id'));
    const farmId = Number(this.route.snapshot.queryParamMap.get('farmId'));
    console.log('farmId:', farmId);
    this.service.getAssigment(workerId, farmId).subscribe(res => {
      this.assignmentlist = res.data;
      console.log(this.assignmentlist);
      this.dataSource = new MatTableDataSource(this.assignmentlist);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  ngOnInit(): void {
  }

  displayedColumns: string[] = ['task_name', 'time_assigned', 'time_start', 'time_complished','status', 'action'];

}
