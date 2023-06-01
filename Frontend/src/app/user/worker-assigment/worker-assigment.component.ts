import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/service/auth.service';
import { ActivatedRoute } from '@angular/router';
import { UpdateassigmentComponent } from './updateassigment/updateassigment.component';
import { MatDialog } from '@angular/material/dialog';
import * as alertifyjs from 'alertifyjs';
import { jsPDF } from "jspdf";

@Component({
  selector: 'app-worker-assigment',
  templateUrl: './worker-assigment.component.html',
  styleUrls: ['./worker-assigment.component.css']
})
export class WorkerAssigmentComponent implements OnInit {
  constructor(
    private service: AuthService,
    private dialog: MatDialog,
    private route: ActivatedRoute
  ) {
    this.LoadAssigment();
  }

  assignmentlist: any;
  dataSource: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('table') table!: ElementRef;
  @ViewChild(MatSort) sort!: MatSort;

  LoadAssigment() {
    const workerId = Number(this.route.snapshot.queryParamMap.get('id'));
    this.service.getAssigment(workerId).subscribe(res => {
      this.assignmentlist = res.data.map((assignment: any) => {
        return {
          ...assignment,
          farm_name: assignment.farm.attributes.name // Add the farm name to each assignment object
        };
      });
      console.log(this.assignmentlist);
      this.dataSource = new MatTableDataSource(this.assignmentlist);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

 

  ngOnInit(): void {}

  displayedColumns: string[] = [
    'task_name',
    'farm_name',
    'time_assigned',
    'time_start',
    'time_complished',
    'status',
    'action'
  ];

  updateAssigment(element: any) {
    const popup = this.dialog.open(UpdateassigmentComponent, {
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '100ms',
      width: '50%',
      data: element
    });
    popup.afterClosed().subscribe(res => {
      this.LoadAssigment();
    });
  }

  deleteAssigment(id: number) {
    const deletepop = this.service.deleteAssigment(id).subscribe({
      next: res => {
        alertifyjs.success('Deleted successful');
      },
      error: () => {
        alertifyjs.error('Failed. Please Try Again');
      }
    });
    if (deletepop) {
      this.LoadAssigment();
    }
  }
  
  printPDF() {
    const doc = new jsPDF();
  
    // Set the font size and text for the title
    doc.setFontSize(16);
    doc.text('Assignment List', 80, 10);
  
    // Set the font size and text for the table heading
    doc.setFontSize(12);
    doc.text('Task Name', 10, 20);
    doc.text('Farm Name', 35, 20);
    doc.text('Status', 75, 20);
    doc.text('Time Assigned', 100, 20);
    doc.text('Time Start', 140, 20);
    doc.text('Time Completed', 175, 20);

    // Set the font size for the table rows
    doc.setFontSize(10);
  
    // Iterate over the table data and draw each row
    let y = 30; // Initial y position for the table rows
    this.assignmentlist.forEach((element: any) => {
      doc.text(element.task_name?.toString() || '', 10, y);
      doc.text(element.farm_name?.toString() || '', 35, y);
      doc.text(element.status?.toString() || '', 75, y);
      doc.text(element.time_assigned?.toString() || '', 100, y);
      doc.text(element.time_start?.toString() || '', 140, y);
      doc.text(element.time_complished?.toString() || '', 175, y);
  
      y += 10; // Increment y position for the next row
    });
  
    doc.save('assigmentList.pdf');
  }
  
  
}
