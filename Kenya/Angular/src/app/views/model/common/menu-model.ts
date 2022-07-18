export interface MenuModel {
  menuId?: string;
  label?: string;
  url?: string;
  icon?: string;
  entity?: string;
  isMain?: boolean;
  children?: [];
  isActive?: boolean;
  isPermissionType?: boolean;
  group?: string;

  permissionMenuId?: any;
  // used for ghg menu
  sector?: string;
  subSector?: string;
  category?: string;
  subCategory?: string;
  moduleName?:string; // to be set in UI only
}
