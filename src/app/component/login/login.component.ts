import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }
  dependent = {'addharNo':''};
  dependentAadhars = [];
  noOfDependents:number;
  count : number =0;
  url: string;
  ngOnInit() {
  }

  addDependents(){
    this.count++;
    this.dependentAadhars.push(this.dependent);
    // document.getElementById("tab").append(row);
    //         $("#tab").append(row);
  }

  registerAdmin(){
    alert("called");
    // this.registerData
    this.url = "";
  }

}
