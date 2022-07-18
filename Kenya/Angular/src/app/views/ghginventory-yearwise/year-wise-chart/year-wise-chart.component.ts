import { Component, Input, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color } from 'ng2-charts';

@Component({
  selector: 'app-year-wise-chart',
  templateUrl: './year-wise-chart.component.html',
  styleUrls: ['./year-wise-chart.component.scss']
})
export class YearWiseChartComponent implements OnInit {
  @Input() inventoryYear:string;
  @Input() totalChatData:any;
  @Input() chartLevel : any;
  @Input() tabName : any;
  @Input() unit : any;

  public barChartColors: Color[] = [
    { backgroundColor: 'rgb(46, 199, 201)' },
    { backgroundColor: 'rgb(182, 162, 222)' },
    { backgroundColor: 'rgb(90, 177, 239)' },
    { backgroundColor: 'rgb(182, 90, 46)' },
  ]

  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: any = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];
  public barChartData: ChartDataSets[] = [];
  constructor() { }

  ngOnInit() {
    this.barChartLabels = this.chartLevel;
    let energy = [];
    let ippu = [];
    let afolu = [];
    let waste = [];
    this.barChartData = [];
    for(let obj of this.totalChatData){
      let objArr = [];
      for(let item of obj.data[this.tabName]){
        let count = item['A'].split('-');
        if(count.length === 2){
          let type = count[0].trim();
          if(type == '1') energy.push(item.E);
          else if(type == '2') ippu.push(item.E);
          else if(type == '3') afolu.push(item.E);
          else if(type == '4') waste.push(item.E);
          // if(type == '1' || type == '2' || type == '3' || type == '4'){
          //   objArr.push(item.E);  
          // }
        }
      }
      // let mainObj = {data: objArr, label: obj.inventoryYear, stack: 'a'};
      // this.barChartData.push(mainObj);
    }
    this.barChartData = [
      {data: energy, label: "Energy", stack: 'a'},
      {data: ippu, label: "IPPU", stack: 'a'},
      {data: afolu, label: "AFLOU", stack: 'a'},
      {data: waste, label: "Waste", stack: 'a'},
    ];

    console.log("this.totalChatData ===", energy,ippu,afolu,waste);
  }

}
