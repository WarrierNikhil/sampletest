import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";

import { MainMenu, SubMenu } from "../modal/menu.model";
import { map } from "rxjs/operators";
import { Subject, Subscription } from "rxjs";
const BACKEND_URL = environment.apiUrl + "/menu";
@Injectable({
  providedIn: "root"
})
export class MenuService {
  private MainMenus: MainMenu[] = [];
  private menusUpdated = new Subject<any>();
  //private mainMenuSub: Subscription;
  constructor(private http: HttpClient) {}

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
                path: mainmenu.path
              };
            })
          };
        })
      )
      .subscribe(result => {
        console.log(result.MainMenus, "from getmenu list");
        this.MainMenus = result.MainMenus;

        this.menusUpdated.next({
          MainMenus: [...this.MainMenus]
        });
      });
  }

  createMainMenu(menuname: string, path: string) {
    const menudata: MainMenu = { id: null, menuname, path };
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
      });
  }
  createSubMenu(mainMenuId: string, subMenuName: string, subMenuPath: string) {
    const submenuData: SubMenu = {
      mainmenuId: mainMenuId,
      menuname: subMenuName,
      path: subMenuPath
    };
    this.http.post<{message: string; result: any}>(BACKEND_URL + "/submenu",submenuData)
    .subscribe(result=>{
      console.log(result);
    });
  }
}
