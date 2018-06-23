import { Component, OnInit, ElementRef, AfterViewInit, Input } from '@angular/core';
import { D3Service, D3, Selection } from 'd3-ng2-service';
import { ExpenseService } from '../expense.service';
import { DataService } from '../data.service';
import * as moment from 'moment';

@Component({
  selector: 'chart2',
  templateUrl: './chart2.component.html',
  styleUrls: ['./chart2.component.css']
})
export class Chart2Component implements OnInit {
  private apiData = [];
  private d3: D3;
  private parentNativeElement: any;
  private parent;
  private error;
  svg;
  margin
  width
  height
  x
  y


  constructor(
    element: ElementRef,
    d3Service: D3Service,
    public dataService: DataService,
    public expenseService: ExpenseService
  ) { 
    this.d3 = d3Service.getD3();
    this.parentNativeElement = element.nativeElement;
  }

  ngAfterViewInit() {
    this.svg = this.d3.select("svg")
    let _width = 850,
        _height = 500

    // var width = +this.svg.attr("width"),
    //     height = +this.svg.attr("height")
    this.margin = { top: 40, right: 20, bottom: 100, left: 70 }
    this.width = _width - this.margin.left - this.margin.right
    this.height = _height - this.margin.top - this.margin.bottom
  
    // set the ranges
    this.x = this.d3.scaleTime()
      .range([0, this.width]);
    this.y = this.d3.scaleLinear()
      .range([this.height, 0]);

  }

  ngOnInit() {
    this.loadData()
    // this.loadD3()
    // this.loadGraph()
    
    .then(() => this.loadD3())
    .then(() => this.loadGraph())
    // .catch((err) => this.error = `error: ${this.apiService.error}`)
  }

  getBy(by){
    this.loadData(by)
      .then(() => this.loadD3())
      .then(() => this.loadGraph())
  }

  loadData(by=null) {
    let bills

    return this.expenseService.getBills()
    .toPromise()
    .then((data: any) => {
    // .subscribe((data: any) => {
      let _data = data.json()
      let mapped = _data.map(x => ({
        name: x.name,
        date: x.date.substr(0,10),
        fulldate: new Date(x.date),
        price: x.price,
        extra: x.extra          
      }))
      .sort(this.compareDate)
      // console.log(mapped)

      let byDay = this.groupBy(mapped, item => item.date),
      byMonth = this.groupBy(mapped, item => item.date.substr(5,2)),
      byWeek = this.groupBy(mapped, x => moment(x.date).week())
      
      switch (by) {
        case 'byDay':
          bills = Array.from(byDay)//byMonth)
          break;
        case 'byWeek':
          bills = Array.from(byWeek)
          break;
        case 'byMonth':
          bills = Array.from(byMonth)
          break;
        default:
          bills = Array.from(byDay)//byMonth)
          break;
      }
      
        let sum = [];
        bills.forEach(element => {
          let _sum = 0
          element[1].forEach(el => {
            _sum += el.price
          });
          _sum = parseFloat(_sum.toFixed(2))
          sum.push(_sum)
          element[1] = _sum
        });
        console.log('sum', sum)
        console.log(bills)
        this.apiData = bills
        console.log(this.apiData)
    })
    
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

  compareDate(a,b) {
    const dateA = a.fulldate,
          dateB = b.fulldate
    let comparison = 1
    if(dateA < dateB)
      comparison = -1

    // console.log(comparison, dateA, dateB)
    return comparison
  }

  loadGraph() {
    let totalWidth = this.width + this.margin.left + this.margin.right,
        totalHeight = this.height + this.margin.top + this.margin.bottom

    // append width, height to the svg object
    // appends a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    let svg = this.svg
      .attr("width", totalWidth)
      .attr("height", totalHeight)
      .append('g')
      .attr("transform", "translate(" 
            + this.margin.left + "," + this.margin.top
            + ")");
    
    let maxHeight = 250;
    let yScale = this.d3.scaleLinear()
      .domain([0, this.height])
      .range([0, maxHeight])
    // console.log('maxHeight, this.height', maxHeight, this.height)
    // console.log('yScale(100)', yScale(100))
    // console.log('yScale(200)', yScale(200))
    // console.log('yScale(300)', yScale(300))

    let xScale = this.d3.scaleLinear()
      .domain([0, this.apiData.length])
      .range([0, this.width])

    // let g = svg.select('g')
    // g.selectAll('rect')
    // var arr = [10, 8, 40, 34, 52, 45, 33, 75];
    console.log(this.apiData)

    // let data = this.apiData//arr
    let data2 = this.apiData.map((d) => d[1])
    let data = this.apiData// data2[1]
    // console.log(data)
    svg
    .selectAll("rect")
    // .data(data)
    .data(data)
    .enter()
    .append('rect')
    .attrs({
      width: this.width / data.length,
      height: (d) => {
        let res = yScale(d[1])// 20// yScale(d)
        console.log(res)
        return res
      },
      x: (d,i) => { 
        let res = i * this.width/data.length
        console.log(res, data.length)
        return res
      },
      y: (d) => {
        // d = d[1]
        // console.log(d)
        let res = this.height - yScale(d[1])
        let d1 = d,
            d2 = yScale(d.price)
        // console.log(res)//,d1, d2, d.price)
        return res;
      } 
    })
    .style('fill', 'red')
    .style('stroke', 'black')
    .style('stroke-width', '2px')
    
// .attrs({
    //   width: this.width / this.apiData.length,
    //   height: (d) => yScale(d),
    //   x: (d,i) => { 
    //     return i * this.width/this.apiData.length
    //   },
    //   y: (d) => this.height - yScale(d)
    // })

    // svg
    // .selectAll("rect")
    // .data(arr)
    // // .data(this.apiData)
    // .enter()
    // .append('rect')
    // .attrs({
    //   width: this.width / arr.length,
    //   height: (d) => yScale(d),
    //   x: (d,i) => { 
    //     return i * this.width/arr.length
    //   },
    //   y: (d) => this.height - yScale(d)
    // })

    
    svg
    .selectAll("rect")
    // .data(data)
    .data(data)
    .exit()
    .remove()

  }

  loadD3() {
    let d3 = this.d3;
    let d3ParentElement: Selection < any, any, any, any > ;
    if (this.parentNativeElement !== null) {
      this.parent = d3.select(this.parentNativeElement);
      let data = this.apiData
    }
  }

}
