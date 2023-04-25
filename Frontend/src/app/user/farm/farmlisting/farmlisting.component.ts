import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/service/auth.service';
import { UpdatefarmComponent } from '../updatefarm/updatefarm.component';
import { AddfarmComponent } from '../addfarm/addfarm.component';
import * as alertifyjs from 'alertifyjs';

@Component({
  selector: 'app-farmlisting',
  templateUrl: './farmlisting.component.html',
  styleUrls: ['./farmlisting.component.css']
})
export class FarmlistingComponent implements OnInit {

  constructor(private service: AuthService, private dialog: MatDialog) {
    this.Loadfarm();
   }

  farmlist:any;
  email:any;
  dataSource:any;
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !:MatSort;

  Loadfarm(){
    this.service.getFarm().subscribe(res=>{
      this.farmlist = res.data.user;
      console.log(this.farmlist);
      this.dataSource = new MatTableDataSource(this.farmlist);
      // console.log(this.dataSource);
    
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  ngOnInit(): void {
    // this.service.IsloggedIn();
  }

  displayedColumns: string[] = ['name', 'location', 'land_title', 'size', 'action'];


  Updatefarm(element:any){
    const popup = this.dialog.open(UpdatefarmComponent,{
       enterAnimationDuration:'1000ms',
       exitAnimationDuration:'100ms',
       width:'50%',
       data:element
     })
     popup.afterClosed().subscribe(res=>{
       this.Loadfarm();
     });
   }
   Addfarm(){
    const addpop = this.dialog.open(AddfarmComponent,{
      enterAnimationDuration:'1000ms',
       exitAnimationDuration:'100ms',
       width:'50%',
    })
    addpop.afterClosed().subscribe(res=>{
      this.Loadfarm();
    });
   }
   deleteFarm(id: number){
    const deletepop = this.service.deleteFarm(id)
          .subscribe({
            next:(res)=>{
              alertifyjs.success('farm deleted')
            },
            error:()=>{
              alertifyjs.error('Failed. Please Try Again');
            }
          })
      if(deletepop){
        this.Loadfarm();
      }
    }
}
