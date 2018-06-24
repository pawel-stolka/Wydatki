import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'chart-container2',
  templateUrl: './chart-container2.component.html',
  styleUrls: ['./chart-container2.component.css']
})
export class ChartContainer2Component implements OnInit {
  private chartData: Array<any>;

  constructor() { }

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
        `${i}.`,
        Math.floor(Math.random() * 10)
      ])
    }
    console.log(this.chartData)
  }

  loadData() {
    // for tests
    this.generateData()
    
    // for prod
    // ...
  }

}
