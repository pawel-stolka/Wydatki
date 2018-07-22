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
  @Input() public d: any
  
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
      .x((d:any) => this.xScale(d.week))
      .y((d:any) => {
        let property = d.groups
          .filter(g => g.type == this.typeNames[0])
          // console.log('d.groups', d.groups)
        // console.log('property', property)
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

    // 6. Add the valueline paths.
    this.chart.append("path")
      .data([this.data])
      .attr("class", "line1")
      .attr("d", valueline);

    // 7. X & Y axis
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
    //
  }

}
