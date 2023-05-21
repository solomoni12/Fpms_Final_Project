import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-hom',
  templateUrl: './hom.component.html',
  styleUrls: ['./hom.component.css']
})
export class HomComponent implements OnInit {
  

  constructor( private router: Router, private service:AuthService) { }

  token:any
  useremail:any;
  userfirstname:any;
  userlastname:any;

  ngOnInit(): void {
    this.useremail = this.service.GetUserEmail();
    this.userfirstname = this.service.GetUserFirstName();
    this.userlastname = this.service.GetUsrLastName();
    
   console.log(this.useremail);
  }
  setting(){}
  logout(){
    localStorage.removeItem('token');
    // this.router.navigate(['loogin']);
  }
  
  handleSelection(option: string) {
    if (option === 'profile') {
      this.router.navigate(['/dashboard']);
      // Redirect to the user profile page
      // Replace `user-profile` with the actual route for the user profile page
      this.router.navigate(['user-profile']);
    } else if (option === 'settings') {
      // Redirect to the settings page
      // Replace `settings` with the actual route for the settings page
      this.router.navigate(['settings']);
    } else if (option === 'logout') {
      // Perform logout logic here
      // Example: call a logout service or clear the user session
    }
  }
  
}
