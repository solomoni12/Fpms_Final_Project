import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  message = '';
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    // this.http.get('http://localhost:3000/user').subscribe((res:any)=>{
    //   this.message = `Hi ${res.lname}`;
    // },
    // err=>{
    //   this.message = 'You are not logged in';
    // }
    // )
  }

}
