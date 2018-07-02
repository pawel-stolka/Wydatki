import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'e-item2',
  templateUrl: './e-item2.component.html',
  styleUrls: ['./e-item2.component.css']
})
export class EItem2Component implements OnInit {
  @Input()
  sectionBills: any[]

  constructor() { }

  ngOnInit() {
    // console.log(this.sectionBills)
    let newVal: any[] = []
    
    let bills = this.sectionBills.map(i => {
      let sum = 0
      i.values.forEach(element => {
        sum += element.price
      });
      let newV = {
        name: i.name,
        values: i.values,
        sum: sum.toFixed(2)
      }
      newVal.push(newV)
      // console.log('newVal', newVal)
    })
    this.sectionBills = newVal 
    console.log(this.sectionBills)
    // console.log(bills)
  }

}
