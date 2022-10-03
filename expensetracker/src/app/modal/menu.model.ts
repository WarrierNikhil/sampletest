export interface MainMenu {
  id: string;
  menuname: string;
  iconname:string;
  status :boolean;
  path: string;
  children?:MainMenu[];
}

