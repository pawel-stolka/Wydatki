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
  groupBills//: Bill[][]

  constructor(public expenseService: ExpenseService) { }

  ngOnInit() {
    this.getBy()
  }

  getBy() {
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

      let bills = mapped.sort(this.compareDate) // data.json()
      
      let groupDates = this.groupBy(mapped, item => item.date)
      // let _gr
      this.groupBills = Array.from(groupDates)
      console.log('this.groupBills', this.groupBills)

      // let groupedByDay = _mapped.groupBy('fulldate', (result) => {
      //   let res = moment(result['Date'], 'DD/MM/YYYY').startOf('isoWeek')
      //   console.log(res)
      //   return res;
      // })
    })
  }
  // weekOfYear(date){
  //   let d = new Date(+date);
  //   d.setHours(0,0,0);
  //   d.setDate(d.getDate()+4-(d.getDay()||7));
  //   let _x = new Date(d.getFullYear(), 0, 1)
  //   console.log('58', d)
  //   console.log('59', _x)
  //   let res = Math.ceil(( ((d - _x ) /8.64e7)+1)/7);
  //   // let res = Math.ceil(( ((d - new Date(d.getFullYear(),0,1) ) /8.64e7)+1)/7);
  // };

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
