import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../expense.service';
import * as moment from 'moment';

@Component({
  selector: 'chart-container2',
  templateUrl: './chart-container2.component.html',
  styleUrls: ['./chart-container2.component.css']
})
export class ChartContainer2Component implements OnInit {
  private chartData: Array<any>;
  private apiData: any[]

  constructor(
    private expenseService: ExpenseService) { }

  ngOnInit() {
    this.loadData()
  }

  change() {
    this.loadData()
  }

  generateData() {
    this.chartData = []
    // random interval
    let rowNumber = 2 + Math.floor(Math.random() * 10);
    for (var i = 1; i <= rowNumber; i++) {
      this.chartData.push([
        `x=${i}`,
        Math.floor(Math.random() * 10)
      ])
    }
    console.log(this.chartData)
  }

  by(by) {
    console.log(by)
    this.loadData(by)
  }

  loadData(by = 'byWeek') {
    // for tests
    // this.generateData()
    
    // for prod
    
    this.expenseService.getBills()
      .toPromise()
      .then((data: any) => {
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
        
    let bills
    switch (by) {
      case 'byWeek':
        bills = Array.from(byWeek)
        break;
      case 'byMonth':
        bills = Array.from(byMonth)
        break;
      default:
        bills = Array.from(byDay)
        break;
    }

      
    let sum = [];
    bills.forEach(element => {
      let _sum = 0
      element[1].forEach(el => {
        _sum += el.price
      });
      _sum = parseFloat(_sum.toFixed(2))
      sum.push(_sum)
      element[1] = _sum
    });

    this.apiData = bills

    this.chartData = []
    for (var i = 0; i < this.apiData.length; i++) {
      let x = `${this.apiData[i][0]}`,
          y = this.apiData[i][1]
          console.log(x, 'TERAZ'.substr(2,2))
      let x1 = x.substr(6,1),
          x2 = x.substr(8)
      if(x.startsWith('2018'))
        x = x2+'/'+x1
      this.chartData.push([x,y])
    }
    // console.log(this.chartData)
    console.log(this.apiData)
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
