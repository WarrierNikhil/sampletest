import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { MenuService } from "src/app/shared/menu.service";
import { Subscription } from "rxjs";
import { MainMenu } from "src/app/modal/menu.model";
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-menu-create',
  templateUrl: './menu-create.component.html',
  styleUrls: ['./menu-create.component.css']
})
export class MenuCreateComponent implements OnInit {

  isLoading = false;
  private mainMenuSub: Subscription;
  mainMenus: MainMenu[] = [];
  private mode = "create";
  private id= "";
  constructor(private menuService: MenuService,public route: ActivatedRoute) {}

  ngOnInit() {
    this.isLoading = true;
    this.menuService.getMenuList();
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('mainmenuid')) {
          this.mode="addsubmenu";
          this.id = paramMap.get('mainmenuid');
      }
      else if(paramMap.has('menuid')){
        this.mode="edit";
        this.id = paramMap.get('menuid');
      }

    });



    this.mainMenuSub = this.menuService
      .getMenuUpadateListner()
      .subscribe((menuData: { MainMenus: MainMenu[] }) => {
        this.mainMenus = menuData.MainMenus;
        this.isLoading = false;
      });
  }

  onSaveMenu(menuForm: NgForm) {
    if (menuForm.invalid) {
      return;
    }
    if(this.mode=="create"){
    this.menuService.createMainMenu(
      menuForm.value.menuname,
      menuForm.value.iconname,
      menuForm.value.path,
      menuForm.value.status
    );
  }
    else if(this.mode=="addsubmenu"){
      this.menuService.createSubMenu(menuForm.value.menuname,
        menuForm.value.iconname,
        menuForm.value.path,
        menuForm.value.status,
        this.id
      );
    }
    else if(this.mode=="edit"){

    }
    // menuForm.resetForm();
  }

}
