import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import * as alertifyjs from 'alertifyjs';
import { AuthService } from 'src/app/service/auth.service';
import { AddProductComponent } from './add-product/add-product.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

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


  viewProducts(farmId: number) {
    this.service.getCrop(farmId).subscribe(res => {
      this.croplist = res.data;
      console.log(this.croplist);
      this.router.navigate(['/product-list'], { queryParams: { id: farmId } });
    });
  }
  assignTaskWorker(element:any){
    const assignWorker = this.dialog.open(AddProductComponent,{
      enterAnimationDuration:'1000ms',
      exitAnimationDuration:'100ms',
      width:'50%',
      data:element
    })
    assignWorker.afterClosed().subscribe(res=>{
      this.Loadfarm();
    });
  }

}
