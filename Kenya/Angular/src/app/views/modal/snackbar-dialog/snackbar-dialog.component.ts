import { Component, OnInit, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material';

@Component({
  selector: 'app-snackbar-dialog',
  templateUrl: './snackbar-dialog.component.html',
  styleUrls: ['./snackbar-dialog.component.scss']
})
export class SnackbarDialogComponent implements OnInit {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) { }

  ngOnInit() {
    console.log(this.data);
  }

}
