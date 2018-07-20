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

  curve
  
  constructor() { }

  ngOnInit() {
    console.log('data exist!', this.data)
    this.initCurve()
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

  initCurve() {
    let curves = [
      d3.curveBasis,
      d3.curveStep,
      d3.curveBasisOpen,
      d3.curveBundle,
      d3.curveCardinal,
      d3.curveMonotoneX,
      d3.curveCatmullRom,
    ]
    this.curve = curves[0]
  }

  createChart() {
    let element = this.chartContainer.nativeElement;
    this.width = element.offsetWidth - (2*this.margin);
    this.height = element.offsetHeight - (2*this.margin)
    let svg = d3.select(element)
      .append('svg')
      .attr('width', element.offsetWidth)
      .attr('height', element.offsetHeight)

    // chart plot area
    this.chart = svg.append('g')
      .attr('class', 'path')
      .attr('transform', 
            `translate(${this.margin}, ${this.margin})`);
    
    // parse the date / time
    let parseTime = d3.timeParse("%d-%b-%y");

    // define the areas
    let area1 = d3.area()
        .curve(this.curve)
        .x((d:any) => x(d.date))
        .y0(this.height-50)
        .y1((d:any) => y(d.close))
    let area2 = d3.area()
        .curve(this.curve)
        .x((d:any) => x(d.date))
        .y0(this.height-50)
        .y1((d:any) => y(d.open))
    let area3 = d3.area()
        .curve(this.curve)
        .x((d:any) => x(d.date))
        .y0(this.height-50)
        .y1((d:any) => y(d.other))
    let area4 = d3.area()
        .curve(this.curve)
        .x((d:any) => x(d.date))
        .y0(this.height-50)
        .y1((d:any) => y(d.sum))

        
    // define the lines
    let valueline = d3.line()
      .curve(this.curve)
      .x((d:any) => x(d.date))
      .y((d:any) => y(d.close))
    let valueline2 = d3.line()
      .curve(this.curve)
      .x((d:any) => x(d.date))
      .y((d:any) => y(d.open));
    let valueline3 = d3.line()
      .curve(this.curve)
      .x((d:any) => x(d.date))
      .y((d:any) => y(d.other));
    let valueline4 = d3.line()
      .curve(this.curve)
      .x((d:any) => x(d.date))
      .y((d:any) => y(d.sum));

    // format the data
    this.data.forEach(d => {
      d.date = parseTime(d.date)
      d.close = +d.close
      d.open = +d.open
      d.other = +d.other
      d.sum = d.open + d.other
    });

    // set the ranges
    // & Scale the range of the data
    let x = d3.scaleTime()
      .range([0, this.width])
      .domain(d3.extent(this.data, (d) => d.date ));
    let y = d3.scaleLinear()
      .range([this.height-50, 0])
      .domain([0, d3.max(this.data, 
          (d) => Math.max(d.close, d.open, d.other, d.sum) )]);
    
    // add the areas
    this.chart.append("path")
      .data([this.data])
      .attr("class", "area1")
      .attr("d", area1);
    this.chart.append("path")
      .data([this.data])
      .attr("class", "area2")
      .attr("d", area2);
    this.chart.append("path")
      .data([this.data])
      .attr("class", "area3")
      .attr("d", area3);
    this.chart.append("path")
      .data([this.data])
      .attr("class", "area4")
      .attr("d", area4);
    
    // Add the valueline paths.
    this.chart.append("path")
      .data([this.data])
      .attr("class", "line")
      .attr("d", valueline);
    this.chart.append("path")
      .data([this.data])
      .attr("class", "line")
      .style("stroke", "red")
      .attr("d", valueline2);
    this.chart.append("path")
      .data([this.data])
      .attr("class", "line")
      .style("stroke", "green")
      .attr("d", valueline3);
    this.chart.append("path")
      .data([this.data])
      .attr("class", "line")
      .style("stroke", "yellow")
      .attr("d", valueline4);

    // Add the X Axis
    this.chart.append("g")
      .attr('class','axis')
      .attr("transform", 
        `translate(0, ${this.height - this.margin/2})`)
      .call(d3.axisBottom(x)
              .tickFormat(d3.timeFormat("%m-%d")))
      .selectAll("text")	
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-65)")
              // .ticks(d3.timeDay.every(7)))
              // .ticks(5));

    // Add the Y Axis
    this.chart.append("g")
      .attr('class', 'axis axis-x')
      .call(d3.axisLeft(y));

    // axis labels
    this.chart.append("text")   
      .attrs({
        transform: `translate(
          ${this.width / 2},
          ${this.height + this.margin - 100}
        )`
      })          
      // .attrs({
      //   x: this.width / 2,
      //   y: this.height + this.margin + 20
      // })
      .style("text-anchor", "middle")
      .text("Date");

    this.chart.append('text')
      .attrs({
        transform: 'rotate(-90)',
        x: 0 - this.margin/2,
        y: 0 - (this.height/4),
        dy: '1em'
      })
      .text('Value')
  }

  updateChart() {
    //
  }

}
