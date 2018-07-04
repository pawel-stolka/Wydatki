import { Component, OnInit, Input } from '@angular/core';
import { Bill } from '../../models/Bill';
import { trigger,state,style,transition,animate,keyframes } from '@angular/animations';


@Component({
  selector: 'e-item2',
  templateUrl: './e-item2.component.html',
  styleUrls: ['./e-item2.component.css'],
  animations: [
    trigger('detailsanimation',[
      state('small', style({
        // height : '0',
        // backgroundColor: 'white'
        // opacity: 0
       //  width: '1000px'
      })),
      state('large', style({
        // height : '300px',
        // backgroundColor: 'lightgrey',
        height: '100%'
        // opacity: 1
       //  width: '1000px'
      })),
      transition('small <=> large', animate('250ms ease-out')),
    ])
  ]
})
export class EItem2Component implements OnInit {
  @Input() sectionBills: any[]
  @Input() i: number

  state: string = 'small';
  
  currentDate
  totalPrice: number
  highest: any
  week: number
  currentBill: any[]
  private val100: any[]

  constructor() { }
  
  ngOnInit() {
    
    // console.log(this.sectionBills)
    let newVal: any[] = []
    
    // let bills = 
    this.sectionBills.map(i => {
      // console.log(i)
      let sum = 0
      i.values.forEach(element => {
        sum += element.price
      });
      let newV = {
        name: i.name,
        type: i.type,
        values: i.values,
        sum: sum.toFixed(2)
      }
      newVal.push(newV)
      // console.log('newVal', newVal)
    })
    this.val100 = Array.from(newVal)
    
    this.sectionBills = newVal 
    // this.allBills = newVal

    this.totalPrice = 0
    this.highest = {
      price: 0
    }
    this.sumPrice()
    // console.log(this.sectionBills)
  }

  sumPrice() {
    
    let total = 0
    // console.log(this.sectionBills)
    this.sectionBills.forEach(item => {
      // console.log('item',item)
      total += +item.sum
      this.currentDate = item.values[0].date
      if(item.sum > this.highest.price) {
        
        this.highest = {
          name: item.name,
          price: item.sum
        }
        // console.log('highest', this.highest)
      }
    });
    this.totalPrice = Math.ceil(total * 100)/100;
  }

  animateMe(){
    // console.log('val100', this.val100)
    this.currentBill = this.val100
    
    this.state = (this.state === 'small' ? 'large' : 'small');
  }

  byQuantity() {
    console.log('byQuantity')
    console.log(this.i, this.currentBill)
    this.currentBill.sort(this.compareQuantity)
    console.log(this.currentBill)
  }

  byProduct() {
    console.log('byProduct')
  }

  byCategory() {
    console.log('byCategory')
  }

  bySum() {
    console.log('bySum')
  }

  compareQuantity(a,b) {
    const lengthA = a.values.length,
    lengthB = b.values.length
    return (lengthA > lengthB) ? -1 : 1
  }

}
