import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { AddRefereeComponent } from '../add-referee/add-referee.component';
import { MatDialog } from '@angular/material/dialog';
import { UpdateRefereeComponent } from '../update-referee/update-referee.component';
import * as alertifyjs from 'alertifyjs';

@Component({
  selector: 'app-referees',
  templateUrl: './referees.component.html',
  styleUrls: ['./referees.component.css']
})
export class RefereesComponent implements OnInit {

  constructor(
    private service: AuthService,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
  ){
    this.LoadWorker();
   }

  refereelist: any;
  dataSource: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  LoadWorker() {
    const workerId = Number(this.route.snapshot.queryParamMap.get('id'));
    this.service.getReferee(workerId).subscribe(res => {
      this.refereelist = res.data;
      console.log(workerId);
      console.log(this.refereelist);
      this.dataSource = new MatTableDataSource(this.refereelist);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  ngOnInit(): void {
  }

  displayedColumns: string[] = ['fname', 'lname', 'phone_number','physical_address', 'action'];

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
  
  updatereferee(element:any){
    const popup = this.dialog.open(UpdateRefereeComponent,{
      enterAnimationDuration:'1000ms',
      exitAnimationDuration:'100ms',
      width:'50%',
      data:element
    })
    popup.afterClosed().subscribe(res=>{
      this.LoadWorker();
    });
  }
  // deletereferee(element:any){}
  deletereferee(id: number){
    const deletepop = this.service.deleteworkerReferee(id)
          .subscribe({
            next:(res)=>{
              alertifyjs.success('Worker referee deleted')
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
