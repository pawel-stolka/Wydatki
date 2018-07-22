import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'progress-combo-container',
  templateUrl: './progress-combo-container.component.html',
  styleUrls: ['./progress-combo-container.component.css']
})
export class ProgressComboContainerComponent implements OnInit {
  private chartData: any[]

  constructor() {}

  ngOnInit() {
    this.generateData()
    this.getTypes()
  }

  getTypes() {
    let types = this.chartData
    this.chartData.forEach(e => {
      // console.log('forEach', e.groups)
    });

    let uniqueTypes = this.chartData
      .filter((v, i, a) => a.indexOf(v) == i)

    console.log('getTypes unique', types, uniqueTypes)
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
    for (var i = 0; i < rowNumber; i++) {
      let groups = []
      for (let j = 0; j < types.length; j++) {
        let sum = Math.floor(Math.random() * 100)
        let group = {type: types[j], sum: sum}
        groups.push(group)
      }

      let dataGroup = [
        { 
          date: '2018-05-24',
          name: 'halls',
          price: 3.5,
          type: 'pierdoły'
        },
        { 
          date: '2018-05-25',
          name: 'airwaves',
          price: 3.5,
          type: 'pierdoły'
        }
      ]
      randomWeek.push({
          groups: groups,
          data: dataGroup,
          week: i
      })
      // this.chartData.push([
        // `x=${i}`,
        // Math.floor(Math.random() * 10)
      // ])
    }
      for (let i = 0; i < rowNumber; i++) {
        this.chartData.push(randomWeek[i])
      }
      console.log(this.chartData)
    

  }
}
