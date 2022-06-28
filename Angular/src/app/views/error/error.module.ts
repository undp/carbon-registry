import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { P404Component } from './404.component';



@NgModule({
  declarations: [P404Component],
  exports : [P404Component],
  imports: [
    CommonModule
  ]
})
export class ErrorModule { }
