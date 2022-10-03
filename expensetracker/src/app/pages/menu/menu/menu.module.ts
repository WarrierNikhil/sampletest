import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenusRoutingModule } from '../menus-routing.module';
import { MatSortModule, MatNativeDateModule, MatDatepickerModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module';
import { MenuCreateComponent } from '../menu-create/menu-create.component';
import { MenuListComponent } from '../menu-list/menu-list.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [MenuCreateComponent,MenuListComponent],
  imports: [
    CommonModule,
    AngularMaterialModule,
    RouterModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSortModule,
    MenusRoutingModule,
    FormsModule
  ]
})
export class MenuModule { }
