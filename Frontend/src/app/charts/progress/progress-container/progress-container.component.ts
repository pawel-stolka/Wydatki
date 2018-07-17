import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../../../expense.service';
import * as moment from 'moment';

@Component({
  selector: 'progress-container',
  templateUrl: './progress-container.component.html',
  styleUrls: ['./progress-container.component.css']
})
export class ProgressContainerComponent implements OnInit {
  private chartData: Array<any>;
  selection = []
  selected

  private dataByPeriod = []

  constructor(
    private expenseService: ExpenseService) { }


  ngOnInit() {
    this.getTypes()
    // this.generateData()
  }

  generateData(type = '') {
    this.chartData = []
    //#region ---- RANDOM DATA - ONLY FOR FIRST DATA TESTS -----
    // let rowNumber = 2 + Math.floor(Math.random() * 10);
    // for (var i = 1; i <= rowNumber; i++) {
    //   this.chartData.push([
    //     `x=${i}`,
    //     Math.floor(Math.random() * 10)
    //   ])
    // }
    //#endregion

    this.dataByPeriod.forEach(e => {
      console.log(' -- e', e)
      let types = e.groups.filter(x => x.type == type)
      console.log('types', types)
      let selection = types.length > 0 ? types[0].sum : 0
      this.chartData.push([
        `week ${e.week}`,
        selection
      ])
    });
 
    console.log(this.chartData)
  }

  getBills(by) {
    this.expenseService.getBills()
      .subscribe(data => {
        let apiBills = data.json()
        let mapped = apiBills.map(x => ({
          name: x.name,
          date: x.date.substr(0,10),
          fulldate: new Date(x.date),
          price: x.price,
          // extra: x.extra, 
          type: x.type         
        }))
        // .sort(this.compareDate)
        let byDay = this.groupBy(mapped, item => item.date),
            byMonth = this.groupBy(mapped, item => item.date.substr(5,2)), 
            byWeek = this.groupBy(mapped, x => moment(x.date).week())
          

        let bills
        // let by = 'byWeek'

        if(by === 'byDay') 
          bills = Array.from(byDay)
        if(by === 'byMonth') 
          bills = Array.from(byMonth)
        if(by === 'byWeek') 
          bills = Array.from(byWeek)
          
        this.dataByPeriod = this.namesByPeriod(bills)
        // console.log('this.dataByWeeks', this.dataByWeeks)
        let byName = this.groupBy(bills, x => x.name)
        let names = Array.from(byName)
        // console.log('names', names)

        console.log('this.dataByWeeks', this.dataByPeriod)
        for (var i = 1; i <= this.dataByPeriod.length; i++) {
          // console.log(`done ${i}`)
          this.chartData.push([
            `week ${i}`,
            i
          ])
        }
        
      })
  }

  namesByPeriod(bills) {
    let groups
    let namesByWeek = bills.map(x => {
      let _groups = this.groupBy(x[1], i => i.type)
      groups = Array.from(_groups)
     
      let groupsJson = groups.map(g => {
        return {
          type: g[0],
          data: g[1]
        }
      })
      groupsJson.forEach(p => {
        let sum = 0
        p.data.forEach(d => {
          sum += +d.price
        });
        p.sum = sum
      });
      return {
        week: x[0],
        groups: groupsJson
      }
    })
    return namesByWeek
  }

  clickAction(text) {
    console.log(`clicked ${text}`)
    this.selected = text
    let by = 'byDay'//'byMonth'// 'byWeek'// 'byDay'
    this.getBills(by)
    this.generateData(text)
  }

  getTypes() {
    return this.expenseService.getTypes()
    .subscribe(
      data => {
        let types = data.json()
        
        // types.sort(this.byCount)

        console.log('types', types)
        types.forEach(element => {
          this.selection.push(element)
        });
      }
    )
  }

  submitForm() {
    // let ex = {
    //   type: this.complexGroup.value.typeFormControl,
    // }
    // console.log(ex)
  }

  compareName(a,b) {
    let nameA = a.name,
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
