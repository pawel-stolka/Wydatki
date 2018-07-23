import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'progress-combo',
  templateUrl: './progress-combo.component.html',
  styleUrls: ['./progress-combo.component.css']
})
export class ProgressComboComponent implements OnInit {
  @ViewChild('chart') private chartContainer: ElementRef;
  @Input() private data: Array<any>;
  @Input() public typeName: any
  
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
  // typeNames = [
  //   'opłaty',
  //   'na mieście',
  //   'spożywka',
  //   'pierdoły',
  //   "a co!"
  // ]

  constructor() { }

  ngOnInit() {
    console.log('data!', this.data)
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

    // 1. add svg to html
    let element = this.chartContainer.nativeElement;
    this.width = element.offsetWidth - this.margin.left - this.margin.right;
    this.height = element.offsetHeight - this.margin.top - this.margin.bottom
    let svg = d3.select(element)
      .append('svg')
      .attr('class', 'svg')
      .attr('width', element.offsetWidth)
      .attr('height', element.offsetHeight)

    // 2. chart plot area
    this.chart = svg.append('g')
      .attr('class', 'path')
      .attr('transform', 
            `translate(${this.margin.left}, ${this.margin.top})`);
    
    // 3. define X & Y domains
    let xDomain = d3.extent(this.data, (d) => d.week )
    let yDomain = [
      0, 
      d3.max(this.data, d => +d3.max(d.groups, (g:any) => g.sum))
    ];

    // 4. Scale the range of the data to plot chart area
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
   
    // 5. define the lines
    this.initCurve()
    let yLabelValue = []
    let valueline = d3.line()
      .curve(this.curve)
      .x((d:any) => {
        let res = this.xScale(d.week)
        console.log('x...',res, d)
        return res
      })
      .y((d:any) => {
        let property = d.groups
          .filter(g => g.type == this.typeName)
        // last Y valueline value
        let value = property.length !== 0 
          ? property[0].sum
          : 0
        yLabelValue = [{ 
          type: this.typeName,
          v: value
        }]
        return this.yScale(value)
      })

    // 6. Add the valueline paths.
    this.chart.append("path")
      .data([this.data])
      .attr("class", "line")
      .attr("d", valueline);

    // 7. X & Y axis
    this.xAxis = svg.append('g')
      .attr('class', 'axis axis-x')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top + this.height})`)
      .call(d3.axisBottom(this.xScale))

    this.yAxis = svg.append('g')
      .attr('class', 'axis axis-y')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`)
      .call(d3.axisLeft(this.yScale))

    // 8. line label
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
      .text(d => {
        let result = d[0].groups.filter(
          g => g.type == this.typeName)
          return result[0].type
        })
      .style("fill", "steelblue")
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
    console.log('update')
    // update scales & axis

    // 3. define X & Y domains
    let xDomain = d3.extent(this.data, (d) => d.week )
    let yDomain = [0, d3.max(this.data, d => +d3.max(d.groups, (g:any) => g.sum)) ];
    // 4. Scale the range of the data to plot chart area
    this.xScale = d3
      .scaleLinear()
      .nice()
      .range([0, this.width])
      .domain(xDomain)

    this.yScale = d3.scaleLinear()
      .range([this.height, 0])
      .domain(yDomain)

    let update = this.chart.selectAll('.line')
     .data(this.data);

    // remove existing bars
    update.exit().remove();

    // 5. define the lines
    this.initCurve()
    let yLabelValue = []
    let valueline = d3.line()
      .curve(this.curve)
      .x((d:any) => this.xScale(d.week))
      .y((d:any) => {
        let property = d.groups
          .filter(g => g.type == this.typeName)
        // last Y valueline value
        let value = property.length !== 0 
          ? property[0].sum
          : 0
        yLabelValue = [{ 
          type: this.typeName,
          v: value
        }]
        return this.yScale(value)
      })

    // 6. Add the valueline paths.
    this.chart.append("path")
      .data([this.data])
      .attr("class", "line")
      .attr("d", valueline);

    // 8. line label
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
      .text(d => {
        let result = d[0].groups.filter(
          g => g.type == this.typeName)
          return result[0].type
        })
      .style("fill", "steelblue")
  }
  /* 
  updateChart() {
    console.log('update')
    // update scales & axis
    this.xScale.domain(this.data.map(d => d[0]));
    this.yScale.domain([0, d3.max(this.data, d => d[1])]);
    this.colors.domain([0, this.data.length]);
    this.xAxis.transition()
      .call(d3.axisBottom(this.xScale))
      .selectAll('text')
      .style('text-anchor', 'end')
      .attrs({
        dx: '-1.50em',
        dy: '0.25em',
        // transform: 'rotate(-65)',
      })
      .attr('transform', 'rotate(-65)')
    this.yAxis.transition().call(d3.axisLeft(this.yScale));

    let update = this.chart.selectAll('.bar')
     .data(this.data);

   // remove existing bars
   update.exit().remove();
   
   // update existing bars
   this.chart.selectAll('.bar').transition()
     .attr('x', d => this.xScale(d[0]))
     .attr('y', d => {
        let res = this.yScale(d[1])
        // console.log('y',res)
        return res
      })
     .attr('width', d => this.xScale.bandwidth())
     .attr('height', d => this.height - this.yScale(d[1]))
     .style('fill', (d, i) => this.colors(i));

   // add new bars
   update
     .enter()
     .append('rect')
     .attr('class', 'bar')
     .attr('x', d => this.xScale(d[0]))
     .attr('y', d => this.yScale(0))
     .attr('width', this.xScale.bandwidth())
     .attr('height', 0)
     .style('fill', (d, i) => this.colors(i))
     .transition()
     .delay((d, i) => i * 10)
     .attr('y', d => {
      let res = this.yScale(d[1])
      // console.log('y2',res, d[1])
      return res
      })//this.yScale(d[1]))
     .attr('height', d => this.height - this.yScale(d[1]));

    let updateText = this.chart.selectAll('.barText')
     .data(this.data);
    // update
    updateText
    .enter()
    .append('text')
    // .attr('class', 'barText')
    .attrs({
      x: d => this.xScale(d[0]) + 5,
      y: d => this.yScale(d[1]) -10 //+ 15
    })
    .text((d) => d[1] + ' zł')
    // .attr('class', 'chartText')
    // .style('fill', 'white')

    updateText.exit().remove();
  }
  */

}
