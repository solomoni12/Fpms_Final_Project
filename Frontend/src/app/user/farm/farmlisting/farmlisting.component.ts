import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/service/auth.service';
import { UpdatefarmComponent } from '../updatefarm/updatefarm.component';
import { AddfarmComponent } from '../addfarm/addfarm.component';
import * as alertifyjs from 'alertifyjs';
import { jsPDF } from "jspdf";

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

    printPDF() {
      const doc = new jsPDF();
    
      doc.setFontSize(16);
      doc.text('Farm List', 80, 10);
    
      doc.setFontSize(12);
      doc.text('Farm Name', 10, 20);
      doc.text('Farm Location', 50, 20);
      doc.text('Farm Patent', 95, 20);
      doc.text('Farm Size', 150, 20);
      
      doc.setFontSize(10);
    
      let y = 30;
      this.farmlist.forEach((element: any) => {
        doc.text(element.name?.toString() || '', 10, y);
        doc.text(element.location?.toString() || '', 50, y);
        doc.text(element.land_title?.toString() || '', 95, y);
        doc.text(element.size?.toString() || '', 150, y);
    
        y += 10;
      });
    
      doc.save('farmlist.pdf');
    }
}
