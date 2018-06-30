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
    this.width = element.offsetWidth - 2 * this.margin.top;
    this.height = 500//element.offsetHeight - this.margin.top;
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
      `translate(${this.width/2}, 150)`);

    let arcGenerator = d3.arc()
      .cornerRadius(5)
    let pathData = arcGenerator({
      startAngle: 0,
      endAngle: 1.2 * Math.PI,
      innerRadius: 50,
      outerRadius: 150
    })
    let pathData2 = arcGenerator({
      startAngle: 1.2 * Math.PI,
      endAngle: 2 * Math.PI,
      innerRadius: 50,
      outerRadius: 150
    })
    console.log(pathData)

    // let arc = d3.arc()
    //   .innerRadius(180)
    //   .outerRadius(240)
    //   .startAngle(0);
    // // let arc = d3.arc()
    // //   .innerRadius(0)
    // //   .outerRadius(this.radius)
    // console.log(arc)

    let pie = d3.pie()
      .value((d:any) => d.value)
      .sort(null)

    var arcData = [
        {startAngle: 0, endAngle: 0.2},
        {startAngle: 0.2, endAngle: 0.6},
        {startAngle: 0.6, endAngle: 1.4},
        {startAngle: 1.4, endAngle: 3},
        {startAngle: 3, endAngle: 2* Math.PI}
      ];

    let path = g.selectAll('path')
      .data(arcData)
      .enter()
      .append('g')
      .append('path')
      .attrs({
        d: pathData,
        fill: "orange"
      })

      // let path2 = g.selectAll('path')
      // .data(pie(this.data))
      // .enter()
      // .append('g')
      // .append('path')
      // .attrs({
      //   d: pathData2,
      //   fill: "red"
      // })
  }

  updatePie() {
    //
  }


}
