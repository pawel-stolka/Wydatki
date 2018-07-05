import { Component, OnInit, ViewChild, Input, ElementRef } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'pie3',
  templateUrl: './pie3.component.html',
  styleUrls: ['./pie3.component.css']
})
export class Pie3Component implements OnInit {
  @ViewChild('pie') private pieContainer: ElementRef;
  @Input() private data: Array<any>;

  private pie: any;
  private margin: any = {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    }
  private width;
  private height;
  private radius;

  constructor() {}

  ngOnInit() {
    this.createPie();
    console.log(this.data)
    if (this.data) {
      this.updatePie();
    }
  }

  ngOnChanges() {
    if (this.pie) {
      this.updatePie();
    }
  }

  createPie() {
    let element = this.pieContainer.nativeElement;
    // element.offsetHeight = 500
    this.width = 300// element.offsetWidth - 2 * this.margin.top;
    this.height = 300// element.offsetHeight;
    this.radius = this.height / 2
    console.log(element)
    let svg = d3.select(element)
      .append('svg')
      .attrs({
        class: 'pie',
        width: this.width,// element.offsetWidth,
        height: this.height// element.offsetHeight
      })


    console.log('pie')
    // chart plot area
    let g = svg.append('g')
      .attrs({
        transform: 
        // `translate(${this.width/2}, ${this.height/4})`,
        `translate(130, 130)`,
        class: 'mainCircle'
      });

    let arcGenerator = d3.arc()
      .innerRadius(30)
      .outerRadius(100)
      .padAngle(.03)
      .padRadius(100)
      .cornerRadius(5)

    function ln(factor = 1) {
      return factor * 2 * Math.PI
    }

    let arcData = []

    let parts = [.23, .34, .65, 1];
    let _letters = 'abcdefghijklmnopqrstuvwxyz'
    let names = _letters.split('')

    let colorDef = ["orange", "red"]
    let colors = // ["red", "orange", "green"]
      d3.scaleLinear()
      .domain([0, parts.length])
      .range( < any[] > colorDef) //['yellow', 'blue']);

    for (var i = 0; i < parts.length; i++) {
      let data = {},
          color = colors(i),
          p0 = parts[i],
          p1 = 0,
          startAngle = 0,
          endAngle = ln(p0)

      if (i > 0) {
        p1 = parts[i-1],
        startAngle = ln(p0)
        endAngle = ln(p1)
      }

      let p = ((p0 - p1) * 100).toString(),
          factor = parseFloat(p).toFixed(0)

      data = {
        startAngle,
        endAngle,
        label: names[i],
        percentage: factor
      }

      arcData.push(data)
    }

    let path = g.selectAll('path')
      .data(arcData)
      .enter()
      .append('g')
      .attrs({
        class: 'cakeBit'
      })
      // .append('text')
      .append('path')
      .attrs({
        d: arcGenerator,
        fill: (d, i) => colors(i)
      })

      // let g = svg.append('g')
      // .attrs({
      //   transform: `
      //     translate(${this.width/2}, ${this.height/2})
      //     `,
      //   class: 'mainCircle'
      // });

    let legend = ['aaa','ttt']
    let gTest = svg
      .append('g')
      .attrs({
        class: 'test'
      })
      .selectAll('test')
      .data(legend)
      .enter()
    
    g.selectAll('cakeBit')
    // .selectAll('text')
      .data(arcData)
      .enter()
      .append('text')
      .attrs({
        x: (d: any) => arcGenerator.centroid(d)[0],
        y: (d: any) => arcGenerator.centroid(d)[1],
        // dy: '.35em',
        'text-anchor': 'middle',
        fill: 'white'
      })
      .text((d: any) => 
        `${d.label} ${d.percentage}%`
      )
    /*
    path
      .on('mouseenter', (data) => {
        console.log('enter', data)
        // this.currData.push(data)
        // console.log('this.currData', this.currData)
        gTest
          .append('text')
          .attr('class','textItem')
          // .text(d => d)
          .attrs({
            x: (d: any) => 20,
            y: (d, i: any) => i * 20 + 20,
            // dy: '.35em',
            'text-anchor': 'start',
            fill: 'blue'
          })
          .text(d => d)

      })
      .on('mouseout', (data) => {
        console.log('out', data)
        // console.log('this.currData', this.currData)
        
      })
*/
    this.test()
  }
  currData: any[] = []

  test() {
    let element = this.pieContainer.nativeElement;
    let svg = d3.select(element)

    this.test3 = svg
    .append('g')

    let en = svg.selectAll('#en')
    console.log(en)
   
  }
test3

  enter() {
    let myData = ['A', 'B', 'C', 'D', 'E'];
    
        this.test3.selectAll('div')
          .data(myData)
          .enter()
          .append('div')
          .text(d => d)
          .attrs({
            class: 'test2'
          })
  }

  exit() {
    let myData = ['A', 'B', 'C'];

    this.test3.selectAll('div')
    .data(myData)
    .exit()
    .remove()
  }

  updatePie() {
    //
  }

}
