import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from '../service/auth.service';
import { UpdatepopupComponent } from '../updatepopup/updatepopup.component';

@Component({
  selector: 'app-userlisting',
  templateUrl: './userlisting.component.html',
  styleUrls: ['./userlisting.component.css']
})
export class UserlistingComponent implements OnInit {

  constructor(private service: AuthService, private dialog: MatDialog) { 
    this.Loaduser();
  }

  userlist:any;
  dataSource:any;
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !:MatSort;

  Loaduser(){
    this.service.getUser().subscribe(res=>{
      this.userlist = res.data.user;
      console.log(this.userlist);
      this.dataSource = new MatTableDataSource(this.userlist);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  ngOnInit(): void {
  }

  displayedColumns: string[] = ['fname', 'lname', 'phone_number', 'physical_address', 'email', 'status', 'action'];

  UpdateUser(element:any){
   const popup = this.dialog.open(UpdatepopupComponent,{
      enterAnimationDuration:'1000ms',
      exitAnimationDuration:'100ms',
      width:'30%',
      data:{
        usercode:element
      }
    })
    popup.afterClosed().subscribe(res=>{
      this.Loaduser();
    });
  }

  opendialog(){
    
  }
}
