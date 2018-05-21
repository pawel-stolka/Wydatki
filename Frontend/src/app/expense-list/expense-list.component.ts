import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../expense.service';
import { Bill } from '../models/Bill';

@Component({
  selector: 'expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.css']
})
export class ExpenseListComponent implements OnInit {
  bills: Bill[]
  param
  _byDate = 1

  constructor(private expenseService: ExpenseService) { }

  ngOnInit() {
    // this.bills = 
    this.param = 1
    this.getBy()//this.param)
  }

  compareDate(a,b) {
    const dateA = a.fulldate,
          dateB = b.fulldate
    let comparison = 1
    if(dateA < dateB)
      comparison = -1

    // console.log(comparison, dateA, dateB)
    return comparison
  }

  compareName(a,b) {
    const dataA = a.name,
          dataB = b.name
    let comparison = 1
    if(dataA < dataB)
    comparison = -1

    // console.log(comparison, dataA, dataB)
    return comparison
  }

  comparePrice(a,b) {
    const dataA = parseFloat(a.price),
          dataB = parseFloat(b.price)
    let comparison = 1
    if(dataA < dataB)
    comparison = -1

    // console.log(comparison, dataA, dataB)
    return comparison
  }

  getBy() {
    this.expenseService.getBills()
    .subscribe((data: any) => {
      // let ordered = data.map(data => data)
      // console.log(data.json())
      let _data = data.json()
      let _mapped = _data.map(x => ({
        name: x.name,
        date: x.date.substr(0,10),
        fulldate: new Date(x.date),
        price: x.price,
        extra: x.extra          
      }))
      console.log(_mapped)
      this.bills = _mapped // data.json()
    })
  }

  byDate(){
    console.log('byDate')
    // this.getBy()
    this.bills.sort(this.compareDate)
    // console.log(this.)
  }

  byName() {
    console.log('byName')
    this.bills.sort(this.compareName)
  }

  byPrice() {
    console.log('byPrice')
    this.bills.sort(this.comparePrice)
  }

  byExtra() {
    console.log('byExtra')
  }

}
