import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import * as alertifyjs from 'alertifyjs';

@Component({
  selector: 'app-farm-crop-list',
  templateUrl: './farm-crop-list.component.html',
  styleUrls: ['./farm-crop-list.component.css']
})
export class FarmCropListComponent implements OnInit {

  constructor(private service: AuthService, private router: Router, private dialog: MatDialog) {
    this.Loadfarm();
   }

  farmlist:any;
  dataSource:any;
  croplist:any;
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


  viewCrops(farmId: number) {
    this.service.getCrop(farmId).subscribe(res => {
      this.croplist = res.data;
      console.log(this.croplist);
      this.router.navigate(['/crop-list'], { queryParams: { id: farmId } });
    });
  }
  assignTaskWorker(farmId:number){
    // const assignWorker = this.dialog.open(AssignTaskWorkerComponent,{
    //   enterAnimationDuration:'1000ms',
    //   exitAnimationDuration:'100ms',
    //   width:'50%',
    //   data:element
    // })
    // assignWorker.afterClosed().subscribe(res=>{
    //   this.LoadWorker();
    // });
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
