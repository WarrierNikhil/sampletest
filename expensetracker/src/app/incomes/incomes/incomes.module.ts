import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncomesRoutingModule } from '../incomes-routing.module';
import { MatSortModule, MatNativeDateModule, MatDatepickerModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { IncomeCreateComponent } from '../income-create/income-create.component';
import { IncomeListComponent } from '../income-list/income-list.component';

@NgModule({
  declarations: [IncomeCreateComponent,IncomeListComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    RouterModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSortModule,
    IncomesRoutingModule  
  ]
})
export class IncomesModule { }
