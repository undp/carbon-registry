import { Component, OnInit, Input } from '@angular/core';
import { OtherSDGModel } from '../../model/ndc/otherSDG.model';

@Component({
  selector: 'app-other-sdg',
  templateUrl: './other-sdg.component.html',
  styleUrls: ['./other-sdg.component.scss']
})
export class OtherSdgComponent implements OnInit {

  @Input() otherSdg:OtherSDGModel;
  @Input() likelihoodArr: string[];
  @Input() impactArr: string[];
  @Input() approvalScreen: boolean;
  @Input() isMonitoring: boolean;
  constructor() { }

  ngOnInit() {
  }

}
