import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NdcComponent } from './ndc.component';
import { CdkTableModule } from '@angular/cdk/table';
import { MatInputModule, MatTableModule, MatPaginatorModule, MatSortModule, MatProgressSpinnerModule, MatFormFieldModule, MatExpansionModule, MatDividerModule, MatListModule, MatStepperModule, MatTabsModule, MatButtonModule, MatSelectModule, MatDatepickerModule, MatCardModule, MatCheckboxModule, MatIconModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateNdcComponent } from './create-ndc/create-ndc.component';



const routes: Routes = [
  {
    path : '',
    component : NdcComponent,
    data: {
      title: 'Ndc Actions'
    },
    children :[
      {
        path : 'ndc',
        component : NdcComponent,
        data : {
          title: 'Ndc Actions'
        }
      }
    ]
  }
]


@NgModule({
  declarations: [NdcComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule, ReactiveFormsModule,

    //
    CdkTableModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatDividerModule,
    MatListModule,
    MatStepperModule,
    MatTabsModule,
    MatButtonModule,
    MatDatepickerModule,
    MatCardModule,
    MatCheckboxModule,
    MatIconModule,
    MatPaginatorModule
  ]
})
export class NdcModule { }
