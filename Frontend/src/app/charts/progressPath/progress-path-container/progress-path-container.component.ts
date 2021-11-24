import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../../../expense.service';

@Component({
  selector: 'progress-path-container',
  templateUrl: './progress-path-container.component.html',
  styleUrls: ['./progress-path-container.component.css']
})
export class ProgressPathContainerComponent implements OnInit {
  private chartData: any[]
  private periodTypes = []

  constructor(private expenseService: ExpenseService) { }

  ngOnInit() {
    this.generateData()
    this.getTypes()
  }

  getTypes() {
    let types = this.chartData
    this.chartData.forEach(e => {
      console.log('forEach', e.groups)
    });

    // only unique values
    // https://stackoverflow.com/questions/1960473/get-all-unique-values-in-a-javascript-array-remove-duplicates/16065720#16065720
    // let list = [ 1,3,4,1,3,5,1].sort()
    // let unique = list.filter((x, i, a) => a.indexOf(x) == i)
    // console.log('getTypes unique', list, unique)

    let uniqueTypes = this.chartData
          .filter((v, i, a) => a.indexOf(v) == i)

    console.log('getTypes unique', types, uniqueTypes)
    // return this.expenseService.getTypes()
    // .subscribe(
    //   data => {
    //     this.types = data.json()
    //     // types.sort(this.byCount)

    //     console.log('types', this.types)
    //     // types.forEach(element => {
    //     //   this.selection.push(element)
    //     // });
    //   }
    // )
  }

  generateData(type = '') {
    this.chartData = []
    let types = [
      'opłaty',
      'na mieście',
      'pierdoły',
      'spożywka',
      'leki'
    ]
    //#region ---- RANDOM DATA - ONLY FOR FIRST DATA TESTS -----
    let randomWeek = []
    let rowNumber = 2 + Math.floor(Math.random() * 10);
    console.log('rowNumber', rowNumber)
    for (var i = 1; i <= rowNumber; i++) {
      let groups = []
      for (let j = 0; j < types.length; j++) {
        let sum = Math.floor(Math.random() * 100)
        groups.push(
          {type: types[j], sum: sum}
        )
      }
      randomWeek.push({
          groups: groups,
          week: i
      })
      // this.chartData.push([
        // `x=${i}`,
        // Math.floor(Math.random() * 10)
      // ])
    }
    console.log('randomWeek', randomWeek)
    //#region test hardcoded weeks
    let weeks = [
      {
        groups: [
          {type: 'opłaty', sum: 144},
          {type: 'na mieście', sum: 108.789999},
          {type: 'pierdoły', sum: 10.5},
          {type: 'spożywka', sum: 412.522221},
          {type: 'leki', sum: 6.5}
        ],
        week: 19
      }, {
        groups: [
          {type: 'opłaty', sum: 212},
          {type: 'na mieście', sum: 144.2},
          {type: 'pierdoły', sum: 30.5},
          {type: 'spożywka', sum: 312.522221},
          {type: 'leki', sum: 16.5}
        ],
        week: 20
      }, {
        groups: [
          {type: 'opłaty', sum: 74.24},
          {type: 'na mieście', sum: 488.789999},
          {type: 'pierdoły', sum: 105.5},
          {type: 'spożywka', sum: 212.522221},
          {type: 'leki', sum: 56.5}
        ],
        week: 21
      }, {
        groups: [
          {type: 'opłaty', sum: 312.24},
          {type: 'na mieście', sum: 388.789999},
          {type: 'pierdoły', sum: 45.5},
          {type: 'spożywka', sum: 152.522221},
          {type: 'leki', sum: 26.5}
        ],
        week: 22
      }, {
        groups: [
          {type: 'opłaty', sum: 52.24},
          {type: 'na mieście', sum: 588.789999},
          {type: 'pierdoły', sum: 145.5},
          {type: 'spożywka', sum: 102.522221},
          {type: 'leki', sum: 6.5}
        ],
        week: 23
      }
    ]
    //#endregion

    for (let i = 0; i < rowNumber; i++) {
      this.chartData.push(randomWeek[i])
    }

    // for test with other type
    // let otherType = {
    //   groups: [{"type": "a co!", sum: 12}],
    //   week: 8
    // }
    // this.chartData.push(otherType)

    // this.chartData = weeks

    //#endregion

    // this.dataByPeriod.forEach(e => {
    //   console.log(' -- e', e)
    //   let types = e.groups.filter(x => x.type == type)
    //   console.log('types', types)
    //   let selection = types.length > 0 ? types[0].sum : 0
    //   this.chartData.push([
    //     `week ${e.week}`,
    //     selection
    //   ])
    // });

    console.log(this.chartData)
  }

}
