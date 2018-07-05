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

  state: string = 'large'//'small';
  
  currentDate
  totalPrice: number
  highest: any
  week: number
  currentBill: any[]
  private val100: any[]
  testData: any[]

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
        sum: +sum.toFixed(2)
      })
    })

    this.sectionBills = newVal 

    this.val100 = Array.from(newVal)
    
    this.sumPrice()
    this.testPieData()
  }

  testPieData() {
    this.testData = [
      {
        name: 'item1',
        percent: .23
      },
      {
        name: 'item2',
        percent: .7
      },
      {
        name: 'item3',
        percent: 1
      }
    ]
    let realData = this.sectionBills.sort(this.compareCategory)
    // ----------
    let byType = this.groupBy(realData, x => 
      x.type
      // (x.date).week()
    )

    let _types = Array.from(byType)
    let types = _types.map(t => {
      let total = 0
      
      t[1].forEach(s => {
        total += s.sum
      });
      // console.log('total', total)
      let result = {
        type: t[0],
        total: parseFloat(total.toFixed(2))        
      }
      // console.log('t', t)
      return result
    })
    console.log('types', types)

    // counting percentages
    let allTotal = 0
    types.forEach(t => {
      allTotal += t.total
    });
    types.forEach(element => {
      
    });
    // -------------

    let _preparedData = types.map(x => {
      
      let result = {
        name: x.type,
        percent: x.total,
        fraction: allTotal
      }
      return result
    })

    let preparedData2 = _preparedData.map( o => {
      let fraction = o.percent / o.fraction * 100
      let result = {
        name: o.name,
        percent: o.percent,
        fraction: parseFloat(fraction.toString())
      }
      return result
    })

    // let preparedData
    let fractions = [],
        currFraction = 0
    preparedData2.forEach((e,i) => {
      if(i===0) {
        currFraction = e.fraction
      } else {
        currFraction += e.fraction
      }
      fractions.push(currFraction)
    });
    let preparedData = _preparedData.map((p,i) => {
      let fraction = parseFloat(fractions[i])/100
      let result = {
        name: p.name,
        percent: p.percent,
        fraction: fraction
      }
      return result
    })

    // preparedData.map(p => {
    //   let fraction = (p.percent )
    // })

    console.log('realData', realData)
    console.log('_preparedData', _preparedData)
    console.log('preparedData', preparedData)
  }

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

  byTotal() {

  }

  byQuantity() {
    this.sectionBills.sort(this.compareQuantity)
    console.log('byQuantity', this.sectionBills)
  }

  byName() {
    this.sectionBills.sort(this.compareName)
    console.log('byName', this.sectionBills)
  }

  byCategory() {
    this.sectionBills.sort(this.compareCategory)
    console.log('byCategory', this.sectionBills)
  }

  bySum() {
    this.sectionBills.sort(this.compareSum)
    console.log('bySum', this.sectionBills)
  }

  // someProp: number// = 0
  compareName(a,b) {
    // let someProp = 0//this.someProp
    let nameA = a.name,
        nameB = b.name
    // console.log(this.someProp)
    // if(someProp === 1) {
    //   someProp = 0
      // return (nameA < nameB) ? -1 : 1
    // }
    // else {
    //   someProp = 1
      return (nameA > nameB) ? -1 : 1
    // }
  }
  
  compareCategory(a,b) {
    let typeA = a.type,
        typeB = b.type
        // console.log(this.nameSort)
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
