import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.css']
})
export class PieComponent implements OnInit {
  @ViewChild('pie') private pieContainer: ElementRef;
  @Input() private data: Array<any>;
  
  private pie: any;
  private margin: any //= 30;
    = { top: 50, right: 20, bottom: 100, left: 50 }
  private width;
  private height;
  private radius;

  constructor() { }

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
    this.width = element.offsetWidth - 2 * this.margin.top;
    this.height = element.offsetHeight;
    this.radius = this.height/2
    console.log(element)
    let svg = d3.select(element)
      .append('svg')
      .attrs({
        class: 'pie',
        width: element.offsetWidth,
        height: element.offsetHeight
      })
    

    console.log('pie')
    // chart plot area
    let g = svg.append('g')
      .attr('transform', 
      `translate(${this.width/2}, ${this.height/2})`);

    let arcGenerator = d3.arc()
      .innerRadius(75)
      .outerRadius(150)
      .padAngle(.03)
      .padRadius(100)
      .cornerRadius(5)

    function ln(factor = 1) {
      return factor * 2 * Math.PI
    }

    

    // var arcData = [
    //     {startAngle: 0, endAngle: ln(0.4), label: 'One'},
    //     {startAngle: ln(0.4), endAngle: ln(0.7), label: 'Two'},
    //     {startAngle: ln(0.7), endAngle: ln(), label: 'Three'}
    //   ];
    let arcData = []

    let parts = [.15, .75, 1]//.sort()
    let colorDef = ["red", "orange", "green"]
    let colors //= ["red", "orange", "green"]
        = d3.scaleLinear()
      .domain([0, parts.length])
      .range(<any[]> colorDef)//['yellow', 'blue']);

    for (var i = 0; i < parts.length; i++) {
      let //el = parts[i],
          // start,
          data = {}

      if(i==0) {
        let factor = parseFloat((parts[i]*100)
          .toString())
          .toFixed(0)
        // console.log('factor', factor)
        // let factor = parts[i]
        let p = parts[i]
        let perc = p.toString().substr(2)
        let color =  colors(i)
        data = { 
          startAngle: 0, 
          endAngle: ln(parts[i]),
          label: color,
          percentage: factor
        }
      }
      if(i>0){
        let factor = parseFloat(((parts[i] - parts[i-1])*100)
          .toString())
          .toFixed(0)
        // console.log('factor', factor.toFixed(1))
        let color =  colors(i)
        data = { 
          startAngle: ln(parts[i]), 
          endAngle: ln(parts[i-1]),
          label: color,
          percentage: factor// parts[i].toString().substr(2)
        }
      } 
      // data.label = colors[i]
      // let percentage = null
      // data.percentage = parts[i].toString().substr(2)
      arcData.push(data)
    }
    // console.log(arcData)
    // parts.forEach(element => {
    //   console.log('part', element)
    //   // let data = {startAngle: element}
    //   // arcData.push()
    // });

    let path = g.selectAll('path')
      .data(arcData)
      .enter()
      .append('g')
      .append('path')
      .attrs({
        d: arcGenerator,
        fill: (d,i) => {
          let c = colors(i)
          console.log(c)
          return c
        }
      })
    // d3.selectAll('g')
    g
      .selectAll('text')
      .data(arcData)
      .enter()
      .append('text')
      .attrs({
        x: (d:any) => arcGenerator.centroid(d)[0],
        y: (d:any) => arcGenerator.centroid(d)[1],
        'text-anchor': 'middle',
        fill: 'white'
      })
      .text((d: any) => `${d.label} ${d.percentage}%`)
  }

  updatePie() {
    //
  }


}
