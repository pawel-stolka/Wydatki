import { Component, OnInit, Input } from '@angular/core';
import { Bill } from '../models/Bill';

@Component({
  selector: 'e-item',
  templateUrl: './e-item.component.html',
  styleUrls: ['./e-item.component.css']
})
export class EItemComponent implements OnInit {
  @Input()
  bills: any[]
  totalPrice: number
  
  constructor() { }

  ngOnInit() {
    this.totalPrice = 0;
    // console.log(this.bills)
    this.sumPrice()
    // console.log('this.totalPrice', this.totalPrice)
  }

  sumPrice() {
    let total = 0
    this.bills.forEach(item => {
      total += item.price
    });
    this.totalPrice = Math.ceil(total * 100)/100;
    // console.log('T: ', total, _t)
  }

}
