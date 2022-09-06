import { Component, OnInit, OnDestroy } from "@angular/core";
import { MenuService } from "src/app/shared/menu.service";
import { Subscription } from "rxjs";
import { MainMenu } from "src/app/modal/menu.model";

@Component({
  selector: "app-menu-list",
  templateUrl: "./menu-list.component.html",
  styleUrls: ["./menu-list.component.css"]
})
export class MenuListComponent implements OnInit, OnDestroy {
  isLoading = false;
  private mainMenuSub: Subscription;
  mainMenus: MainMenu[] = [];
  constructor(private menuListService: MenuService) {}

  ngOnInit() {
    this.isLoading=true;
    this.menuListService.getMenuList();

    this.mainMenuSub = this.menuListService
      .getMenuUpadateListner()
      .subscribe((menuData: { MainMenus: MainMenu[] }) => {
        this.mainMenus = menuData.MainMenus;
        this.isLoading=false;
      });
    //console.log(this.mainMenus)
  }
  ngOnDestroy() {
    this.mainMenuSub.unsubscribe();
  }
}
