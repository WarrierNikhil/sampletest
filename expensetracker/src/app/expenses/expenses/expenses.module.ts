import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpenseCreateComponent } from '../expense-create/expense-create.component';
import { ExpenseListComponent } from '../expense-list/expense-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module';
import { RouterModule } from '@angular/router';
import { MatDatepickerModule, MatNativeDateModule, MatSortModule } from '@angular/material';
import { ExpensesRoutingModule } from '../expenses-routing.module';

@NgModule({
  declarations: [ExpenseCreateComponent,ExpenseListComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    RouterModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSortModule,
    ExpensesRoutingModule     
  ]
})
export class ExpensesModule { }
