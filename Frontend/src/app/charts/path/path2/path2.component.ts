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
  private margin: any //= 30;
    = { top: 100, right: 20, bottom: 100, left: 100 }
  private width = 600 - this.margin.left - this.margin.right
  private height = 400 - this.margin.top - this.margin.bottom;

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
    let svg = d3.select(element).append('svg')
      .attr('width', this.width)
      .attr('height', this.height)

    // chart plot area
    this.chart = svg.append('g')
      .attr('class', 'path')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);
    
    // parse the date / time
    let parseTime = d3.timeParse("%d-%b-%y");

    // set the ranges
    let x = d3.scaleTime().range([0, this.width]);
    let y = d3.scaleLinear().range([this.height, 0]);

    // define the line
    let valueline = d3.line()
      .x(function(d:any) { return x(d.date); })
      .y(function(d:any) { return y(d.close); });

    // format the data
    this.data.forEach(d => {
      d.date = parseTime(d.date)
      d.close = +d.close
    });

    // Scale the range of the data
    x.domain(d3.extent(this.data, (d) => d.date ));
    y.domain([0, d3.max(this.data, (d) => d.close )]);

    // Add the valueline path.
    svg.append("path")
      .data([this.data])
      .attr("class", "line")
      .attr("d", valueline);

      // Add the X Axis
    svg.append("g")
      .attr("transform", "translate(0," + this.height + ")")
      .call(d3.axisBottom(x));

    // Add the Y Axis
    svg.append("g")
      .call(d3.axisLeft(y));


  }

  updateChart() {
    //
  }

}
