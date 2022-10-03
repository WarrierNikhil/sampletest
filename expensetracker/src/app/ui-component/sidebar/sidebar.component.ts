import { Component, OnInit, OnDestroy, ElementRef, ViewChild, AfterViewInit, ViewEncapsulation } from "@angular/core";
import { Subscription } from "rxjs";
import { SidebarService } from "../../shared/sidebar.service";
//import { sidemenu } from "../../modal/sidemenu.model";
import { AuthService } from 'src/app/shared/auth.service';
import { NavdrawerService } from 'src/app/shared/navdrawer.service';
//import { SideNavItem } from 'src/app/modal/sidenav-item.model';
import { menuconfig } from 'src/app/data/menu';
import { MenuService } from 'src/app/shared/menu.service';
import { MainMenu } from 'src/app/modal/menu.model';
@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"],
  encapsulation: ViewEncapsulation.None
})


export class SidebarComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('appDrawer', { static: false }) appDrawer: ElementRef;
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;
  //private sidebarmenuListenerSubs: Subscription;
  //sidebarmenu: sidemenu[] = [];
  //navItems =new menuconfig().navItems;
  navItems:MainMenu[]
  private mainMenuSub: Subscription;
    constructor(
      private authService: AuthService,
      private menuListService: MenuService,
      private navService: NavdrawerService
    ) { }

ngOnInit() {
  this.userIsAuthenticated = this.authService.getIsAuth();
  this.authListenerSubs = this.authService
    .getAuthStatusListener()
    .subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
    });
  //this.sidemenuService.getSideMenu();
  // this.sidebarmenuListenerSubs = this.sidemenuService
  //   .getSidebarMenuListener()
  //   .subscribe((sidemenu: { SideBarMenus: sidemenu[] }) => {
  //     this.sidebarmenu = sidemenu.SideBarMenus;
  //   });

  this.menuListService.getMenuList();

  this.mainMenuSub = this.menuListService
    .getMenuUpadateListner()
    .subscribe((menuData: { MainMenus: MainMenu[] }) => {
      this.navItems = menuData.MainMenus;
      //this.isLoading=false;
    });
}
ngOnDestroy() {
  this.authListenerSubs.unsubscribe();
  //this.sidebarmenuListenerSubs.unsubscribe();
}
ngAfterViewInit() {
  this.navService.appDrawer = this.appDrawer;
}

}
