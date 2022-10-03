import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";

import { MainMenu} from "../modal/menu.model";
import { map } from "rxjs/operators";
import { Subject, Subscription } from "rxjs";
import { Router } from '@angular/router';
const BACKEND_URL = environment.apiUrl + "/menu";
@Injectable({
  providedIn: "root"
})
export class MenuService {
  private MainMenus: MainMenu[] = [];
  private menusUpdated = new Subject<any>();
  //private mainMenuSub: Subscription;
  constructor(private http: HttpClient,private router: Router) {}

  getMenuUpadateListner() {
    return this.menusUpdated.asObservable();
  }

  getMenuList() {
    this.http
      .get<{ message: string; result: any }>(BACKEND_URL + "/mainmenu")
      .pipe(
        map(menudata => {
          return {
            MainMenus: menudata.result.map(mainmenu => {
              return {
                id: mainmenu._id,
                menuname: mainmenu.menuname,
                path: mainmenu.path,
                iconname:mainmenu.iconname,
                status :mainmenu.status,
                children:mainmenu.children.map(submenu=>{
                  return{
                    id: submenu._id,
                    menuname: submenu.menuname,
                    path: submenu.path,
                    iconname:submenu.iconname,
                    status :submenu.status,
                  };
                })
              };
            })
          };
        })
      )
      .subscribe(result => {
        this.MainMenus = result.MainMenus;

        this.menusUpdated.next({
          MainMenus: [...this.MainMenus]
        });
      });
  }

  createMainMenu(menuname: string,iconname:string, path: string,status:boolean) {
    const menudata: MainMenu = { id: null, menuname, iconname,path,status };
    this.http
      .post<{ message: string; result: any }>(
        BACKEND_URL + "/mainmenu",
        menudata
      )
      .subscribe(result => {
        this.MainMenus.push(result.result);
        this.menusUpdated.next({
          MainMenus: [...this.MainMenus]
        });
        this.router.navigate(["/menu/menu-list"]);
      });
  }
  createSubMenu(menuname: string,iconname:string, path: string,status:boolean,mainMenuId:string) {
    const menudata: MainMenu = { id: null, menuname, iconname,path,status };
    const queryParams = `?mainMenuId=${mainMenuId}`;
    this.http.post<{message: string; result: any}>(BACKEND_URL + "/submenu"+queryParams,menudata)
    .subscribe(result=>{
      this.router.navigate(["/menu/menu-list"]);
    });
  }
}
