import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pie-container',
  templateUrl: './pie-container.component.html',
  styleUrls: ['./pie-container.component.css']
})
export class PieContainerComponent implements OnInit {
  private pieData: Array<any>;

  constructor() { }

  ngOnInit() {
    this.generateData()
  }

  generateData() {
    var dataset = [
            { name: 'Male', percent: 55 },
            { name: 'Female', percent: 45 }
        ];

    this.pieData = dataset
    // // random interval
    // let rowNumber = 2 + Math.floor(Math.random() * 10);
    // for (var i = 1; i <= rowNumber; i++) {
    //   this.pieData.push([
    //     `x=${i}`,
    //     Math.floor(Math.random() * 10)
    //   ])
    // }
    console.log(this.pieData)
  }

}
