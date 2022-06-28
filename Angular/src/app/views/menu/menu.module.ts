import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { RouterModule, Routes } from '@angular/router';
import { MatBadgeModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatSelectModule } from '@angular/material';
import { DragulaModule } from 'ng2-dragula';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path : '',
    component : MenuComponent,
    data: {
      title: 'Menu'
    }
  }
]

@NgModule({
  declarations: [MenuComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCardModule,
    MatButtonModule,
    MatBadgeModule,
    DragulaModule.forRoot(),
  ]
})
export class MenuModule { }
