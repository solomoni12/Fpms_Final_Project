import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-equipmentlist',
  templateUrl: './equipmentlist.component.html',
  styleUrls: ['./equipmentlist.component.css']
})
export class EquipmentlistComponent implements OnInit {

  constructor(private service: AuthService, private dialog: MatDialog) {
    this.LoadInput();
   }


  equipmentlist:any;
  dataSource:any;
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !:MatSort;

  LoadInput(){
    this.service.getInput().subscribe(res=>{
      this.service.getEquipment().subscribe(result=>{
        this.equipmentlist = result.data;
        console.log(this.equipmentlist);
        this.dataSource = new MatTableDataSource(this.equipmentlist);
        // console.log(this.dataSource);
      
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
     
    })
  }
  ngOnInit(): void {
  }

  displayedColumns: string[] = ['name', 'quantity', 'action'];

  Addequipment(){}
  UpdateEquipment(element:any){}
  deleteEquipment(element:any){}
}