import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { AddCropComponent } from '../add-crop/add-crop.component';
import { UpdateCropComponent } from '../update-crop/update-crop.component';
import * as alertifyjs from 'alertifyjs';

@Component({
  selector: 'app-crop-list',
  templateUrl: './crop-list.component.html',
  styleUrls: ['./crop-list.component.css']
})
export class CropListComponent implements OnInit {

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
    const farmId = Number(this.route.snapshot.queryParamMap.get('id'));
    this.service.getCrop(farmId).subscribe(res => {
      this.refereelist = res.data;
      console.log(farmId);
      console.log(this.refereelist);
      this.dataSource = new MatTableDataSource(this.refereelist);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  ngOnInit(): void {
  }

  displayedColumns: string[] = ['crop_name', 'planting_date', 'harvest_date','expected_product', 'action'];

  viewCrops(workerId: number) {
    // this.service.getAssigment(workerId).subscribe(res => {
    //   this.assignmentlist = res.data;
    //   console.log(this.assignmentlist);
    //   this.router.navigate(['/worker-assigment'], { queryParams: { id: workerId } });
    // });
  }
  AddReferee(){
    const addpop = this.dialog.open(AddCropComponent,{
      enterAnimationDuration:'1000ms',
       exitAnimationDuration:'100ms',
       width:'50%',
    })
    addpop.afterClosed().subscribe(res=>{
      this.LoadWorker();
    });
  }
  
  updatereferee(element:any){
    const popup = this.dialog.open(UpdateCropComponent,{
      enterAnimationDuration:'1000ms',
      exitAnimationDuration:'100ms',
      width:'50%',
      data:element
    })
    popup.afterClosed().subscribe(res=>{
      this.LoadWorker();
    });
  }
  
  deleterecrop(id: number){
    const deletepop = this.service.deleteCrop(id)
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
