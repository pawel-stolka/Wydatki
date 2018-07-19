import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'path-container',
  templateUrl: './path-container.component.html',
  styleUrls: ['./path-container.component.css']
})
export class PathContainerComponent implements OnInit {
  private pathData: Array<any>;
  private dataByPeriod = []
  private periods = ['byDay', 'byWeek', 'byMonth']
  private currentPeriod = this.periods[1]

  constructor() { }

  ngOnInit() {
    this.generateData()
  }

  generateData(type = '') {
    this.pathData = []
    //#region ---- RANDOM DATA - ONLY FOR FIRST DATA TESTS -----

    let data = [
        {date:"10-May-12",close:"51.13"},
        {date:"7-May-12",close:"68.13"},
        {date:"5-May-12",close:"78.13"},
        {date:"4-May-12",close:"35.13"},
        {date:"2-May-12",close:"18.13"},
        {date:"1-May-12",close:"58.13"},
        {date:"30-Apr-12",close:"53.98"},
        {date:"27-Apr-12",close:"67.00"},
        {date:"26-Apr-12",close:"89.70"},
        {date:"25-Apr-12",close:"99.00"}
    ];

    data.forEach(e => {
      this.pathData.push(e)
    });
    // let rowNumber = 2 + Math.floor(Math.random() * 10);
    // for (var i = 1; i <= rowNumber; i++) {
    //   this.pathData.push([
    //     `x=${i}`,
    //     Math.floor(Math.random() * 10)
    //   ])
    // }
    //#endregion
    
    //#region ---- NORMAL DATA -----
    // this.dataByPeriod.forEach(e => {
    //   console.log(' -- e', e)
    //   let types = e.groups.filter(x => x.type == type)
    //   console.log('types', types)
    //   let selection = types.length > 0 ? types[0].sum : 0
    //   this.pathData.push([
    //     `week ${e.week}`,
    //     selection
    //   ])
    // });
  //#endregion

    console.log('pathData', this.pathData)
  }

}
