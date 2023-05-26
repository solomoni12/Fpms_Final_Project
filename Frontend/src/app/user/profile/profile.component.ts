import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import * as alertifyjs from 'alertifyjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: any;
  constructor(
    private formBuilder: FormBuilder,
    private service: AuthService,
    private router: Router
  ) {}

  
  updateForm = this.formBuilder.group({
    fname: ['', Validators.required],
    lname: ['', Validators.required],
    physical_address: ['', Validators.required],
    sex: ['', Validators.required],
    phone_number: ['', Validators.required],
    email: [{ value: '', disabled: true }]
  });


  ngOnInit(): void {
    this.fetchUserProfile();
  }

  fetchUserProfile() {
    this.service.loggedUser().subscribe(
      (response) => {
        if (response.status === 1 && response.data && response.data.user) {
          this.user = response.data.user;
          this.populateForm();
        } else {
          alertifyjs.error('Failed to fetch user profile. Please try again.');
        }
      },
      (error) => {
        console.log(error);
        alertifyjs.error('Failed to fetch user profile. Please try again.');
      }
    );
  }

  populateForm() {
    this.updateForm.patchValue({
      fname: this.user.fname,
      lname: this.user.lname,
      physical_address: this.user.physical_address,
      sex: this.user.sex,
      phone_number: this.user.phone_number,
      email: this.user.email
    });
  }

  updateProfile() {
    if (this.updateForm.valid) {
      const updatedData = {
        fname: this.updateForm.value.fname,
        lname: this.updateForm.value.lname,
        physical_address: this.updateForm.value.physical_address,
        sex: this.updateForm.value.sex,
        phone_number: this.updateForm.value.phone_number
      };

      this.service.UpdateUser(updatedData, this.user.id).subscribe(
        (response) => {
          console.log(response);
          this.updateForm.reset();
          this.router.navigate(['/']); // Navigate to home page
          alertifyjs.success('User profile updated successfully!');
        },
        (error) => {
          console.log(error);
          alertifyjs.error('Failed to update user profile. Please try again.');
        }
      );
    } else {
      alertifyjs.error('Invalid form data. Please fill all the required fields.');
    }
  }
}
