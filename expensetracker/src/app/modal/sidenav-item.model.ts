export interface SideNavItem {
    displayName: string;
    disabled?: boolean;
    iconName: string;
    route?: string;
    children?: SideNavItem[];
  }
  