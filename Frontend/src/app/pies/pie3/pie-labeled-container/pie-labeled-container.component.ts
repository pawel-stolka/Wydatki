import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pie-labeled-container',
  templateUrl: './pie-labeled-container.component.html',
  styleUrls: ['./pie-labeled-container.component.css']
})
export class PieLabeledContainerComponent implements OnInit {
  private pieData: Array<any>
  
    constructor() { }
  
    ngOnInit() {
      // console.log('incoming',this.incoming)
      // this.pieData = this.incoming
      this.generateData()
    }
  
    generateData() {
      let p = Math.random()/2,
          percents = parseFloat(p.toString())
      // console.log('percents', percents)
      var dataset = [
              { name: 'Paweł', percent: percents },
              { name: 'Basia', percent: percents * 1.1 },
              { name: 'Hania', percent: 1 }
          ];
  
      this.pieData = dataset
      
      console.log(this.pieData)
    }

}
