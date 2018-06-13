import { Component, OnInit, Input } from '@angular/core';
import { Bill } from '../models/Bill';
import { trigger,state,style,transition,animate,keyframes } from '@angular/animations';

@Component({
  selector: 'e-item',
  templateUrl: './e-item.component.html',
  styleUrls: ['./e-item.component.css'],
  animations: [
    trigger('detailsanimation',[
      state('small', style({
        height : '0px',
       //  width: '1000px'
      })),
      state('large', style({
        height : '100px',
       //  width: '1000px'
      })),
      transition('small <=> large', animate('250ms ease-out')),
    ]),
  ]
})
export class EItemComponent implements OnInit {
  @Input()
  dailyBills: any[]

  state: string = 'small';

  currentDate
  totalPrice: number
  
  constructor() { }

  ngOnInit() {
    this.totalPrice = 0;
    // console.log(this.bills)
    this.sumPrice()
    // console.log('this.totalPrice', this.totalPrice)
  }

  sumPrice() {
    let total = 0
    this.dailyBills.forEach(item => {
      total += item.price
      this.currentDate = item.date
    });
    this.totalPrice = Math.ceil(total * 100)/100;
    // console.log('T: ', total, _t)
  }

  animateMe(){
    this.state = (this.state === 'small' ? 'large' : 'small');
  }

}
