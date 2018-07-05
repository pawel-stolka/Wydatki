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
    console.log('incoming',this.incoming)
    this.pieData = this.incoming
    // this.generateData()
  }

  generateData() {
    let p = Math.random()/2,
        percents = parseFloat(p.toString())
    // console.log('percents', percents)
    // var dataset = [
    //         { name: 'Male', percent: percents },
    //         { name: 'Female', percent: percents * 1.1 },
    //         { name: 'Bobo', percent: 1 }
    //     ];

    this.pieData = this.incoming// dataset
    
    console.log(this.pieData)
  }

}
