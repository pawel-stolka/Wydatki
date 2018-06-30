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

    let colors = ["red", "orange", "green"]

    // var arcData = [
    //     {startAngle: 0, endAngle: ln(0.4), label: 'One'},
    //     {startAngle: ln(0.4), endAngle: ln(0.7), label: 'Two'},
    //     {startAngle: ln(0.7), endAngle: ln(), label: 'Three'}
    //   ];
    let arcData = []

    let parts = [.33, .45, 1].sort()

    for (var i = 0; i < parts.length; i++) {
      let el = parts[i],
          start,
          data = {}

      if(i==0) {
        data = { startAngle: 0, endAngle: ln(el) }
      }
      if(i>0){
        data = { startAngle: ln(el), endAngle: ln(parts[i-1]) }
      } 
      data.label = colors[i]
      let percentage = null
      data.perc = el.toString().substr(2)
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
        fill: (d,i) => colors[i]
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
      .text((d: any) => `${d.label} ${d.perc}%`)
  }

  updatePie() {
    //
  }


}
