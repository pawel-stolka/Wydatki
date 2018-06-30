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
    ]),

    // trigger('shrinkOut', [
    //   state('in', style({})),
    //   transition('* => void', [
    //     style({ height: '!', opacity: 1 }),
    //     animate(1000, style({ height: 0, opacity: 0 }))
    //   ]),
    //   transition('void => *', [
    //     style({ height: 0, opacity: 0 }),
    //     animate(1000, style({ height: '*', opacity: 1 }))
    //   ])
    // ])
  ]
})
export class EItemComponent implements OnInit {
  @Input()
  dailyBills: any[]

  groupedItems: any[] = []

  state: string = 'small';

  currentDate
  totalPrice: number
  highest: any
  week: number
  
  constructor() { }

  ngOnInit() {
    this.totalPrice = 0
    this.highest = {
      price: 0
    }
    // console.log(this.bills)
    this.sumPrice()
    // console.log('this.totalPrice', this.totalPrice)
    this.groupBatches()
  }

  sumPrice() {
    let total = 0
    this.dailyBills.forEach(item => {
      total += item.price
      this.currentDate = item.date
      if(item.price > this.highest.price) {
        this.highest = {
          name: item.name,
          price: item.price
        }
      }
    });
    this.totalPrice = Math.ceil(total * 100)/100;
    // console.log('T: ', total, _t)

    
    
  }
  _groupedItems: any[] = []
  groupBatches(){
    let items = []
    this.dailyBills.forEach(element => {
      items.push(element)
      // console.log('element', element)
    });
    console.log(items)
    let byName = this.groupBy(items, item => item.name)
    // console.log('dailyBills', this.dailyBills.length)
    this._groupedItems = Array.from(byName)
    

    this._groupedItems.forEach(el3 => {
      // console.log('el3', el3)//.length)
    });
  }

  animateMe(){
    this.state = (this.state === 'small' ? 'large' : 'small');
  }

  //-------------------

  groupBy(list, prop) {
    const map = new Map();
    list.forEach(item => {
      const key = prop(item)
      const collection = map.get(key)
      if(!collection)
        map.set(key, [item])
      else
        collection.push(item)
    });
    return map;
  }

  compareName(a,b) {
    const nameA = a.name,
          nameB = b.name
    let comparison = 1
    if(nameA < nameB)
      comparison = -1

    // console.log(comparison, dateA, dateB)
    return comparison
  }

}
