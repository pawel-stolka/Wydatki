import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'path2',
  templateUrl: './path2.component.html',
  styleUrls: ['./path2.component.css']
})
export class Path2Component implements OnInit {
  @ViewChild('chart') private chartContainer: ElementRef;
  @Input() private data: Array<any>;
  private chart: any;
  private margin: any = 100;
    // = { top: 50, right: 20, bottom: 50, left: 100 }
  private width = 600 //- (2*this.margin)
  private height = 400 //- (2*this.margin)

  private xScale
  private yScale
  private colors
  private xAxis
  private yAxis
  
  constructor() { }

  ngOnInit() {
    console.log('data exist!', this.data)
    this.createChart();
    if (this.data) {
      this.updateChart();
    }
  }

  ngOnChanges() {
    if (this.chart) {
      console.log('this.updateChart')
      this.updateChart();
    }
  }

  createChart() {
    let element = this.chartContainer.nativeElement;
    this.width = element.offsetWidth - (2*this.margin);
    this.height = element.offsetHeight - (2*this.margin)
    let svg = d3.select(element)
      .append('svg')
      .attr('width', element.offsetWidth)//this.width)// + (2*this.margin))
      .attr('height', element.offsetHeight)//this.height)// + (2*this.margin))

    // chart plot area
    this.chart = svg.append('g')
      .attr('class', 'path')
      .attr('transform', 
            `translate(${this.margin}, ${this.margin})`);
    
    // parse the date / time
    let parseTime = d3.timeParse("%d-%b-%y");

    // define the line
    let valueline = d3.line()
      .x((d:any) => x(d.date))
      .y((d:any) => y(d.close));

    // format the data
    this.data.forEach(d => {
      d.date = parseTime(d.date)
      d.close = +d.close
    });

    // set the ranges
    // & Scale the range of the data
    let x = d3.scaleTime()
      .range([0, this.width])
      .domain(d3.extent(this.data, (d) => d.date ));
    let y = d3.scaleLinear()
      .range([this.height-50, 0])
      .domain([0, d3.max(this.data, (d) => d.close )]);
    
    // Add the valueline path.
    this.chart.append("path")
      .data([this.data])
      .attr("class", "line")
      .attr("d", valueline);

      // Add the X Axis
    this.chart.append("g")
      .attr("transform", 
        `translate(0, ${this.height - this.margin/2})`)
      .call(d3.axisBottom(x));

    // Add the Y Axis
    this.chart.append("g")
      .call(d3.axisLeft(y));
  }

  updateChart() {
    //
  }

}