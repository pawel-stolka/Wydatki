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
      {date:"1-May-12",close:"68.13", open:"34.12", other:"400.12"},
      {date:"27-Apr-12",close:"67.00", open:"67.89", other:"506.12"},
      {date:"25-Apr-12",close:"99.00", open:"89.23", other:"410.12"},
      {date:"23-Apr-12",close:"53.98", open:"101.34", other:"276.12"},
      {date:"19-Apr-12",close:"345.44", open:"134.56", other:"267.12"},
      {date:"17-Apr-12",close:"543.70", open:"180.34", other:"248.12"},
      {date:"13-Apr-12",close:"605.23", open:"223.45", other:"307.12"},
      {date:"11-Apr-12",close:"626.20", open:"212.67", other:"194.12"},
      {date:"9-Apr-12",close:"636.23", open:"350.45", other:"160.12"},
      {date:"4-Apr-12",close:"624.31", open:"430.56", other:"194.12"},
      {date:"2-Apr-12",close:"618.63", open:"510.34", other:"121.12"},
      {date:"29-Mar-12",close:"609.86", open:"578.23", other:"25.12"},
      {date:"27-Mar-12",close:"614.48", open:"560.34", other:"45.12"}
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
