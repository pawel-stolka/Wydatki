import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../expense.service';
import { Bill } from '../models/Bill';

@Component({
  selector: 'e-list',
  templateUrl: './e-list.component.html',
  styleUrls: ['./e-list.component.css']
})
export class EListComponent implements OnInit {
  bills: Bill[]

  constructor(public expenseService: ExpenseService) { }

  ngOnInit() {
    this.getBy()
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
      this.bills = _mapped.sort(this.compareDate) // data.json()
    })
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

}
