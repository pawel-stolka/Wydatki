import { Component, OnInit, ViewChild, Input, ElementRef } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'pie3',
  templateUrl: './pie3.component.html',
  styleUrls: ['./pie3.component.css']
})
export class Pie3Component implements OnInit {
  @ViewChild('pie') private pieContainer: ElementRef;
  @Input() private data: Array < any > ;

  private pie: any;
  private margin: any = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  }
  private width;
  private height;
  private radius;

  constructor() {}

  ngOnInit() {
    this.createPie();
    console.log('data', this.data)
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
    // element.offsetHeight = 500
    this.width = 300 // element.offsetWidth - 2 * this.margin.top;
    this.height = 300 // element.offsetHeight;
    this.radius = this.height / 2
    console.log(element)
    let svg = d3.select(element)
      .append('svg')
      .attrs({
        class: 'pie',
        width: this.width, // element.offsetWidth,
        height: this.height // element.offsetHeight
      })

    // chart plot area
    let g = svg.append('g')
      .attrs({
        transform:
          // `translate(${this.width/2}, ${this.height/4})`,
          `translate(130, 130)`,
        class: 'mainCircle'
      });

    let arcGenerator = d3.arc()
      .innerRadius(30)
      .outerRadius(100)
      .padAngle(.03)
      .padRadius(100)
      .cornerRadius(5)

    function angle(factor = 1) {
      return factor * 2 * Math.PI
    }

    // let arcData = []


    let parts = //[.23, .34, .65, 1];
    [{
      name: 'male',
      percent: .23
    },{
      name: 'male',
      percent: .55
    },
    {
      name: 'test',
      percent: .88
    }]
    let _letters = 'abcdefghijklmnopqrstuvwxyz'
    let names = _letters.split('')

    let colorDef = ["red", 'orange']
    let colors = //["red", "orange", "green"]
      d3.scaleLinear()
      .domain([0, parts.length])
      .range(<any[]>colorDef) //['yellow', 'blue']);

    // incoming
    let pData = [],
        draftData = []
    
    let ex1 = {
          name: 'male',
          percent: .15
        },
        ex2 =
        {
          name: 'female',
          percent: .37
        },
        ex3 =
        {
          name: 'test',
          percent: .63
        }
    draftData.push(ex1)
    draftData.push(ex2)
    draftData.push(ex3)
    // arcData

    // filling parts of pie
    for (var i = 0; i < 3; i++) {//pData.length; i++) {
      let data = {}
      let   color = colors(i)
      let p0 = {
          name: 'p0',
          percent: (draftData[i].percent)
        }
      let   p1 = {
        name: 'p1',
        percent: 0
      }
      console.log('p0',p0)
      console.log('p1',p1)
      let startAngle = 0
      let endAngle = angle(p0.percent)
        
      if (i > 0) {
        p1 = draftData[i - 1]
        startAngle = angle(p0.percent)
        endAngle = angle(p1.percent)
         
      }
      console.log('iteration'+i,p0,p1)

      let p = ((p0.percent - p1.percent) *100).toString(),
          factor = parseFloat(p).toFixed(0)
      // console.log('iteration_p'+i, p)
      console.log('factor', factor)
      data = {
        startAngle,
        endAngle,
        label: draftData[i].name,// names[i],
        percentage: factor
      }

      pData.push(data)
    }
    console.log('pData1', pData)
    // pData = [{
    //     startAngle: 0,
    //     endAngle: angle(.23),
    //     label: 'hard1',
    //     percentage: 23
    //   },{
    //     startAngle: angle(.23),
    //     endAngle: angle(.63),
    //     label: 'hard2',
    //     percentage: 54
    //   },{
    //     startAngle: angle(.63),
    //     endAngle: angle(1),
    //     label: 'hard3',
    //     percentage: 17
    // }]
    // pData.pop()
    // pData.pop()
    // pData.pop()
    console.log('pData2', pData)

    let path = g.selectAll('path')
      .data(pData)
      .enter()
      .append('g')
      .attrs({
        class: 'cakeBit'
      })
      // .append('text')
      .append('path')
      .attrs({
        d: arcGenerator,
        fill: (d, i) => {
          let res = colors(i)
          // console.log('d,i, res', d,i, res)
          return res
        }
      })

    // let g = svg.append('g')
    // .attrs({
    //   transform: `
    //     translate(${this.width/2}, ${this.height/2})
    //     `,
    //   class: 'mainCircle'
    // });

    // ---------------------
    //center legend?
    // let legend = ['aaa', 'ttt']
    // let gTest = svg
    //   .append('g')
    //   .attrs({
    //     class: 'test'
    //   })
    //   .selectAll('test')
    //   .data(legend)
    //   .enter()

    g.selectAll('cakeBit')
      // .selectAll('text')
      .data(pData)
      .enter()
      .append('text')
      .attrs({
        x: (d: any) => arcGenerator.centroid(d)[0],
        y: (d: any) => arcGenerator.centroid(d)[1],
        // dy: '.35em',
        'text-anchor': 'middle',
        fill: 'black'
      })
      .text((d: any) => {
        let result = `${d.label} ${d.percentage}%`
        // console.log('result, d', result, d)
        return result
      }
        
      )
// ---------------------


    /*
    path
      .on('mouseenter', (data) => {
        console.log('enter', data)
        // this.currData.push(data)
        // console.log('this.currData', this.currData)
        gTest
          .append('text')
          .attr('class','textItem')
          // .text(d => d)
          .attrs({
            x: (d: any) => 20,
            y: (d, i: any) => i * 20 + 20,
            // dy: '.35em',
            'text-anchor': 'start',
            fill: 'blue'
          })
          .text(d => d)

      })
      .on('mouseout', (data) => {
        console.log('out', data)
        // console.log('this.currData', this.currData)
        
      })
*/
    // this.test()
  }
  // currData: any[] = []

  test() {
    let element = this.pieContainer.nativeElement;
    let svg = d3.select(element)

    this.test3 = svg
      .append('g')

    let en = svg.selectAll('#en')
    // console.log(en)

  }
  test3

  enter() {
    let myData = ['A', 'B', 'C', 'D', 'E'];

    this.test3.selectAll('div')
      .data(myData)
      .enter()
      .append('div')
      .text(d => d)
      .attrs({
        class: 'test2'
      })
  }

  exit() {
    let myData = ['A', 'B', 'C'];

    this.test3.selectAll('div')
      .data(myData)
      .exit()
      .remove()
  }

  updatePie() {
    //
  }

}
