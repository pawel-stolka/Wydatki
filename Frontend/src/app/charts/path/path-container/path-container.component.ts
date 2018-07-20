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
      {date:"1-May-18",close:"68.13", open:"34.18", other:"400.18"},
      {date:"27-Apr-18",close:"67.00", open:"167.89", other:"506.18"},
      {date:"25-Apr-18",close:"199.00", open:"89.23", other:"410.18"},
      {date:"23-Apr-18",close:"200.98", open:"101.34", other:"276.18"},
      {date:"19-Apr-18",close:"345.44", open:"134.56", other:"267.18"},
      {date:"17-Apr-18",close:"543.70", open:"180.34", other:"248.18"},
      {date:"13-Apr-18",close:"605.23", open:"223.45", other:"307.18"},
      {date:"11-Apr-18",close:"626.20", open:"218.67", other:"194.18"},
      {date:"9-Apr-18",close:"636.23", open:"350.45", other:"160.18"},
      {date:"4-Apr-18",close:"624.31", open:"430.56", other:"194.18"},
      {date:"2-Apr-18",close:"618.63", open:"510.34", other:"181.18"},
      {date:"29-Mar-18",close:"609.86", open:"578.23", other:"25.18"},
      {date:"27-Mar-18",close:"614.48", open:"560.34", other:"45.18"}
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
