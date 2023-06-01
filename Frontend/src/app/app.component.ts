import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './service/auth.service';
import * as alertifyjs from 'alertifyjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck{
  title = 'Fpms-Farm Production Management System';

  ismenurequired = false;
  isadminuser = false;
  token:any;

  constructor(private router: Router, private service: AuthService){}

  ngDoCheck(): void {
    let currenturl=this.router.url;
    if(currenturl == '/login' || currenturl == '/register'){
      this.ismenurequired = false;
    }else{
      this.ismenurequired = true;
    }
    if(this.service.GetUserrole() === '1'){
      this.isadminuser = true;
    }else{
      this.isadminuser = false;

    }
  }

  logout(){
    localStorage.removeItem('token');
  }
}
