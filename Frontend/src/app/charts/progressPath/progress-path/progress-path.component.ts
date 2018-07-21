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
    'opłaty'
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
    this.data.forEach((d,i) => {
      console.log(`d${i}`, d)
    });

    // define X & Y domains
    let xDomain = this.data.map(d => d.week);
    let yDomain = [
      0, 
      d3.max(this.data, d => +d3.max(d.groups, (g:any) => g.sum))
    ];
    console.log('xDomain, yDomain', xDomain, yDomain)


    //#region create scales -------- which one to choose? ------
    this.xScale = d3.scaleBand().padding(0.1)
      .domain(xDomain)
      .rangeRound([0, this.width]);
    this.yScale = d3.scaleLinear()
      .domain(yDomain)
      .range([this.height, 0]);

    // set the ranges
    // & Scale the range of the data
    let x = d3
      .scaleLinear()
      // .scaleTime()
      // .scaleIdentity()
      // .scaleSequential()
      .nice()
      .range([0, this.width])
      .domain(d3.extent(this.data, (d) => d.week ));
    let y = d3.scaleLinear()
      .range([this.height, 0])
      .domain([
        0, 
        d3.max(this.data, d => +d3.max(d.groups, (g:any) => g.sum))
      ])
    //#endregion
    // define X & Y domains
    //#region define the lines
    let yVal = []
    let _vals = []
    // let _val1
    let valueline = d3.line()
      .curve(this.curve)
      .x((d:any) => x(d.week))
      .y((d:any) => {
        let property = d.groups
          .filter(
            g => g.type == this.typeNames[0])
        let result = y(property[0].sum)
        _vals[0] = property[0].sum
        // yVal = property[0].sum
        // yVal.push(property[0].sum)
        // console.log('result', property)
        return result
      })
      

    //#region another valuelines

    let _val2
    let valueline2 = d3.line()
      .curve(this.curve)
      .x((d:any) => x(d.week))
      .y((d:any) => {
        let property = d.groups
          .filter(
            g => g.type == this.typeNames[1])
        let result = y(property[0].sum)
        _vals[1] = property[0].sum
        // yVal.push(property)
        // yVal = property[0].sum
        yVal.push(property[0].sum)
        // console.log('result', property)
        return result
      })
    //   .curve(this.curve)
    //   .x((d:any) => x(d.week))
    //   .y((d:any) => {
    //     let prop = 'spożywka'
    //     let propertyOfArray = d.groups.filter(g => g.type == prop)
    //     return y(propertyOfArray[0].sum)
    //   })

    let valueline3 = d3.line()
      .curve(this.curve)
      .x((d:any) => x(d.week))
      .y((d:any) => {
        let property = d.groups
          .filter(
            g => g.type == this.typeNames[2])
        let result = y(property[0].sum)
        // yVal.push(property)
        // yVal = property[0].sum
        _vals[2] = property[0].sum
        // yVal.push(property[0].sum)
        // console.log('result', property)
        return result
      })
    //   .curve(this.curve)
    //   .x((d:any) => x(d[0]))
    //   .y((d:any) => y(d[1]))
    //#endregion

    _vals.forEach(v => {
      yVal.push(v)
    });
    // console.log('yVal', yVal)

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

    console.log('yVal', yVal)

    //#region lines labels
    let lineSpan = 3,
        // _val = yVal[0],//[yVal.length - 1],
        yValue = yVal[0],//.sum,//[0].sum,
        _x = +this.data[this.data.length - 1].week 

    // let move = {
    //   x: _x,
    //   // y: yVal[0]
    // }
    this.chart
      .append("text")
      .data([this.data])
      .attrs({
        transform: `translate(
          ${x(_x) + lineSpan},
          ${y(yVal[1])}
        )`,    
        dy: '.35em',
        'text-anchor': 'start'
      })
      .style("fill", "steelblue")
      .text(d => {
        let result = d[0].groups.filter(
          g => g.type == this.typeNames[0])
        return result[0].type
      })

      // console.log((this.data, d => d.type)
      // .text("Close");

    this.chart
      .append("text")
      .data([this.data])
      .attrs({
        transform: `translate(
          ${x(_x) + lineSpan},
          ${y(yVal[2])}
        )`,    
        dy: '.35em',
        'text-anchor': 'start'
      })
      .style("fill", "red")
      .text(d => {
        let result = d[0].groups.filter(g => g.type == this.typeNames[1])
        return result[0].type
      })

    this.chart
      .append("text")
      .data([this.data])
      .attrs({
        transform: `translate(
          ${x(_x) + lineSpan},
          ${y(yVal[3])}
        )`,    
        dy: '.35em',
        'text-anchor': 'start'
      })
      .style("fill", "green")
      .text(d => {
        let result = d[0].groups.filter(g => g.type == this.typeNames[2])
        return result[0].type
      })

    // this.chart.append("text")
    //   .attrs({
    //     transform: `translate(${lineSpan},${y(this.data[0].open)})`,
    //     dy: '.35em',
    //     'text-anchor': 'start'
    //   })
    //   .style("fill", "red")
    //   .text("Open");

    // this.chart.append("text")
    // .attrs({
    //     transform: `translate(${lineSpan},${y(this.data[0].other)})`,
    //     dy: '.35em',
    //     'text-anchor': 'start'
    //   })
    //   .style("fill", "green")
    //   .text("Other");
    //#endregion 

    // x & y axis
    this.xAxis = svg.append('g')
      .attr('class', 'axis axis-x')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top + this.height})`)
      
      // --> decide which scale function depending on type of chart <--
      // .call(d3.axisBottom(x))
      .call(d3.axisBottom(this.xScale))

    this.yAxis = svg.append('g')
      .attr('class', 'axis axis-y')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`)

      // --> decide which scale function depending on type of chart <--
      // .call(d3.axisLeft(y))
      .call(d3.axisLeft(this.yScale))
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
