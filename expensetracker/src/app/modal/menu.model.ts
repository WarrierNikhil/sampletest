export interface MainMenu {
  id: string;
  menuname: string;
  path: string;
}

export interface SubMenu {
  menuname: string;
  path: string;
  mainmenuId:string;
}
