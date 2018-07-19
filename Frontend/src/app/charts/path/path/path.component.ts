import { Component, OnInit, ViewChild, Input, ElementRef } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'path',
  templateUrl: './path.component.html',
  styleUrls: ['./path.component.css']
})
export class PathComponent implements OnInit {
  @ViewChild('chart') private chartContainer: ElementRef;
  @Input() private data: Array<any>;
  private chart: any;
  private margin: any //= 30;
    = { top: 50, right: 20, bottom: 100, left: 50 }
  private width;
  private height;

  private xScale
  private yScale
  private colors
  private xAxis
  private yAxis

  ngOnInit() {
    console.log('data exist!', this.data)
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
    this.height = element.offsetHeight - this.margin.top - this.margin.bottom;
    let svg = d3.select(element).append('svg')
      .attr('width', element.offsetWidth)
      .attr('height', element.offsetHeight);

    // chart plot area
    this.chart = svg.append('g')
      .attr('class', 'path')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

    // define X & Y domains
    let xDomain = this.data.map(d => d[0]);
    let yDomain = [0, d3.max(this.data, d => d[1])];

    // create scales
    this.xScale = d3.scaleLinear()//.scaleBand().padding(0.1)
      .domain(xDomain)
      .rangeRound([0, this.width]);
    this.yScale = d3.scaleLinear()
      .domain(yDomain)
      .range([this.height, 0]);

    // bar colors
    this.colors = d3.scaleLinear()
      .domain([0, this.data.length])
      .range(<any[]>['green', 'red']);

    // x & y axis
    this.xAxis = svg.append('g')
      .attr('class', 'axis axis-x')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top + this.height})`)
      .call(d3.axisBottom(this.xScale));
    this.yAxis = svg.append('g')
      .attr('class', 'axis axis-y')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`)
      .call(d3.axisLeft(this.yScale));

    // ------- from update -------- !!!!
      // this.xScale.domain(this.data.map(d => d[0]));
      // this.yScale.domain([0, d3.max(this.data, d => d[1])]);
      // this.colors.domain([0, this.data.length]);
      // this.xAxis.transition()
      //   .call(d3.axisBottom(this.xScale))
      //   .selectAll('text')
      //   .style('text-anchor', 'end')
      //   .attrs({
      //     dx: '-1.50em',
      //     dy: '0.25em',
      //     // transform: 'rotate(-65)',
      //   })
      //   .attr('transform', 'rotate(-65)')
      // this.yAxis.transition().call(d3.axisLeft(this.yScale));

      // ------? next? ------------
      let update = this.chart.selectAll('.path')
        .data([this.data]);
        console.log('update', update)

      // remove existing bars
      update.exit().remove();

      // update existing bars
      this.chart.selectAll('.path').transition()
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
        .append('path')
        .attr('class', 'path')
        .attr('x', d => this.xScale(d[0]))
        .attr('y', d => this.yScale(0))
        .attr('width', 100)//this.xScale())//.bandwidth())
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
  }

  updateChart() {
    //
  }

}
