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
    this.getByWeek()
    
  }

  getByWeek() {
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

      let byWeek = this.groupBy(mapped, x => 
        moment(x.date).week())

      let bills = Array.from(byWeek)
      let arr = []
      bills.map(v => {
        // console.log('v', v)
        let arr1groups = this.groupBy(v[1], x => x.name)
        let arr2 = Array.from(arr1groups)
        let arr3 = arr2.map(x => {
          let type
          x[1].forEach(e => {
            type = e.type
          });
          // console.log('type', type)
          let inner = {
            name: x[0],
            values: x[1],
            type: type
          }
          // console.log(inner)
          return inner
        }).sort(this.compareName)
        console.log(arr3)
        
        arr.push(arr3)//1)
      })
      // console.log(arr)
      this.bills = arr
      // console.log(this.bills)
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
