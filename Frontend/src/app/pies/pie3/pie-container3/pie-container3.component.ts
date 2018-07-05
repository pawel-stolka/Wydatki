import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'pie-container3',
  templateUrl: './pie-container3.component.html',
  styleUrls: ['./pie-container3.component.css']
})
export class PieContainer3Component implements OnInit {
  @Input() incoming: any[]
  private pieData: Array<any>

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
    
    console.log(this.pieData)
  }

}
