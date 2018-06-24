import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';

@Component({
  selector: 'chart-update',
  templateUrl: './chart-update.component.html',
  styleUrls: ['./chart-update.component.css']
})
export class ChartUpdateComponent implements OnInit {
  @ViewChild('chart') private chartContainer: ElementRef;
  @Input() private data: Array<any>;
  
  constructor() { }

  ngOnInit() {
  }

}
