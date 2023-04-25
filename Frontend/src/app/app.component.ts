import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck{
  title = 'Frontend';

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
      // this.router.navigate(['/dashboard']);

    }
  }

  logout(){
    localStorage.removeItem('token');
    // this.router.navigate(['loogin']);
  }
}
