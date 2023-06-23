import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Farm } from '../model/farm/farm.module';
import { Assignment } from '../model/assigment/assigment.module';
import { Referee } from '../model/referee/referee.module';
import { Crop } from '../model/crop/crop.module';
import { Product } from '../model/product/product.module';
import { Equipment } from '../model/equipment/equipment.module';
import { ChangePassword } from '../model/change-password/change-password.module';
import { ForgotPassword } from '../model/forgot-password/forgot-password.module';
import { ResetPassword } from '../model/reset-password/reset-password.module';


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

  /*
    http://127.0.0.1:8000/api
    https://fpmsapi.solo.co.tz/api

  */
  urlapi = 'http://127.0.0.1:8000/api';
  
  updateuser(code:any, inputdata:any){
    return this.http.put(`${this.urlapi}/farms/${code}`, inputdata);
  }

  IsloggedIn() {
    return sessionStorage.getItem('email') != null;
  }
  GetUserrole(){
    return sessionStorage.getItem('userrole') != null?sessionStorage.getItem('userrole'):'';
  }
  GetUserEmail(){
    return sessionStorage.getItem('email') != null?sessionStorage.getItem('email'):'';
  }
  GetUserFirstName(){
    return sessionStorage.getItem('firstname') != null?sessionStorage.getItem('firstname'):'';
  }
  GetUsrLastName(){
    return sessionStorage.getItem('lastname') != null?sessionStorage.getItem('lastname'):'';
  }
  GetUserSex(){
    return sessionStorage.getItem('sex') != null?sessionStorage.getItem('sex'):'';
  }
  GetUserPhone(){
    return sessionStorage.getItem('phone_number') != null?sessionStorage.getItem('phone_number'):'';
  }
  GetUsrAddress(){
    return sessionStorage.getItem('physical_address') != null?sessionStorage.getItem('physical_address'):'';
  }
 
  // User registration 
  register(user: User): Observable<any> {
    return this.http.post(`${this.urlapi}/register`, user);
  }
  signin(user: User): Observable<any> {
    return this.http.post<any>(`${this.urlapi}/login`, user);
  }
  loggedUser(): Observable<any> {
    return this.http.get<any>(`${this.urlapi}/logged`);
  }
  changepassword(changepassword: ChangePassword): Observable<any> {
    return this.http.post<any>(`${this.urlapi}/changepassword`, changepassword, { headers: this.headers });
  }
  forgotPassword(forgotPassword: ForgotPassword): Observable<any> {
    return this.http.post<any>(`${this.urlapi}/password/forgot`, forgotPassword);
  }
  resetPassword(resetPassword: ResetPassword): Observable<any> {
    return this.http.post<any> (`${this.urlapi}/password/reset`, resetPassword);
  }
  getUser(): Observable<any>{
    return this.http.get<any>(`${this.urlapi}/user`);
  }
  UpdateUser(data:any, id: number){
    return this.http.put(`${this.urlapi}/user/${id}`, data, { headers: this.headers });
  }

  logout(): Observable<any>{
    return this.http.post(`${this.urlapi}/logout`,{ headers: this.headers })
  }

  //farm Api Start
  getFarm(): Observable<any>{
    return this.http.get<any>(`${this.urlapi}/farms`, { headers: this.headers });
  }

  updatFarm(data:any, id: number){
    return this.http.put(`${this.urlapi}/farms/${id}`, data, { headers: this.headers });
  }

  deleteFarm(id:any){
    return this.http.delete(`${this.urlapi}/farms/${id}`, { headers: this.headers });
  }

   
   registerFarm(farm:Farm): Observable<any> {
    return this.http.post(`${this.urlapi}/farms`, farm, { headers: this.headers });
  }
  // farm Api End

  // Worker Api Start
  getWorker(): Observable<any>{
    return this.http.get<any>(`${this.urlapi}/workers`, { headers: this.headers });
  }

  registerWorker(worker:Worker): Observable<any> {
    return this.http.post(`${this.urlapi}/workers`, worker);
  }
  updatWorker(data:any, id: number){
    return this.http.put(`${this.urlapi}/workers/${id}`, data, { headers: this.headers });
  }

  deleteworker(id:any){
    return this.http.delete(`${this.urlapi}/workers/${id}`, { headers: this.headers });
  }
  // Worker Api end

  getAssigment(workerId: number): Observable<any> {
    return this.http.get<any>(`${this.urlapi}/workers/${workerId}/assignments`, { headers: this.headers });
  }
  
  updateAssigment(data:any, id: number){
    return this.http.put(`${this.urlapi}/assignments/${id}`, data, { headers: this.headers });
  }
  deleteAssigment(id:any){
    return this.http.delete(`${this.urlapi}/assignments/${id}`, { headers: this.headers });
  }

  assignTaskToWorker(assign:Assignment, workerId:number, farmId:number){
    const url = `${this.urlapi}/workers/${workerId}/farms/${farmId}/assignments`;
    return this.http.post(url, assign, { headers: this.headers } )
  }
  // Assignment Api End   

  //referee start
  getReferee(workerId:number): Observable<any>{
    return this.http.get<any>(`${this.urlapi}/workers/${workerId}/workerreferees`, { headers: this.headers });
  }
  registerReferee(referee:Referee, workerId:number): Observable<any> {
    return this.http.post(`${this.urlapi}/workers/${workerId}/referees`, referee);
  }
  updateReferee(data:any, id: number){
    return this.http.put(`${this.urlapi}/referees/${id}`, data, { headers: this.headers });
  }
  deleteworkerReferee(id:any){
    return this.http.delete(`${this.urlapi}/referees/${id}`, { headers: this.headers });
  }

  // Input Service start
  registerInput(equipment:Equipment): Observable<any> {
    
    return this.http.post(`${this.urlapi}/inputs`, equipment);
  }
  
  getInput(): Observable<any>{
    return this.http.get<any>(`${this.urlapi}/inputs-with-equipment`, { headers: this.headers });
  }
  UpdateInput(data:any, id: number){
    return this.http.put(`${this.urlapi}/inputs-with-equipment/${id}`, data, { headers: this.headers });
  }
  deleteInput(id:any){
    return this.http.delete(`${this.urlapi}/inputs/${id}`, { headers: this.headers });
  }
  getEquipment():Observable<any>{
    return this.http.get<any>('${this.urlapi}/equipments/', {headers: this.headers});
  }

  // Crop API 
  registerCrop(crop:Crop, farmId:number): Observable<any> {
    return this.http.post(`${this.urlapi}/farms/${farmId}/crops`, crop);
  }
  getCrop(farmId:number): Observable<any>{
    return this.http.get<any>(`${this.urlapi}/farms/${farmId}/crops`, { headers: this.headers });
  }
  UpdateCrop(data:any, id: number){
    return this.http.put(`${this.urlapi}/crops/${id}`, data, { headers: this.headers });
  }
  deleteCrop(id:any){
    return this.http.delete(`${this.urlapi}/crops/${id}`, { headers: this.headers });
  }
// end crop api

// start Product Api
  getProduct(farmId:number): Observable<any>{
    return this.http.get<any>(`${this.urlapi}/farms/${farmId}/products`, { headers: this.headers });
  }
  UpdateProduct(data:any, id: number){
    return this.http.put(`${this.urlapi}/products/${id}`, data, { headers: this.headers });
  }
  
  deleteProduct(id:any){
    return this.http.delete(`${this.urlapi}/products/${id}`, { headers: this.headers });
  }
  
  registerProduct(product:Product, farmId:number, cropId:number){
    return this.http.post(`${this.urlapi}/farms/${farmId}/crops/${cropId}/products`, product, { headers: this.headers } )
  }

}
