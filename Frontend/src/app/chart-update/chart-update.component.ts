import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'chart-update',
  templateUrl: './chart-update.component.html',
  styleUrls: ['./chart-update.component.css']
})
export class ChartUpdateComponent implements OnInit {
  @ViewChild('chart') private chartContainer: ElementRef;
  @Input() private data: Array<any>;

  private chart: any;
  private margin: any = 25;
  private width;
  private height;

  private xScale
  private yScale
  private colors
  private xAxis
  private yAxis
  
  constructor() { }

  ngOnInit() {
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
    this.width = element.offsetWidth - 2 *this.margin;
    this.height = element.offsetHeight - 2 * this.margin;
    let svg = d3.select(element).append('svg')
      .attr('width', element.offsetWidth)
      .attr('height', element.offsetHeight);

    // chart plot area
    this.chart = svg.append('g')
      .attr('class', 'bars')
      .attr('transform', `translate(${this.margin}, ${this.margin})`);

    // define X & Y domains
    let xDomain = this.data.map(d => d[0]);
    let yDomain = [0, d3.max(this.data, d => d[1])];

    // create scales
    this.xScale = d3.scaleBand().padding(0.1)
      .domain(xDomain)
      .rangeRound([0, this.width]);

    this.yScale = d3.scaleLinear()
      .domain(yDomain)
      .range([this.height, 0]);

    // bar colors
    this.colors = d3.scaleLinear()
      .domain([0, this.data.length])
      .range(<any[]>['red', 'blue']);

    // x & y axis
    this.xAxis = svg.append('g')
      .attr('class', 'axis axis-x')
      .attr('transform', `translate(${this.margin}, ${this.margin + this.height})`)
      .call(d3.axisBottom(this.xScale));
    this.yAxis = svg.append('g')
      .attr('class', 'axis axis-y')
      .attr('transform', `translate(${this.margin}, ${this.margin})`)
      .call(d3.axisLeft(this.yScale));
  }

  updateChart() {
     // update scales & axis
     this.xScale.domain(this.data.map(d => d[0]));
     this.yScale.domain([0, d3.max(this.data, d => d[1])]);
     this.colors.domain([0, this.data.length]);
     this.xAxis.transition().call(d3.axisBottom(this.xScale));
     this.yAxis.transition().call(d3.axisLeft(this.yScale));

     let update = this.chart.selectAll('.bar')
      .data(this.data);
  }

}
