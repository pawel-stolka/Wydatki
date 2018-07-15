import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../../../expense.service';

@Component({
  selector: 'progress-container',
  templateUrl: './progress-container.component.html',
  styleUrls: ['./progress-container.component.css']
})
export class ProgressContainerComponent implements OnInit {
  private chartData: Array<any>;
  private apiData: any[]

  constructor(
    private expenseService: ExpenseService) { }

  ngOnInit() {
    this.generateData()
    // this.loadData()
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

  // by(by) {
  //   console.log(by)
  //   this.loadData(by)
  // }
}
