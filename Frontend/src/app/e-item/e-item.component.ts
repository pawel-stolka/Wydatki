import { Component, OnInit } from '@angular/core';
import { Bill } from '../models/Bill';

@Component({
  selector: 'e-item',
  templateUrl: './e-item.component.html',
  styleUrls: ['./e-item.component.css']
})
export class EItemComponent implements OnInit {
  groupBills: Bill[]
  
  constructor() { }

  ngOnInit() {
  }

}
