import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'progress-path',
  templateUrl: './progress-path.component.html',
  styleUrls: ['./progress-path.component.css']
})
export class ProgressPathComponent implements OnInit {
  @ViewChild('chart') private chartContainer: ElementRef;
  @Input() private data: Array<any>;
  
  private chart: any;
  private margin = { top: 50, right: 100, bottom: 50, left: 50 }
  private width
  private height
  private curve
  private xScale
  private yScale
  private xAxis
  private yAxis

  // hard-coded so far => ultimately from data
  typeNames = [
    'na mieście',
    'spożywka',
    'opłaty',
    'pierdoły',
    "a co!"
  ]
  // typeName = this.typeNames

  constructor() { }

  ngOnInit() {
    console.log('data exist in progress-path!', this.data)
    this.initCurve()
    this.createChart();
    if (this.data) {
      this.updateChart();
    }
  }

  ngOnChanges() {
    if (this.chart) {
      this.updateChart();
    }
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

    // console.log('element.offsetWidth, element.offsetHeight', element.offsetWidth, element.offsetHeight)
    // console.log('this.width, this.height', this.width, this.height)

    // chart plot area
    this.chart = svg.append('g')
      .attr('class', 'path')
      .attr('transform', 
            `translate(${this.margin.left}, ${this.margin.top})`);
    
    // format the data
    // this.data.forEach((d,i) => {
    //   console.log(`d${i}`, d)
    // });

    // define X & Y domains
    let xDomain = d3.extent(this.data, (d) => d.week )
    let yDomain = [
      0, 
      d3.max(this.data, d => +d3.max(d.groups, (g:any) => g.sum))
    ];
    // console.log('xDomain, yDomain', xDomain, yDomain)


    //#region create scales -------- which one to choose? ------
    
    // & Scale the range of the data
    this.xScale = d3
      .scaleLinear()
      // .scaleTime()
      // .scaleIdentity()
      // .scaleSequential()
      .nice()
      .range([0, this.width])
      .domain(xDomain)
      

    this.yScale = d3.scaleLinear()
      .range([this.height, 0])
      .domain(yDomain)
      // .domain([
      //   0, 
      //   d3.max(this.data, d => +d3.max(d.groups, (g:any) => g.sum))
      // ])
    // this.xScale = d3.scaleBand().padding(0.1)
    //   .domain(xDomain)
    //   .rangeRound([0, this.width]);
    // this.yScale = d3.scaleLinear()
    //   .domain(yDomain)
    //   .range([this.height, 0]);
    //#endregion

    //#region define the lines
    let yLabelValue = []
    let valueline = d3.line()
      .curve(this.curve)
      .x((d:any) => this.xScale(d.week))
      .y((d:any) => {
        let property = d.groups
          .filter(g => g.type == this.typeNames[0])
          console.log('d.groups', d.groups)
        console.log('property', property)
        // last Y valueline value
        let value = property.length !== 0 
          ? property[0].sum
          : 0

        yLabelValue = [{ 
          type: this.typeNames[0],
          v: value
        }]
        return this.yScale(value)
      })
    
    // another valuelines...
    // let valueline2 = d3.line()
    //   .curve(this.curve)
    //   .x((d:any) => x(d.week))
    //   .y((d:any) => {
    //     let property = d.groups
    //       .filter(
    //         g => g.type == this.typeNames[1])
    //     let result = y(property[0].sum)
    //     _vals[1] = property[0].sum
    //     yVal.push(property[0].sum)
    //     return result
    //   })

    //#endregion

    //#region Add the valueline paths.
    this.chart.append("path")
      .data([this.data])
      .attr("class", "line1")
      .attr("d", valueline);

    // next lines...
    // this.chart.append("path")
    //   .data([this.data])
    //   .attr("class", "line2")
    //   .attr("d", valueline2);
    //#endregion

    //#region lines labels
    let lineSpan = 3,
        _d = this.data,
        _x = +_d[_d.length - 1].week,
        xValue = this.xScale(_x) + lineSpan,
        yValue = this.yScale(yLabelValue[0].v)

    this.chart
      .append("text")
      .data([this.data])
      .attrs({
        transform: `translate(${xValue},${yValue})`,    
        dy: '.35em',
        'text-anchor': 'start'
      })
      .style("fill", "steelblue")
      .text(d => {
        let result = d[0].groups.filter(
          g => g.type == this.typeNames[0])
        return result[0].type
      })

    // next charts....
    // this.chart
    //   .append("text")
    //   .data([this.data])
    //   .attrs({
    //     transform: `translate(
    //       ${x(_x) + lineSpan},
    //       ${y(yLabelValue[2])}
    //     )`,    
    //     dy: '.35em',
    //     'text-anchor': 'start'
    //   })
    //   .style("fill", "red")
    //   .text(d => {
    //     let result = d[0].groups.filter(g => g.type == this.typeNames[1])
    //     return result[0].type
    //   })
    //#endregion 

    //#region x & y axis
    this.xAxis = svg.append('g')
      .attr('class', 'axis axis-x')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top + this.height})`)
      
      // --> decide which scale function depending on type of chart <--
      // .call(d3.axisBottom(x))
      .call(
        d3.axisBottom(this.xScale)
        .ticks(this.data.length)
      )

    this.yAxis = svg.append('g')
      .attr('class', 'axis axis-y')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`)

      // --> decide which scale function depending on type of chart <--
      // .call(d3.axisLeft(y))
      .call(d3.axisLeft(this.yScale))
    // #endregion
    
    //#region the areas
    /*
    let area1 = d3.area()
        .curve(this.curve)
        .x((d:any) => x(d.week))
        .y0(this.height)
        .y1((d:any) => {
          let prop = d.groups.filter(g => g.type == this.typeNames[1])
          let result = y(prop[0].sum)
          return result
        })
    let area2 = d3.area()
        .curve(this.curve)
        .x((d:any) => x(d.week))
        .y0(this.height)
        .y1((d:any) => {
          let prop = d.groups.filter(g => g.type == this.typeNames[2])
          let result = y(prop[0].sum)
          return result
        })
        */
    //#endregion

    // parse the datetime ??? in any case. 
    let parseTime = d3.timeParse("%d-%b-%y");
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
    this.curve = curves[6]
  }

  updateChart() {

  }

}
