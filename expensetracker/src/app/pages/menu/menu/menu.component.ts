import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { MenuService } from "src/app/shared/menu.service";
import { Subscription } from "rxjs";
import { MainMenu } from "src/app/modal/menu.model";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.css"]
})
export class MenuComponent implements OnInit {
  isLoading = false;
  private mainMenuSub: Subscription;
  mainMenus: MainMenu[] = [];
  menuTypeSelected = "M";
  disableSubmenu = true;
  constructor(private menuService: MenuService) {}

  ngOnInit() {
    this.isLoading = true;
    this.menuService.getMenuList();

    this.mainMenuSub = this.menuService
      .getMenuUpadateListner()
      .subscribe((menuData: { MainMenus: MainMenu[] }) => {
        this.mainMenus = menuData.MainMenus;
        this.isLoading = false;
        if(this.mainMenus.length>0){
          this.disableSubmenu=false
        }
      });
    //console.log(this.mainMenus)
  }

  onSaveMenu(menuForm: NgForm) {
    if (menuForm.invalid) {
      return;
    }
    this.menuService.createMainMenu(
      menuForm.value.menuname,
      menuForm.value.path
    );
    menuForm.resetForm();
  }
  onSaveSubMenu(subMenuForm: NgForm) {
    this.menuService.createSubMenu(subMenuForm.value.mainmenu,subMenuForm.value.submenuname,subMenuForm.value.path);
  }
}
