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
  
  constructor() { }

  ngOnInit() {
    console.log('data!', this.data)
  }


}
