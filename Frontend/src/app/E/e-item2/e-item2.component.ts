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
    this.totalPrice = 0
    this.highest = {
      price: 0
    }

    let newVal = []
    this.sectionBills.map(i => {
      let sum = 0
      i.values.forEach(element => {
        sum += element.price
      });

      newVal.push({
        name: i.name,
        type: i.type,
        values: i.values,
        sum: sum.toFixed(2)
      })
    })

    this.sectionBills = newVal 

    this.val100 = Array.from(newVal)
    

    this.sumPrice()
  }

  sumPrice() {
    let total = 0
    
    this.sectionBills.forEach(item => {
      this.currentDate = item.values[0].date

      total += +item.sum

      if(item.sum > this.highest.price) {
        this.highest = {
          name: item.name,
          price: item.sum
        }
      }
    });
    this.totalPrice = Math.ceil(total * 100)/100;
  }

  animateMe(){
    this.currentBill = this.val100
    this.state = (this.state === 'small' ? 'large' : 'small');
  }

  byQuantity() {
    console.log('this.sectionBills', this.sectionBills)
    
    this.currentBill.sort(this.compareQuantity)
    console.log('byQuantity', this.currentBill)
  }

  byName() {
    this.currentBill.sort(this.compareName)
    console.log('byName', this.currentBill)
  }

  byCategory() {
    this.currentBill.sort(this.compareCategory)
    console.log('byCategory', this.currentBill)
  }

  bySum() {
    this.currentBill.sort(this.compareSum)
    console.log('bySum', this.currentBill)
  }

  
  compareName(a,b) {
    let nameA = a.name,
        nameB = b.name
    return (nameA < nameB) ? -1 : 1
  }
  
  compareCategory(a,b) {
    let typeA = a.type,
        typeB = b.type
    return (typeA < typeB) ? -1 : 1
  }
  
  compareQuantity(a,b) {
    let lengthA = a.values.length,
        lengthB = b.values.length
    return (lengthA > lengthB) ? -1 : 1
  }

  compareSum(a,b) {
    let sumA = parseFloat(a.sum),
        sumB = parseFloat(b.sum)
    return (sumA > sumB) ? -1 : 1
  }

}
