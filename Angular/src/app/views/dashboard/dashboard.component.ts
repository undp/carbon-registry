import { Component, OnInit } from '@angular/core';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';

@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls : ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public color: string = 'warning';
  constructor() {

  }

  ngOnInit(): void {
    // generate random values for mainChart
  }
}
