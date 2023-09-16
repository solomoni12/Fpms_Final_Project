import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import * as alertifyjs from 'alertifyjs';

@Component({
  selector: 'app-hom',
  templateUrl: './hom.component.html',
  styleUrls: ['./hom.component.css']
})
export class HomComponent implements OnInit, DoCheck {
  

  constructor( private router: Router, private service:AuthService) { }
  ngDoCheck(): void{
    if(this.service.GetUserrole() === '0'){
      this.isuser = true;
    }else{
      this.isadminuser = true;
  
    }
  }
  useremail:any;
  userfirstname:any;
  userlastname:any;

  ngOnInit(): void {
    this.useremail = this.service.GetUserEmail();
    this.userfirstname = this.service.GetUserFirstName();
    this.userlastname = this.service.GetUsrLastName();
  }
  isuser=false;
  isadminuser=false;

  imageUrl = 'assets/Untitled-11.jpg';
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
