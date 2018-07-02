import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pie-container2',
  templateUrl: './pie-container2.component.html',
  styleUrls: ['./pie-container2.component.css']
})
export class PieContainer2Component implements OnInit {
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
