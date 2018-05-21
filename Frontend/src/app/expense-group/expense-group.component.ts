import { Component, OnInit, Input } from '@angular/core';
import { Bill } from '../models/Bill';

@Component({
  selector: 'expense-group',
  templateUrl: './expense-group.component.html',
  styleUrls: ['./expense-group.component.css']
})
export class ExpenseGroupComponent implements OnInit {
  // @Input()
  // bill: Bill

  @Input()
  bills: Bill[]

  date
  time
  counter = 0
  total = 0//: number
  
  constructor() { }

  ngOnInit() {
    // this.date = this.bill.date.toDateString()
    // this.time = this.bill.date.toLocaleTimeString()
    this.sum()
  }

  sum() {
    this.date = this.bills[0].date.toLocaleDateString()
    this.bills.forEach(element => {
      // this.date = element.date.toLocaleDateString()// .toDateString()
      this.counter++
      this.total += Number(element.price)
      console.log(this.counter, this.date)
      // console.log(element.price, this.total)
    });
  }

}
