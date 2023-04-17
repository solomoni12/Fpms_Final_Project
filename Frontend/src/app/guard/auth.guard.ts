import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private service: AuthService, private router: Router){}

  token:any;

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.service.IsloggedIn()){

        // get logged user token
        this.token = localStorage.getItem('token'); 
        if(this.token){
            return true;
        }else{
            this.router.navigate(['login']);
        }

        if(route.url.length > 0){

          let menu = route.url[0].path;
          
          if(menu == 'user'){
            if(this.service.GetUserrole() == '1'){ 
              return true;
            }
            else{
              // message you dont have access
              this.router.navigate(['']);
              return false;
            }
          }else{
            return true;
          }
        }else{
          return true;
        }
      }
      else{
        this.router.navigate(['login']);
        return false;
      }
    
  }
  
}
