import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { AuthService } from "../shared/auth.service";
import { SidebarService } from "../shared/sidebar.service";
import { sidemenu } from "../modal/sidemenu.model";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"]
})


export class SidebarComponent implements OnInit, OnDestroy {
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;
  private sidebarmenuListenerSubs: Subscription;
  sidebarmenu: sidemenu[] = [];
  constructor(
    private authService: AuthService,
    private sidemenuService: SidebarService
  ) {}

  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
    this.sidemenuService.getSideMenu();
    this.sidebarmenuListenerSubs = this.sidemenuService
      .getSidebarMenuListener()
      .subscribe((sidemenu: { SideBarMenus: sidemenu[] }) => {
        console.log(sidemenu);
        this.sidebarmenu = sidemenu.SideBarMenus;
      });
  }
  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
    this.sidebarmenuListenerSubs .unsubscribe();
  }
}
