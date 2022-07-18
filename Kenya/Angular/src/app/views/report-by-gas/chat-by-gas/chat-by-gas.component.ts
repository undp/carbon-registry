import { ReportByGasRow } from './../../model/reports/report-by-gas-row';
import { Component, Input, OnInit } from '@angular/core';
import { Label, Color } from 'ng2-charts';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';

@Component({
  selector: 'app-chat-by-gas',
  templateUrl: './chat-by-gas.component.html',
  styleUrls: ['./chat-by-gas.component.scss']
})
export class ChatByGasComponent  implements OnInit{
  
  @Input() inventoryYear:string;
  @Input() totalChatData:any;
  @Input() chartLevel : any;
  type:any = ['Energy',"IPPU","AFOLU","Waste"];

  // Pie
  public pieChartLabels: string[] = ['CO2', 'CH4', 'N2O'];
  public pieChartData: number[] = [];
  public pieChartType = 'pie';

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
  ngOnInit(): void {
    this.barChartLabels = this.chartLevel;
    console.log(this.totalChatData);
    this.barChartData = [];
    for(let item of this.totalChatData.dataArray){
      let obj = {data: [item.co2, item.ch4, item.n2o, item.co2eq], label: this.type[item.type-1], stack: 'a'};
      this.barChartData.push(obj);
    }
    let piData = this.totalChatData.piData;
    this.pieChartData = [piData.B, piData.C, piData.D];
    // this.barChartData = [
    //   {data: co2Obj, label: 'CO2', stack: 'a'},
    //   {data: ch4Obj, label: 'CH4', stack: 'a'},
    //   {data:n2oObj, label: 'N2O', stack: 'a'},
    //   {data: co2eqObj, label: 'CO2eq', stack: 'a'},
    // ];
  }
}
