import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'simple-chart',
  templateUrl: './simple-chart.component.html',
  styleUrls: ['./simple-chart.component.css']
})
export class SimpleChartComponent implements OnInit {
  group = this.dataService.groupBills

  constructor(public dataService: DataService) { }

  ngOnInit() {
  }

}
