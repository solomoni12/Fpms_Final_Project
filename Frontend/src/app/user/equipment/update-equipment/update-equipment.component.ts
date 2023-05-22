import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/service/auth.service';
import * as alertifyjs from 'alertifyjs';

@Component({
  selector: 'app-update-equipment',
  templateUrl: './update-equipment.component.html',
  styleUrls: ['./update-equipment.component.css']
})
export class UpdateEquipmentComponent implements OnInit {

  updateForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private service: AuthService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<UpdateEquipmentComponent>
  ) {}

  ngOnInit(): void {
    this.updateForm = this.formBuilder.group({
      name: ['', Validators.required],
      quantity: ['', Validators.required],
    });

    if (this.editData) {
      this.updateForm.patchValue({
        name: this.editData.name,
        quantity: this.editData.quantity
      });
    }
  }

  Updateinput() {
    if (this.updateForm.valid) {
      const updatedData = {
        name: this.updateForm.value.name,
        quantity: this.updateForm.value.quantity
      };

      this.service.UpdateInput(updatedData, this.editData.id)
        .subscribe({
          next: (res) => {
            alertifyjs.success('Equipment detail updated successfully');
            console.log(res);
            this.updateForm.reset();
            this.dialogRef.close('update');
          },
          error: (error) => {
            alertifyjs.error('Failed to update equipment details. Please try again.');
            console.log(error);
          }
        });
    } else {
      alertifyjs.error('Invalid form data. Please fill in all the required fields.');
    }
  }

}

