import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'pie-labeled',
  templateUrl: './pie-labeled.component.html',
  styleUrls: ['./pie-labeled.component.css']
})
export class PieLabeledComponent implements OnInit {
  @ViewChild('pie') private pieContainer: ElementRef;
  @Input() private data: Array<any>;

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
  private arc;
  private underline = 75
  private dotRadius = 2
  private outerFactor = 1.2

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
    this.width = 400// element.offsetWidth - 2 * this.margin.top;
    this.height = 230// element.offsetHeight;
    let moveX = this.width/2
    let moveY = this.height/2

    this.arc = {
      innerRadius: 40,
      outerRadius: 80,
      padAngle: .03,
      padRadius: 100,
      cornerRadius: 10
    }

    // this.radius = this.height / 2
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
          `translate(${moveX}, ${moveY})`,
          // `translate(150, 150)`,
        class: 'mainCircle'
      });

    let arcGenerator = d3.arc()
      .innerRadius(this.arc.innerRadius)
      .outerRadius(this.arc.outerRadius)
      .padAngle(this.arc.padAngle)
      .padRadius(this.arc.padRadius)
      .cornerRadius(this.arc.cornerRadius)

    let outerArc = d3.arc()
      .outerRadius(this.arc.outerRadius * this.outerFactor)
      .innerRadius(this.arc.outerRadius * this.outerFactor)

    function angle(factor = 1) {
      return factor * 2 * Math.PI
    }

    // let arcData = []

    // incoming
    let pData = [],
        _arr = this.data

    let colorDef = ["red", 'yellow']
    let colors = //["red", "orange", "green"]
      d3.scaleLinear()
      .domain([0, _arr.length])
      .range(<any[]>colorDef) //['yellow', 'blue']);

    // counting parts of pie
    for (var i = 0; i < _arr.length; i++) {
      let data = {}
      let color = colors(i)
      let p0 = {
          name: _arr[i].name,
          percent: (_arr[i].percent)
        }
      let   p1 = {
        // name: '',//_arr[0].name,
        percent: 0
      }
      let startAngle = 0
      let endAngle = angle(p0.percent)
        
      if (i > 0) {
        p1 = _arr[i - 1]
        startAngle = angle(p0.percent)
        endAngle = angle(p1.percent)
      }

      let p = ((p0.percent - p1.percent)*100 ).toString(),
          factor = parseFloat(p).toFixed(0)

      data = {
        startAngle,
        endAngle,
        label: p0.name,//_arr[i].name,
        percentage: factor
      }

      pData.push(data)
    }
    // console.log('_arr', _arr)
    
    // donut slices
    let path = g.selectAll('path')
      .data(pData)
      .enter()
      .append('g')
      .attrs({class: 'cakeBit'})
      .append('path')
      .attrs({
        d: arcGenerator,
        fill: (d, i) => colors(i)
      })

    

    //region donut text
    // let text = g.selectAll('cakeBit')
    //   // .selectAll('text')
    //   .data(pData)
    //   .enter()
    //   .append('text')
    //   .attrs({
    //     x: (d: any) => arcGenerator.centroid(d)[0],
    //     y: (d: any) => arcGenerator.centroid(d)[1],
    //     // dy: '.35em',
    //     'text-anchor': 'middle',
    //     fill: 'black'
    //   })
    //   .text((d: any) => {
    //     let result = `${d.label} ${d.percentage}%`
    //     // console.log('result, d', result, d)
    //     return result
    //   })



    // *****************************************************
    // for clarity just for now
    // *****************************************************
    /*
    let label = g.selectAll('cakeBit')
      .data(pData)
      .enter()
      .append('text')
      .html((d:any) => {
        return d.label + ' <tspan>' + d.percentage + '</tspan>' + '%'
      })
      .attrs({
        dy:'.35em',
        transform: (d) => {
          let pos = arcGenerator.centroid(d)
          let len = 400,
              a1 = pos[0] + len,
              a2 = pos[1] + len/2
          let ref1 = 145 * (this.midAngle(d) < Math.PI ? 1 : -1),
              p1 = pos[0],
              p2 = pos[1]
          console.log('pos', pos)
          console.log(pos[0], pos[1])
          // let pos2 = 
          return `translate(${pos[0] + ref1}, ${pos[1]})`
        },
        'text-anchor': 'middle'
      })*/
/*
    // add lines connecting labels to slice. A polyline creates straight lines connecting several points
    var polyline = g//.select('.lines')
      .selectAll('polyline')
      .data(pData)
      .enter().append('polyline')
      .attr('points', (d) => {

        // see label transform function for explanations of these three lines.
        var pos = arcGenerator.centroid(d);
        pos[0] = arc.outerRadius * 0.95 * (this.midAngle(d) < Math.PI ? 1 : -1);
        console.log('pos', pos)
        return [10, 10, pos]
        // return [arc.centroid(d), outerArc.centroid(d), pos]
      })
      .style("stroke", "black")
      .attr('fill', 'black')
*/
    //endregion
    var poly = g.selectAll('polyline')
      .data(pData)
      .enter()
      .append('polyline')
      .attrs({
        points: (d:any) => {
          let xy1 = arcGenerator.centroid(d)
          let xy2 = outerArc.centroid(d)
          let xy3 = [ xy2[0] + this.underline * this.minusOrPlus(d), 
                    outerArc.centroid(d)[1]]
          // console.log('xy1, xy2, xy3', xy1, xy2, xy3)
          return [xy1, xy2, xy3].toString()
        }
      })

      let text = g.selectAll('cakeBit')
        // .selectAll('text')
        .data(pData)
        .enter()

      text
        .append('text')
        .attrs({
          x: (d: any) => outerArc.centroid(d)[0] + (this.underline/2) * this.minusOrPlus(d),
          y: (d: any) => outerArc.centroid(d)[1] - 3,
          // dy: '.35em',
          'text-anchor': 'middle',
          fill: 'black'
        })
        .text((d: any) => `${d.label}`)

      text
        .append('text')
        .attrs({
          x: (d: any) => outerArc.centroid(d)[0] + (this.underline/2) * this.minusOrPlus(d),
          y: (d: any) => outerArc.centroid(d)[1] + 14,
          // dy: '.35em',
          'text-anchor': 'middle',
          fill: 'black'
        })
        .text((d: any) => {
          let result = `${d.percentage}%`
          // console.log('result, d', result, d)
          return result
        })


      //region transform...

      // .attr('transform', () => {
      //   let p = [100,100]
      //   return `translate(${p})`
      // })
      
      // transform: (d) => {
      // // points:(d) => {
      //   var pos = arcGenerator.centroid(d)
      //   pos[0] =  arc.outerRadius * 0.95 * (this.midAngle(d) < Math.PI ? 1 : -1);
      //   console.log('arc.outerRadius', arc.outerRadius)
      //   console.log('pos', pos)
      //   let result = [0,0, pos]
      //   return `translate(${pos})`// result
      // },

      //endregion
  
    
    // let dots = g.selectAll('.dots')
    //   .data(pData)
    //   .enter()
    // // .attrs({class: 'dot'})
    // dots
    //   .append('circle')
    //   .attrs({
    //     cx: (d) => arcGenerator.centroid(d)[0],
    //     cy: (d) => arcGenerator.centroid(d)[1],
    //     r: this.dotRadius 
    //   })
    //   // .style('fill', 'none')
    //   .style("stroke", "black")
    
  }

  minusOrPlus(d) {
    let r = this.midAngle(d) < Math.PI ? 1 : -1
    // console.log('result: ', r)
    return r
  }
  midAngle(d) {
    let result =  d.startAngle + (d.endAngle - d.startAngle) / 2;
    // console.log('result', result)
    return result
  }

  updatePie() {

  }
}
