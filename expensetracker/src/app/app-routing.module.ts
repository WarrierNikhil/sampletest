import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { AuthGuard } from "./guard/auth.guard";
import { ProfileComponent } from './pages/profile/profile.component';
import { MenuListComponent } from './pages/menu/menu-list/menu-list.component';
//import { MenuComponent } from './pages/menu/menu/menu.component';
import { ExpenseListComponent } from './expenses/expense-list/expense-list.component';


const routes: Routes = [
  {
    path: "auth",
    loadChildren: "./authentication/authentication.module#AuthenticationModule"
  },
  {
    path: "expense",
    loadChildren: "./expenses/expenses/expenses.module#ExpensesModule"
  },
  {
    path: "income",
    loadChildren: "./incomes/incomes/incomes.module#IncomesModule"
  },
  {
    path: "transGroup",
    loadChildren: "./transactionGroup/trans-groups/trans-groups.module#TransGroupsModule"
  },
  {
    path: "menu",
    loadChildren: "./pages/menu/menu/menu.module#MenuModule"
  },
  { path: "", component: DashboardComponent, canActivate: [AuthGuard] },
  { path: "dashboard", component: DashboardComponent, canActivate: [AuthGuard] },
  { path: "profile", component: ProfileComponent, canActivate: [AuthGuard] },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[AuthGuard]
})
export class AppRoutingModule { }
