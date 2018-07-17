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
  private apiData: any[]
  selection = []
  selected

  private dataByWeeks = []

  constructor(
    private expenseService: ExpenseService) { }


  ngOnInit() {
    this.getTypes()
    this.generateData()

    // this.loadData()
  }

  generateData(type = '') {
    this.chartData = []
    // random interval
    // let rowNumber = 2 + Math.floor(Math.random() * 10);
    // for (var i = 1; i <= rowNumber; i++) {
    //   this.chartData.push([
    //     `x=${i}`,
    //     Math.floor(Math.random() * 10)
    //   ])
    // }

    this.dataByWeeks.forEach(e => {
      console.log(' -- e', e)
      let types = e.groups.filter(x => x.type == type)
      console.log('types', types)
      let selection = types.length > 0 ? types[0].sum : 0
      this.chartData.push([
        `week ${e.week}`,
        selection
      ])
    });
    // for (var i = 1; i <= this.dataByWeeks.length; i++) {
    //   this.chartData.push([
    //     `week ${this.dataByWeeks[0]}`,
    //     this.dataByWeeks[1]
    //   ])
    // }
    console.log(this.chartData)
  }

  getBills() {
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
        let by = 'byWeek'

        if(by === 'byDay') 
          bills = Array.from(byDay)//groupDates)
        if(by === 'byMonth') 
          bills = Array.from(byMonth)
        if(by === 'byWeek') {
          // this.groupBills = Array.from(byWeek)
          // let date = mapped.map(x => ({
          //   date: x.date,
          //   week: moment(x.date).week()
          // }))
          // bills.filter(x => x.week > 27)// .date.substr(5,2)=='05')
          // console.log(date)
          // console.log(byWeek)
          bills = Array.from(byWeek)
          // console.log('bills', bills)
          let groups
          let namesByWeek = bills.map(x => {
            let gr = this.groupBy(x[1], i => i.type)
            groups = Array.from(gr)
           
            let groupsJson = groups.map(g => {
              return {
                type: g[0],
                data: g[1]
              }
            })
            groupsJson.forEach(gg => {
              let sum = 0
              gg.data.forEach(d => {
                sum += +d.price
              });
              gg.sum = sum
            });
            return {
              week: x[0],
              // names: _names,
              groups: groupsJson
            }
          })
          this.dataByWeeks = namesByWeek
          // console.log('this.dataByWeeks', this.dataByWeeks)
          let byName = this.groupBy(bills, x => x.name)
          let names = Array.from(byName)
          // console.log('names', names)

          console.log('this.dataByWeeks', this.dataByWeeks)
          for (var i = 1; i <= this.dataByWeeks.length; i++) {
            console.log(`done ${i}`)
            this.chartData.push([
              `week ${i}`,
              i
            ])
          }
          console.log(this.chartData)

          // bills = bills.filter(x => {
          //   let sub1 = x[1].filter(s => s.date.substr(5,2)=='07')
          //   // let res = x[1].date.substr(5,2)=='05'
          //   let res = x[0] > 25 // x[1].length 
          //   console.log('filter sub1', sub1)
          //   return sub1// res 
          // })
          // console.log('bills', bills)
          // this.weeks = true
          // this.getWeek()
        }

        console.log('bills', bills)
        // console.log('mapped', mapped)
      })
  }

  clickAction(text) {
    console.log(`clicked ${text}`)
    this.selected = text
    this.getBills()
    this.generateData(text)
    
    // this.getBills()
  }

  getTypes() {
    return this.expenseService.getTypes()
    .subscribe(
      data => {
        let types = data.json()
        
        // types.sort(this.byCount)

        console.log(types)
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
