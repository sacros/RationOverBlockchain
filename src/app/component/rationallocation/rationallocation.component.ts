import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rationallocation',
  templateUrl: './rationallocation.component.html',
  styleUrls: ['./rationallocation.component.css']
})
export class RationallocationComponent implements OnInit {
  rationIDNumber="1234567890";
  rationValArr =["1","2","3"];
  constructor() { }

  ngOnInit() {
    
  }

}
