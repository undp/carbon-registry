import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MyApprovalsService } from './my-approvals.service';

@Component({
  selector: 'app-my-approvals',
  templateUrl: './my-approvals.component.html',
  styleUrls: ['./my-approvals.component.scss']
})
export class MyApprovalsComponent implements OnInit {

  approvalList: any;
  constructor(private readonly _mas: MyApprovalsService,private readonly _router: Router) { }

  ngOnInit() {
    this.approvalList = [];
    this.getMyApprovals('pending');
  }

  getMyApprovals(type){
    this._mas.getApprovals(type).subscribe((res: any)=>{
      if(res.statusCode == 200){
        this.approvalList = res.data;
        console.log(this.approvalList);
      }
    }, err=>{

    })
  }

  goToPage(link,formId, recordId){
    this._router.navigate([link+"/"+formId+"/"+recordId]);
  }
}
