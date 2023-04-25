import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hom',
  templateUrl: './hom.component.html',
  styleUrls: ['./hom.component.css']
})
export class HomComponent implements OnInit {

  constructor() { }
token:any
  ngOnInit(): void {
  }

  logout(){
    localStorage.removeItem('token');
    // this.router.navigate(['loogin']);
  }
}
