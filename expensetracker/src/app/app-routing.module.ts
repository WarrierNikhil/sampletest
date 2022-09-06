import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { AuthGuard } from "./guard/auth.guard";
import { ProfileComponent } from './pages/profile/profile.component';
import { MenuListComponent } from './pages/menu/menu-list/menu-list.component';
import { MenuComponent } from './pages/menu/menu/menu.component';


const routes: Routes = [
  {
    path: "auth",
    loadChildren: "./authentication/authentication.module#AuthenticationModule"
  },
  { path: "", component: DashboardComponent, canActivate: [AuthGuard] },
  { path: "profile", component: ProfileComponent, canActivate: [AuthGuard] },
  { path: "menu", component: MenuComponent, canActivate: [AuthGuard] },
  { path: "menu-list", component: MenuListComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
