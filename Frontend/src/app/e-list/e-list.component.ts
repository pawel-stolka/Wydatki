import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../expense.service';
import { Bill } from '../models/Bill';
import * as moment from 'moment';

@Component({
  selector: 'e-list',
  templateUrl: './e-list.component.html',
  styleUrls: ['./e-list.component.css']
})
export class EListComponent implements OnInit {
  groupBills: Bill[][]

  constructor(public expenseService: ExpenseService) { }

  ngOnInit() {
    this.getBy()
  }

  getBy(by: string = 'byDay') {
    this.expenseService.getBills()
    .subscribe((data: any) => {
      let _data = data.json()
      let mapped = _data.map(x => ({
        name: x.name,
        date: x.date.substr(0,10),
        fulldate: new Date(x.date),
        price: x.price,
        extra: x.extra          
      }))
      .sort(this.compareDate)

      let byDay = this.groupBy(mapped, item => item.date),
          byMonth = this.groupBy(mapped, item => item.date.substr(5,2))

      if(by === 'byDay')
        this.groupBills = Array.from(byDay)//groupDates)
      if(by === 'byMonth')
        this.groupBills = Array.from(byMonth)
      console.log('this.groupBills', this.groupBills)
    })
  }
  
  groupBy(list, prop) {
    const map = new Map();
    list.forEach(item => {
      const key = prop(item)
      const collection = map.get(key)
      if(!collection)
        map.set(key, [item])
      else
        collection.push(item)
    });
    return map;
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
