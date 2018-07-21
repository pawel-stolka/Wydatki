import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'progress-path-container',
  templateUrl: './progress-path-container.component.html',
  styleUrls: ['./progress-path-container.component.css']
})
export class ProgressPathContainerComponent implements OnInit {
  private chartData: any[]

  constructor() { }

  ngOnInit() {
    this.generateData()
  }

  generateData(type = '') {
    this.chartData = []
    //#region ---- RANDOM DATA - ONLY FOR FIRST DATA TESTS -----
    let rowNumber = 5 + Math.floor(Math.random() * 10);
    for (var i = 1; i <= rowNumber; i++) {
      this.chartData.push([
        `x=${i}`,
        Math.floor(Math.random() * 10)
      ])
    }
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
