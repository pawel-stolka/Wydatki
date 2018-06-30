import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../expense.service';
import { Bill } from '../models/Bill';
import * as moment from 'moment';
import { DataService } from '../data.service';

@Component({
  selector: 'e-list',
  templateUrl: './e-list.component.html',
  styleUrls: ['./e-list.component.css']
})
export class EListComponent implements OnInit {
  groupBills: Bill[][]
  groupSorted: any[][]
  

  constructor(
    public expenseService: ExpenseService,
    public dataService: DataService) { }

  ngOnInit() {
    // this.getBy()
    this.groupBills = this.dataService.groupBills
    if(this.groupBills.length == 0)
      this.getBy('byWeek')
      // console.log('[]')
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
          byMonth = this.groupBy(mapped, item => item.date.substr(5,2)),
          byWeek = this.groupBy(mapped, x => moment(x.date).week())
          

      if(by === 'byDay') {
        this.groupBills = Array.from(byDay)//groupDates)
      }
      if(by === 'byMonth') {
        this.groupBills = Array.from(byMonth)
      }
      if(by === 'byWeek') {
        // this.groupBills = Array.from(byWeek)
        let date = mapped.map(x => ({
          date: x.date,
          week: moment(x.date).week()
        }))
        console.log(date)
        this.groupBills = Array.from(byWeek)
        // this.weeks = true
        // this.getWeek()
      }

      let toSort = this.groupBills.map(x => x[1])
      // console.log('this.groupBills', this.groupBills, toSort)

      let toInvest = [];
      let sorted = [];
      toSort.forEach(el => {
        // if(el.length==14) {
          // console.log('toSort[0]...', el)
          let byName = this.groupBy(el, x => x.name)
          let byNames01 = Array.from(byName)
            .sort(toSort2)
            // .sort(this.compareInnerName2)
          // console.log('byNames01..', byNames01)

          // console.log('byNames02..', byNames01.sort(this.compareInnerName2))
          // console.log('byNames2..', byNames01.sort(this.compareInnerName))
          sorted.push(byNames01)
        // }
      });
      // console.log('this.groupBills', this.groupBills)
      // console.log('sorted', sorted)
      let groupBillsSorted = this.groupBills.map((e,i) => [e[0], sorted[i]])
      // console.log('groupBillsSorted', groupBillsSorted)

      let gbsObjects = groupBillsSorted.map((v,i) => {
        let left = v[0],
            right = v[1],
            rightSum = [],
            dateArr = []
        
        right.forEach(element => {
          let innerSum = 0
          element[1].forEach(el2 => {
            innerSum += el2.price
          });

          rightSum.push(innerSum)
          dateArr.push(element[1].fulldate)
        });
        let rightObj = { 
          name: right[0][0],
          fulldate: dateArr,
          price: rightSum, 
          extra: 'coś'
        }
        let res = [left, rightObj]
        return res
      })

      // console.log('this.groupBills', this.groupBills)
      // console.log('groupBillsSorted', groupBillsSorted)
      // console.log('gbsObjects', gbsObjects)
      this.groupSorted = gbsObjects
      // this.groupBills = gbsObjects

      function toSort2(a,b) {
        const nameA = a[0],
          nameB = b[0]
        // console.log('function', nameA, nameB)
        return nameA < nameB ? -1 : 1
      }
      
      // console.log('sorted2', sorted2)
      // let subGroup1 = toSort[0]
      // console.log('subGroup1', subGroup1)
      // let byName = this.groupBy(subGroup1, x => x.name)
      // console.log('byName', byName)
      // console.log('toSort', toSort, toSort[0])

      // let byNames01 = Array.from(byName)
      //   .sort(this.compareInnerName)
      // console.log('byNames01', byNames01)

      // console.log('before', this.dataService.groupBills.length)
      this.dataService.groupBills = this.groupBills
      // console.log('after', this.dataService.groupBills.length)
    })
  }

  // getWeek() {
  //   let _date = new Date()
  //   let oneJan = new Date(_date.getFullYear(), 0, 1)
  //   console.log(oneJan)
  // }
  
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

  compareInnerName2(a,b) {
    const nameA = a[0],
        nameB = b[0]
    // console.log(nameA, nameB)
    return nameA < nameB ? -1 : 1
  }

  compareInnerName(a,b) {
    const nameA = a[0].name,
        nameB = b[0].name
    return nameA < nameB ? -1 : 1
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

  compareDate(a,b) {
    const dateA = a.fulldate,
          dateB = b.fulldate
    return (dateA < dateB) ? -1 : 1
  }

}
