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
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Farm } from '../model/farm/farm.module';
import { Assignment } from '../model/assigment/assigment.module';
import { Referee } from '../model/referee/referee.module';

export class User {
  fname!: String;
  lname!: String;
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
  private headers: HttpHeaders;
  constructor(private http: HttpClient) {
     const token = sessionStorage.getItem('token');
     console.log(token);
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  apiurl = 'http://127.0.0.1:8000/api/farms';
  api = 'http://127.0.0.1:8000/api/workers';
  urlapi = 'http://127.0.0.1:8000/api';
  referee = 'http://127.0.0.1:8000/api/referees'

  updateuser(code:any, inputdata:any){
    return this.http.put(this.apiurl+'/'+code, inputdata);
  }

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
    return this.http.get(this.apiurl);
  }

  //farm Api Start
  getFarm(): Observable<any>{
    return this.http.get<any>('http://127.0.0.1:8000/api/farms', { headers: this.headers });
  }

  updatFarm(data:any, id: number){
    return this.http.put(this.apiurl+'/'+id, data, { headers: this.headers });
  }

  deleteFarm(id:any){
    return this.http.delete(this.apiurl+'/'+id, { headers: this.headers });
  }

   
   registerFarm(farm:Farm): Observable<any> {
    return this.http.post('http://127.0.0.1:8000/api/farms', farm, { headers: this.headers });
  }
  // farm Api End

  // Worker Api Start
  getWorker(): Observable<any>{
    return this.http.get<any>('http://127.0.0.1:8000/api/workers', { headers: this.headers });
  }

  registerWorker(worker:Worker): Observable<any> {
    return this.http.post('http://127.0.0.1:8000/api/workers', worker);
  }
  updatWorker(data:any, id: number){
    return this.http.put(this.api+'/'+id, data, { headers: this.headers });
  }

  deleteworker(id:any){
    return this.http.delete(this.api+'/'+id, { headers: this.headers });
  }
  // Worker Api end

  getAssigment(workerId: number, farmId: number): Observable<any> {
    return this.http.get<any>(`http://127.0.0.1:8000/api/assignments/${workerId}/${farmId}`, { headers: this.headers });
  }
  
  

  assignTaskToWorker(assign:Assignment, workerId:number, farmId:number){
    const url = `${this.urlapi}/workers/${workerId}/farms/${farmId}/assignments`;
    return this.http.post(url, assign, { headers: this.headers } )
  }

  // Assignment Api End

  //referee start
  getReferee(workerId:number): Observable<any>{
    return this.http.get<any>(`http://127.0.0.1:8000/api/workers/${workerId}/workerreferees`, { headers: this.headers });
  }
  registerReferee(referee:Referee, workerId:number): Observable<any> {
    return this.http.post(`http://127.0.0.1:8000/api/workers/${workerId}/referees`, referee);
  }
  updateReferee(data:any, id: number){
    return this.http.put(this.referee+'/'+id, data, { headers: this.headers });
  }
  deleteworkerReferee(id:any){
    
    return this.http.delete(this.referee+'/'+id, { headers: this.headers });
  }
  // http://127.0.0.1:8000/api/workers/referees/4
  // http://127.0.0.1:8000/api/workers/referees/3
}
