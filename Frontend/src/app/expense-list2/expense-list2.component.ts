import { Component, OnInit } from '@angular/core';
import { Bill } from '../models/Bill';

@Component({
  selector: 'expense-list2',
  templateUrl: './expense-list2.component.html',
  styleUrls: ['./expense-list2.component.css']
})
export class ExpenseList2Component implements OnInit {
  bill: Bill
  bills: Bill[] = []
  days: any[] = []

  constructor() { }

  ngOnInit() {
    this.createBill('test1', 123)
    this.createBills()
    this.createGroups()
  }

  createGroups() {
    let now = new Date,
        tomorrow = new Date,
        justDay = new Date,
        bills1 = [],
        bills2 = [],
        bills3 = []
    tomorrow.setDate(now.getDate() + 1)
    justDay.setDate(now.getDate() + 3)

    // day1
    bills1.push(new Bill('test123', 12.5, now))
    bills1.push(new Bill('test456', 15.5, now))
    // day2
    bills2.push(new Bill('test123', 2.5, tomorrow))
    bills2.push(new Bill('test456', 5.5, tomorrow))
    // day3
    bills3.push(new Bill('', 100, justDay))
    bills3.push(new Bill('', 101, justDay))
    bills3.push(new Bill('', 104, justDay))

    this.days.push(bills1)
    this.days.push(bills2)
    this.days.push(bills3)
  }

  createBill(name: String, price: Number) {
    this.bill = new Bill(name, price, new Date)
  }

  createBills() {
    this.bills.push(new Bill('test2', 4.5, new Date))
    this.bills.push(new Bill('test3', 7.9, new Date))
    this.bills.push(new Bill('test4', 8.2, new Date))
    this.bills.push(new Bill('test5', 1.2, new Date))
  }

}
