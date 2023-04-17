/*import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  apiurl = 'http://127.0.0.1:8000/api/';

  GetAll(){
    return this.http.get(this.apiurl);
  }

  GetAllRole(){
    return this.http.get('http://127.0.0.1:8000/api/');
  }

  GetbyCode(email:any){
    return this.http.post(this.apiurl,'login');
  }

  proceedregister(inputdata:any){
    return this.http.post(this.apiurl, inputdata);
  }

  updateuser(code:any, inputdata:any){
    return this.http.put(this.apiurl+'/'+code, inputdata);
  }

  IsloggedIn(){
    return sessionStorage.getItem('username') != null;
    // return !!localStorage.getItem('token');
  }

  GetUserrole(){
    return sessionStorage.getItem('userrole') != null?sessionStorage.getItem('userrole')?.toString():'';
  }
}*/

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
// User interface
export class User {
  fname!: String;
  lname!: String;
  username!: String;
  sex!: String;
  phone_number!: String;
  physical_address!: String;
  email!: String;
  isactive!: Boolean;
  role!: Boolean;
  password!: String;
  password_confirmation!: String;
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private http: HttpClient) {}

  
  IsloggedIn() {
    return sessionStorage.getItem('email') != null;
    // return localStorage.getItem('token');
  }
  GetUserrole(){
    return sessionStorage.getItem('userrole') != null?sessionStorage.getItem('userrole'):'';
  }
 
  // User registration
  register(user: User): Observable<any> {
    return this.http.post('http://127.0.0.1:8000/api/register', user);
  }
  // Login
  signin(user: User): Observable<any> {
    return this.http.post<any>('http://127.0.0.1:8000/api/login', user);
  }
  getUser(): Observable<any>{
    return this.http.get<any>('http://127.0.0.1:8000/api/user');
  }
  // Access user profile
  profileUser(): Observable<any> {
    return this.http.get('http://127.0.0.1:8000/api/auth/user-profile');
  }
  updateuser(){}
}
