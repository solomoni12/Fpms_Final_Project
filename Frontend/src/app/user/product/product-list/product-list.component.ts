import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import * as alertifyjs from 'alertifyjs';
import { AuthService } from 'src/app/service/auth.service';
import { AddProductComponent } from '../add-product/add-product.component';
import { UpdateProductComponent } from '../update-product/update-product.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

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
  productlist:any
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  LoadWorker() {
    const farmId = Number(this.route.snapshot.queryParamMap.get('id'));
    this.service.getProduct(farmId).subscribe(res => {
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

  displayedColumns: string[] = ['product_name', 'harvest_date', 'quantity','status', 'action'];

  AddReferee(){
    const addpop = this.dialog.open(AddProductComponent,{
      enterAnimationDuration:'1000ms',
       exitAnimationDuration:'100ms',
       width:'50%',
    })
    addpop.afterClosed().subscribe(res=>{
      this.LoadWorker();
    });
  }
  
  updatereferee(element:any){
    const popup = this.dialog.open(UpdateProductComponent,{
      enterAnimationDuration:'1000ms',
      exitAnimationDuration:'100ms',
      width:'50%',
      data:element
    })
    popup.afterClosed().subscribe(res=>{
      this.LoadWorker();
    });
  }
 
  deleterepropduct(id: number){
    const deletepop = this.service.deleteProduct(id)
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
