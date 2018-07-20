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
  private margin: any //= 100;
    = { top: 50, right: 80, bottom: 100, left: 80 }
  private width 
  private height 
  
  private curve
  private xScale
  private yScale
  private colors
  private xAxis
  private yAxis

  
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
    this.width = element.offsetWidth - this.margin.left - this.margin.right;
    this.height = element.offsetHeight - this.margin.top - this.margin.bottom
    let svg = d3.select(element)
      .append('svg')
      .attr('class', 'svg')
      .attr('width', element.offsetWidth)
      .attr('height', element.offsetHeight)

    console.log('this.width, this.height', this.width, this.height)
    console.log('element.offsetWidth, element.offsetHeight', element.offsetWidth, element.offsetHeight)

    // chart plot area
    this.chart = svg.append('g')
      .attr('class', 'path')
      .attr('transform', 
            `translate(${this.margin.left}, ${this.margin.top})`);
    
             
    // parse the date / time
    let parseTime = d3.timeParse("%d-%b-%y");

    //#region define the areas
    let area1 = d3.area()
        .curve(this.curve)
        .x((d:any) => x(d.date))
        .y0(this.height)
        .y1((d:any) => y(d.close))
    let area2 = d3.area()
        .curve(this.curve)
        .x((d:any) => x(d.date))
        .y0(this.height)
        .y1((d:any) => y(d.open))
    let area3 = d3.area()
        .curve(this.curve)
        .x((d:any) => x(d.date))
        .y0(this.height)
        .y1((d:any) => y(d.other))
    //#endregion

    //#region define the lines
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
    //#endregion

    // format the data
    this.data.forEach(d => {
      d.date = parseTime(d.date)
      d.close = +d.close
      d.open = +d.open
      d.other = +d.other
    });
      
    // set the ranges
    // & Scale the range of the data
    let x = d3.scaleTime()
      .range([0, this.width])
      .domain(d3.extent(this.data, (d) => d.date ));
    let y = d3.scaleLinear()
      .range([this.height, 0])
      .domain([0, d3.max(this.data, 
          (d) => Math.max(d.close, d.open, d.other) )]);
    
    //#region commented GRIDLINES
    // add the X gridlines
    // this.chart.append("g")			
    // .attr("class", "grid")
    // .attr("transform", "translate(0," + this.height + ")")
    // .call(make_x_gridlines()
    //     .tickSize(-this.height)
    //     .tickFormat(null)
    // )

    // // add the Y gridlines
    // this.chart.append("g")			
    //   .attr("class", "grid")
    //   .call(make_y_gridlines()
    //       .tickSize(-this.width)
    //       .tickFormat(null)
    //   )
    //#endregion

    //#region add the areas
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
    //#endregion

    //#region Add the valueline paths.
    this.chart.append("path")
      .data([this.data])
      .attr("class", "line1")
      .attr("d", valueline);
    this.chart.append("path")
      .data([this.data])
      .attr("class", "line2")
      .attr("d", valueline2);
    this.chart.append("path")
      .data([this.data])
      .attr("class", "line3")
      .attr("d", valueline3);
    //#endregion

    //#region Add the X Axis
    this.chart.append("g")
      .attr('class','axis')
      .attr('transform', `translate(0,  ${this.height})`)
      .call(d3.axisBottom(x)
              .tickFormat(d3.timeFormat("%m-%d")))
      .selectAll("text")	
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-65)")
              // .ticks(d3.timeDay.every(7)))
              // .ticks(5));
    //#endregion

    //#region Add the Y Axis
    this.chart.append("g")
      .attr('class', 'axis axis-x')
      .call(d3.axisLeft(y));
    //#endregion

    //#region axis labels
    this.chart.append("text")   
      .attrs({
        transform: `translate(
          ${this.width / 2},
          ${this.height + 70}
        )`
      })          
      .style("text-anchor", "middle")
      .text("Date");
      
    this.chart.append('text')
      .attrs({
        transform: 'rotate(-90)',
        x: - (this.height/2),
        y: - this.margin.left*3/4,
        dy: '1em',
      })
      .text('Value')
    //#endregion

    //#region lines labels
    let lineSpan = this.width + 3

    this.chart.append("text")
      .attrs({
        transform: `translate(${lineSpan},${y(this.data[0].close)})`,    
        dy: '.35em',
        'text-anchor': 'start'
      })
      .style("fill", "steelblue")
      .text("Close");

    this.chart.append("text")
      .attrs({
        transform: `translate(${lineSpan},${y(this.data[0].open)})`,
        dy: '.35em',
        'text-anchor': 'start'
      })
      .style("fill", "red")
      .text("Open");

    this.chart.append("text")
    .attrs({
        transform: `translate(${lineSpan},${y(this.data[0].other)})`,
        dy: '.35em',
        'text-anchor': 'start'
      })
      .style("fill", "green")
      .text("Other");
    //#endregion 


    // gridlines in x axis function
    function make_x_gridlines() {		
      return d3.axisBottom(x)
        .ticks(5)
    }
    

    // gridlines in y axis function
    function make_y_gridlines() {		
      return d3.axisLeft(y)
        .ticks(5)
    }

  }

  updateChart() {
    //
  }

}
