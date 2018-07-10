import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../../expense.service';
import { Bill } from '../../models/Bill';
import * as moment from 'moment';
import { DataService } from '../../data.service';

@Component({
  selector: 'e-list2',
  templateUrl: './e-list2.component.html',
  styleUrls: ['./e-list2.component.css']
})
export class EList2Component implements OnInit {
  bills: any[]

  constructor(
    public expenseService: ExpenseService,
    public dataService: DataService) { }

  ngOnInit() {
    this.bills = this.dataService.getBills2()
    this.getBy('byWeek')
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
        extra: x.extra, 
        type: x.type         
      }))
      .sort(this.compareDate)
      // console.log(mapped)

      let byDay = this.groupBy(mapped, item => item.date),
          byMonth = this.groupBy(mapped, item => item.date.substr(5,2)), 
          byWeek = this.groupBy(mapped, x => moment(x.date).week())

      let bills

      if(by === 'byDay') {
        bills = Array.from(byDay)//groupDates)
      }
      if(by === 'byMonth') {
        bills = Array.from(byMonth)
      }
      if(by === 'byWeek') {
        // this.groupBills = Array.from(byWeek)
        let date = mapped.map(x => ({
          date: x.date,
          week: moment(x.date).week()
        }))
        console.log(date)
        bills = Array.from(byWeek)
        // this.weeks = true
        // this.getWeek()
      }

      let arr = []
      bills.map(v => {
        let arr1groups = this.groupBy(v[1], x => x.name)
        let arr2 = Array.from(arr1groups)
        let arr3 = arr2.map(x => {
          let type
          x[1].forEach(e => {
            type = e.type
          });
          let inner = {
            name: x[0],
            values: x[1],
            type: type
          }
          return inner
        }).sort(this.compareName)

        arr.push(arr3)//1)
      })
      this.bills = arr
    })
  }



  compareDate(a,b) {
    const dateA = a.fulldate,
          dateB = b.fulldate
    return (dateA < dateB) ? -1 : 1
  }

  compareName(a,b) {
    const nameA = a.name,
        nameB = b.name
    return nameA < nameB ? -1 : 1
    // let comparison = 1
    // if(nameA < nameB)
    //   comparison = -1
    // return comparison
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
}
