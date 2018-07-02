import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'pie2',
  templateUrl: './pie2.component.html',
  styleUrls: ['./pie2.component.css']
})
export class Pie2Component implements OnInit {
  @ViewChild('pie') private pieContainer: ElementRef;
  @Input() private data: Array<any>;
  private pie: any;
  private margin: any = {
      top: 0,
      right: 20,
      bottom: 100,
      left: 50
    }
  private width;
  private height;
  private circle1 = {
    outerRadius: 70,
    innerRadius: 50,
    padAngle: .03,
    padRadius: 100,
    cornerRadius: 5,
  }
  private circle2 = {
    outerRadius: 70,
    innerRadius: 60,
    padAngle: 0,
    padRadius: 100,
    cornerRadius: 0
  }
  private percents2 = [.34]

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
    this.width = element.offsetWidth// - 2 * this.margin.top;
    this.height = element.offsetHeight;
    let svg = d3.select(element)
      .append('svg')
      .attrs({
        class: 'pie',
        width: element.offsetWidth,
        height: element.offsetHeight
      })

    let g = svg.append('g')
      .attrs({
        transform: `
          translate(${this.width/2}, ${this.height/2})
          `,
        class: 'mainCircle'
      });
      // -----group circle -------
/*
    let arcGenerator = d3.arc()
      .innerRadius(this.circle1.innerRadius)
      .outerRadius(this.circle1.outerRadius)
      .padAngle(this.circle1.padAngle)
      .padRadius(this.circle1.padRadius)
      .cornerRadius(this.circle1.cornerRadius)

    let arcData = []
      
    let parts = [.23, .34, .65, 1];
    let _letters = 'abcdefghijklmnopqrstuvwxyz'
    let names = _letters.split('')
      
    let colorDef = ["orange", "red"]
    let colors = // ["red", "orange", "green"]
      d3.scaleLinear()
      .domain([0, parts.length])
      .range( < any[] > colorDef)

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
    console.log('arcData', arcData)
  
    let path = g.selectAll('path')
      .data(arcData)
      .enter()
      .append('g')
      .attrs({class: 'cakeBit'})
      .append('path')
      .attrs({
        d: <any>arcGenerator,
        fill: (d, i) => colors(i)
      })
    
    g.selectAll('cakeBit')
      .data(arcData)
      .enter()
      .append('text')
      .attrs({
        x: (d: any) => arcGenerator.centroid(d)[0],
        y: (d: any) => arcGenerator.centroid(d)[1],
        'text-anchor': 'middle',
        fill: 'black'
      })
      .text((d: any) => 
        `${d.label} ${d.percentage}%`
      )
*/
    // ----- total circle -------
    let arcGenerator2 = d3.arc()
      .innerRadius(this.circle2.innerRadius)
      .outerRadius(this.circle2.outerRadius)
      .padAngle(this.circle2.padAngle)
      .padRadius(this.circle2.padRadius)
      .cornerRadius(this.circle2.cornerRadius)

    // let colors2 = "red"
    let colorDef2 = ["red", "#ead0d2"]
    let colors2 = // ["red", "orange", "green"]
      d3.scaleLinear()
      .domain([0, 2])
      .range(<any[]> colorDef2)

    
    let percent = this.percents2[0]
    let arcData2 = [
      {
          startAngle: 0,
          endAngle: ln(percent),
          label: 'test',
          percentage: percent*100
      },
      {
        startAngle: ln(percent),
        endAngle: ln(1),
        // label: 'test',
        // percentage: 100
      }
    ]

    
    let path2 = g.selectAll('path')
    .data(arcData2)
    .enter()
    .append('g')
    .attrs({class: 'cakeBit'})
    .append('path')
    .attrs({
      d: <any>arcGenerator2,
      fill: (d, i) => colors2(i)
    })

    
      
    g.selectAll('cakeBit')
      .data(arcData2)
      .enter()
      .append('text')
      .attrs({
        x:  0,
        y:  0,
        'text-anchor': 'middle',
        fill: 'black'
      })
      .html(tip(arcData2))

    function tip(data) {
      let tip = `
      <tspan x="0" dy="-.2em">${data[0].label}</tspan>
      <tspan x="0" dy="1em">${data[0].percentage}</tspan>
      `
      return tip
    }

    function ln(factor = 1) {
      return factor * 2 * Math.PI
    }
  }

  updatePie() {
    //
  }

}
