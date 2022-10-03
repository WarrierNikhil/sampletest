import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { Routes, RouterModule } from "@angular/router";
import { ExpenseCreateComponent } from './expense-create/expense-create.component';
import { AuthGuard } from '../guard/auth.guard';
import { ExpenseListComponent } from './expense-list/expense-list.component';

const routes: Routes = [
  { path: "", component: ExpenseCreateComponent, canActivate: [AuthGuard] },
  { path: "edit/:expenseId", component: ExpenseCreateComponent, canActivate: [AuthGuard] },
  { path: "expense-list", component: ExpenseListComponent, canActivate: [AuthGuard] }
];
@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports:[RouterModule]
})
export class ExpensesRoutingModule {}
