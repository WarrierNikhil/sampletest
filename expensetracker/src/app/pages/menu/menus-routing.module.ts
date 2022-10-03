import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from '../../guard/auth.guard';
import { MenuCreateComponent } from './menu-create/menu-create.component';
import { MenuListComponent } from './menu-list/menu-list.component';

const routes: Routes = [
  { path: "", component: MenuCreateComponent, canActivate: [AuthGuard] },
  { path: "menu", component: MenuCreateComponent, canActivate: [AuthGuard] },
  { path: "menu-list", component: MenuListComponent, canActivate: [AuthGuard] },
  { path: "addsubmenu/:mainmenuid", component: MenuCreateComponent, canActivate: [AuthGuard] },
  { path: "edit/:menuid", component: MenuCreateComponent, canActivate: [AuthGuard] },
];
@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports:[RouterModule]
})
export class MenusRoutingModule {}
