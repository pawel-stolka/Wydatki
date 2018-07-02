import { Component, OnInit, ElementRef, AfterViewInit, Input } from '@angular/core';
import { D3Service, D3, Selection } from 'd3-ng2-service';
import { ExpenseService } from '../../../expense.service';
// import { ApiService } from '../api.service';

@Component({
  selector: 'chart1',
  templateUrl: './chart1.component.html',
  styleUrls: ['./chart1.component.css']
})
export class Chart1Component implements OnInit {
  private apiData = [];
  private d3: D3;
  private parentNativeElement: any;
  private parent;
  private error;
  svg;
  margin
  width
  height
  x
  y
  valueline

  parseTime
  dotRadius


  constructor(
    element: ElementRef,
    d3Service: D3Service,
    public expenseService: ExpenseService
    // public apiService: ApiService
    ) {
      this.d3 = d3Service.getD3();
      this.parentNativeElement = element.nativeElement;
  }

  ngAfterViewInit() {
    this.svg = this.d3.select("svg")
    let _width = 850,
        _height = 500

    // var width = +this.svg.attr("width"),
    //     height = +this.svg.attr("height")
    this.margin = { top: 40, right: 20, bottom: 100, left: 70 }
    this.width = _width - this.margin.left - this.margin.right
    this.height = _height - this.margin.top - this.margin.bottom
    
    this.dotRadius = 5
    this.parseTime = this.d3.timeParse("%d-%b-%y");

    // set the ranges
    this.x = this.d3.scaleTime()
      .range([0, this.width]);
    this.y = this.d3.scaleLinear()
      .range([this.height, 0]);
    
    // define the line
    this.valueline = this.d3.line()
      .x((d:any) => this.x(d.date))
      .y((d:any) => this.y(d.close) )
      .curve(this.d3.curveMonotoneX)
  }

  ngOnInit() {
    this.loadData()
      .then(() => this.loadD3())
      .then(() => this.loadGraph())
      // .catch((err) => this.error = `error: ${this.apiService.error}`)
  }

  loadData() {
    // return this.apiService.getSimpleGraph()
    return this.expenseService.getBills()
      .toPromise()
      .then(
        data => {
          // // format the data
          // data.forEach(d => {
          //   d.date = this.parseTime(d.date)
          //   d.close = +d.close;
          // });

          // this.apiData = data;
          // console.log('getSimpleGraph', data)
        }
      )
  }

  loadGraph() {
    let totalWidth = this.width + this.margin.left + this.margin.right,
        totalHeight = this.height + this.margin.top + this.margin.bottom

    // append width, height to the svg object
    // appends a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    let svg = this.svg
      .attr("width", totalWidth)
      .attr("height", totalHeight)
      .append('g')
      .attr("transform", "translate(" 
            + this.margin.left + "," + this.margin.top
            + ")");

    // Scale the range of the data
    let minMaxDate = this.d3.extent(this.apiData, (d) => d.date )
    let minClose = 0// this.d3.min(this.apiData, (d) => d.close )
    let maxClose = this.d3.max(this.apiData, (d) => d.close )
    console.log(minMaxDate, minClose, maxClose)
    
    this.x.domain(minMaxDate);
    this.y.domain([minClose, maxClose]);

    svg
      .append("path")
      .data([this.apiData])
      .attr("class", "line")
      .attr("d", this.valueline)

    // AXIS ------------------------------------------
    // Add the X Axis
    svg.append("g")
      .attr("transform", "translate(0," + this.height + ")")

      svg.append("g")
      .attr("class", "grid")
      .attr("transform", "translate(0," + this.height + ")")
      .call(this.make_x_gridlines()
        .tickSize(-this.height)
        // .tickFormat("")
      )

    // add the Y gridlines
    svg.append("g")
        .attr("class", "grid")
        .call(this.make_y_gridlines()
            .tickSize(-this.width)
            // .tickFormat("")
        )
    
    // Add the scatterplot
    svg.selectAll("dot")
      .data(this.apiData)
      .enter().append("circle")
      .attr('class', 'dot')
      .attr("r", this.dotRadius)
      .attr("cx", (d) => {
        let res = this.x(d.date)
        console.log(d.date, res)
        return res
      })
      .attr("cy", (d) => this.y(d.close))

    // AXIS LABELS ---------------------------

        // x axis text label
        svg.append("text")
        .attr("transform",
            "translate(" + (this.width / 2) + " ," +
            (this.height + this.margin.top + 44) + ")")
        // .attr("x", width / 2)
        // .attr("y", height + margin.top + 44)

        .style("text-anchor", "middle")
        .text("Date (Abril '16)")

    // y axis text label
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - this.margin.left)
        .attr("x", 0 - (this.height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Daily kms");

    // add a title
    svg.append("text")
        .attr("x", (this.width / 2))
        .attr("y", 0 - (this.margin.top / 2))
        .attr("text-anchor", "middle")
        .style("font-size", "20px")
        // .style("text-decoration", "underline")
        .text("Basia y Paweł Camino de Santiago 2016");
  }

  // gridlines in x axis function
  make_x_gridlines() {
    return this.d3.axisBottom(this.x)
        // .ticks(5)
        // .ticks(this.d3.timeDay.every(1))
  }

  // gridlines in y axis function
  make_y_gridlines() {
      return this.d3.axisLeft(this.y)
          .ticks(5)
  }

  loadD3() {
    let d3 = this.d3;
    let d3ParentElement: Selection < any, any, any, any > ;
    if (this.parentNativeElement !== null) {
      this.parent = d3.select(this.parentNativeElement);
      let data = this.apiData
    }
  }


}
