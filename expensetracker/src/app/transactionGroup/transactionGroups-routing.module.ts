import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from '../guard/auth.guard';
import { TransGroupCreateComponent } from './trans-group-create/trans-group-create.component';
import { TransGroupListComponent } from './trans-group-list/trans-group-list.component';

const routes: Routes = [
  { path: "", component: TransGroupCreateComponent, canActivate: [AuthGuard] },
  { path: "edit/:transGroupId", component: TransGroupCreateComponent, canActivate: [AuthGuard] },
  { path: "TransGroup-list", component: TransGroupListComponent, canActivate: [AuthGuard] },


  // { path: "edit/:expenseId", component: ExpenseCreateComponent, canActivate: [AuthGuard] },
];
@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports:[RouterModule]
})
export class TransactionGroupsRoutingModule {}
