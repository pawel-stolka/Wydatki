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
  private radius;
  private innerRadius = 50
  private outerRadius = 100
  private padAngle = .03
  private padRadius = 100
  private cornerRadius = 5

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
    this.radius = this.height / 2
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

    let arcGenerator = d3.arc()
      .innerRadius(this.innerRadius)
      .outerRadius(this.outerRadius)
      .padAngle(this.padAngle)
      .padRadius(this.padRadius)
      .cornerRadius(this.cornerRadius)

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
        d: arcGenerator,
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
        fill: 'white'
      })
      .text((d: any) => 
        `${d.label} ${d.percentage}%`
      )

    function ln(factor = 1) {
      return factor * 2 * Math.PI
    }
  }

  updatePie() {
    //
  }

}
