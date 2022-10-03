import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from '../guard/auth.guard';
import { IncomeCreateComponent } from './income-create/income-create.component';
import { IncomeListComponent } from './income-list/income-list.component';

const routes: Routes = [
  { path: "", component: IncomeCreateComponent, canActivate: [AuthGuard] },
  { path: "edit/:incomeId", component: IncomeCreateComponent, canActivate: [AuthGuard] },
  { path: "Income-list", component: IncomeListComponent, canActivate: [AuthGuard] },


  // { path: "edit/:expenseId", component: ExpenseCreateComponent, canActivate: [AuthGuard] },
];
@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports:[RouterModule]
})
export class IncomesRoutingModule {}
