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
      {date:"1-May-12",close:"68.13", open:"34.12"},
      {date:"30-Apr-12",close:"63.98", open:"45.56"},
      {date:"27-Apr-12",close:"67.00", open:"67.89"},
      {date:"26-Apr-12",close:"89.70", open:"78.54"},
      {date:"25-Apr-12",close:"99.00", open:"89.23"},
      {date:"24-Apr-12",close:"130.28", open:"99.23"},
      {date:"23-Apr-12",close:"53.98", open:"101.34"},
      {date:"20-Apr-12",close:"166.70", open:"122.34"},
      {date:"19-Apr-12",close:"345.44", open:"134.56"},
      {date:"18-Apr-12",close:"443.34", open:"160.45"},
      {date:"17-Apr-12",close:"543.70", open:"180.34"},
      {date:"16-Apr-12",close:"580.13", open:"210.23"},
      {date:"13-Apr-12",close:"605.23", open:"223.45"},
      {date:"12-Apr-12",close:"622.77", open:"201.56"},
      {date:"11-Apr-12",close:"626.20", open:"212.67"},
      {date:"10-Apr-12",close:"628.44", open:"310.45"},
      {date:"9-Apr-12",close:"636.23", open:"350.45"},
      {date:"5-Apr-12",close:"633.68", open:"410.23"},
      {date:"4-Apr-12",close:"624.31", open:"430.56"},
      {date:"3-Apr-12",close:"629.32", open:"460.34"},
      {date:"2-Apr-12",close:"618.63", open:"510.34"},
      {date:"30-Mar-12",close:"599.55", open:"534.23"},
      {date:"29-Mar-12",close:"609.86", open:"578.23"},
      {date:"28-Mar-12",close:"617.62", open:"590.12"},
      {date:"27-Mar-12",close:"614.48", open:"560.34"},
      {date:"26-Mar-12",close:"606.98", open:"580.12"}

        // {date:"10-May-12",close:"51.13"},
        // {date:"7-May-12",close:"68.13"},
        // {date:"5-May-12",close:"78.13"},
        // {date:"4-May-12",close:"35.13"},
        // {date:"2-May-12",close:"18.13"},
        // {date:"1-May-12",close:"58.13"},
        // {date:"30-Apr-12",close:"53.98"},
        // {date:"27-Apr-12",close:"67.00"},
        // {date:"26-Apr-12",close:"89.70"},
        // {date:"25-Apr-12",close:"99.00"}
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
