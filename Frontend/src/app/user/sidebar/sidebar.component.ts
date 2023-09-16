import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements DoCheck {

  isuser=false;
  isadminuser=false;

  imageUrl = 'assets/Untitled-11.jpg';
sidebar: any;
  // imageUrl = 'assets/FAAAAM.jpg';

  constructor(private router: Router, private service: AuthService) { }

  ngDoCheck(): void{
    if(this.service.GetUserrole() === '0'){
      this.isuser = true;
    }else{
      this.isadminuser = true;
  
    }
  }
  

}
