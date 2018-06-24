import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'chart-container',
  templateUrl: './chart-container.component.html',
  styleUrls: ['./chart-container.component.css']
})
export class ChartContainerComponent implements OnInit {
  private chartData: Array<any>;
  
  constructor() { }
  
  ngOnInit() {
    this.generateData()

     // change the data periodically
    // setInterval(() => {
    //   this.generateData(), 100
    // }, 1000);
  }

  generateData(): any {
    this.chartData = [];

    // // let's say 5 bars
    // for (var i = 1; i <= 5; i++) {
    //   this.chartData.push([
    //     `${i}.`,
    //     Math.floor(Math.random() * 10)
    //   ])
    // }

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

  change() {
    this.generateData()
  }
}
