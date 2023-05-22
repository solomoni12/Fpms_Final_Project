import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/service/auth.service';
import { AddEquipmentComponent } from '../add-equipment/add-equipment.component';
import { UpdateEquipmentComponent } from '../update-equipment/update-equipment.component';
import * as alertifyjs from 'alertifyjs';

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

  LoadInput() {
    this.service.getInput().subscribe(res => {
      this.equipmentlist = res.data.inputs.flatMap((input: any) =>
        input.equipments.map((equipment: any) => ({
          name: input.name,
          quantity: equipment.quantity
        }))
      );
  
      this.dataSource = new MatTableDataSource(this.equipmentlist);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  
  ngOnInit(): void {
  }

  displayedColumns: string[] = ['name', 'quantity', 'action'];


  Addequipment(){
    const addpop = this.dialog.open(AddEquipmentComponent,{
      enterAnimationDuration:'1000ms',
       exitAnimationDuration:'100ms',
       width:'50%',
    })
    addpop.afterClosed().subscribe(res=>{
      this.LoadInput();
    });
  }
  
  UpdateEquipment(element:any){
    const popup = this.dialog.open(UpdateEquipmentComponent,{
      enterAnimationDuration:'1000ms',
      exitAnimationDuration:'100ms',
      width:'50%',
      data:element
    })
    popup.afterClosed().subscribe(res=>{
      this.LoadInput();
    });
  }

  deleteEquipment(id: number){
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
        this.LoadInput();
      }
    }
}
