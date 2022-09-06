import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { sidemenu } from '../modal/sidemenu.model';
import { environment } from "../../environments/environment";
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
const BACKEND_URL = environment.apiUrl + "/menu";
@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  private SideBarMenus: sidemenu[] = [];
  private sidemenuListener = new Subject<any>();
  constructor(private http: HttpClient) { }
  getSideMenu(){
    this.http
    .get<{ message: string; result: any }>(BACKEND_URL + "/sidebarmenu")
    .pipe(
      map(menudata => {
        return {
          SidebarMenus: menudata.result.map(sidemenu => {
            return {
              id: sidemenu._id,
              menuname: sidemenu.menuname,
              path: sidemenu.path,
              submenu:sidemenu.submenus
            };
          })
        };
      })
    )
    .subscribe(result=>{
      this.SideBarMenus=result.SidebarMenus
      this.sidemenuListener.next({
        SideBarMenus: [...this.SideBarMenus]
      });
    });
  }
  getSidebarMenuListener() {
    return this.sidemenuListener.asObservable();
  }
}
