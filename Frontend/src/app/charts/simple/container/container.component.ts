import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../data.service';

@Component({
  selector: 'container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit {
  public chartData: Array<any>;

  constructor(public dataService: DataService) { }

  ngOnInit() {
    this.generateData()
    // this.getData()
  }

  getData() {
    let array = this.dataService.groupBills
    console.log('array', array)

    this.chartData = []
    for (var i = 0; i < array.length; i++) {
      this.chartData.push([
        `Index ${i}`,
        array[i]
      ])
    }
    console.log('this.chartData', this.chartData)
  }

  generateData() {
    this.chartData = [];
    // for (let i = 0; i < (8 + Math.floor(Math.random() * 10)); i++) {
    //   this.chartData.push([
    //     `Index ${i}`,
    //     Math.floor(Math.random() * 100)
    //   ]);
    // }

    let billsData = this.dataService.groupBills
    console.log('loop',billsData[0][1])

    let sum = billsData[0].forEach(element => {
      console.log(element)
    });

    billsData.forEach(element => {
      this.chartData.push([
        `miesiąc: ${element[0]}`,
        element[0][1]
      ])
    });
    console.log('this.chartData', this.chartData)
  }
}
