import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionGroupsRoutingModule } from '../transactionGroups-routing.module';
import { MatSortModule, MatNativeDateModule, MatDatepickerModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import {TransGroupCreateComponent} from '../trans-group-create/trans-group-create.component';
import{ TransGroupListComponent} from '../trans-group-list/trans-group-list.component';

@NgModule({
  declarations: [TransGroupCreateComponent,TransGroupListComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    RouterModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSortModule,
    TransactionGroupsRoutingModule
  ]
})
export class TransGroupsModule { }
