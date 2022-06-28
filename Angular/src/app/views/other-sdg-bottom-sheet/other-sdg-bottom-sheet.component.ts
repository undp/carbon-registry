import { Component, Inject, OnInit } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material';

@Component({
  selector: 'app-other-sdg-bottom-sheet',
  templateUrl: './other-sdg-bottom-sheet.component.html',
  styleUrls: ['./other-sdg-bottom-sheet.component.scss']
})
export class OtherSdgBottomSheetComponent implements OnInit {

  constructor(private bottomsheet: MatBottomSheetRef<OtherSdgBottomSheetComponent>, @Inject(MAT_BOTTOM_SHEET_DATA) public data: {datas: string[]}) { 
    // console.log(this);
  }

  ngOnInit() {
  }
  
  openLink(data){
    this.bottomsheet.dismiss(data);
  }

}
