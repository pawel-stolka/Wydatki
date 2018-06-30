import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.css']
})
export class PieComponent implements OnInit {
  @ViewChild('pie') private pieContainer: ElementRef;
  @Input() private data: Array<any>;
  
  private pie: any;
  private margin: any //= 30;
    = { top: 50, right: 20, bottom: 100, left: 50 }
  private width;
  private height;

  constructor() { }

  ngOnInit() {
    this.createPie();
    if (this.data) {
      this.updatePie();
    }
  }

  ngOnChanges() {
    if (this.pie) {
      this.updatePie();
    }
  }

  createPie() {
    let element = this.pieContainer.nativeElement;
    this.width = element.offsetWidth - 2 * this.margin.top;
    this.height = element.offsetHeight - 2 * this.margin.top;
    let svg = d3.select(element).append('svg')
      .attr('width', element.offsetWidth)
      .attr('height', element.offsetHeight);

    console.log('pie')
    // chart plot area
    this.pie = svg.append('g')
    .attr('class', 'bars')
    .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);
  }

  updatePie() {
    //
  }


}
