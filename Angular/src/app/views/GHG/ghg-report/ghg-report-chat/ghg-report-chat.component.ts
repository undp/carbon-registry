import { Component, Input, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color } from 'ng2-charts';

@Component({
  selector: 'app-ghg-report-chart',
  templateUrl: './ghg-report-chat.component.html',
  styleUrls: ['./ghg-report-chat.component.scss']
})
export class GhgReportChatComponent implements OnInit {
  @Input() inventoryYear:string;
  @Input() totalChatData:any;
  constructor() { }
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
  ngOnInit() {
    this.barChartLabels = [this.inventoryYear];
    this.barChartData = [
      {data: [this.totalChatData['CO2']], label: 'CO2'},
      {data: [this.totalChatData['CH4']], label: 'CH4'},
      {data: [this.totalChatData['N20']], label: 'N2O'},
      {data: [this.totalChatData['CO2eq.']], label: 'CO2eq'},
    ];
  }

}
