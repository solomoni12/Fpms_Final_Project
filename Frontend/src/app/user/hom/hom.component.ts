import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import * as alertifyjs from 'alertifyjs';

@Component({
  selector: 'app-hom',
  templateUrl: './hom.component.html',
  styleUrls: ['./hom.component.css']
})
export class HomComponent implements OnInit {
  

  constructor( private router: Router, private service:AuthService) { }

  useremail:any;
  userfirstname:any;
  userlastname:any;

  ngOnInit(): void {
    this.useremail = this.service.GetUserEmail();
    this.userfirstname = this.service.GetUserFirstName();
    this.userlastname = this.service.GetUsrLastName();
  }

  logout(){
    this.service.logout().subscribe({
      next:(res)=>{
        // localStorage.removeItem('token');
        this.router.navigate(['/login']);
      },
      error:()=>{
        alertifyjs.error('Failed to logout. Please try again');
      }
    })
  }

}
