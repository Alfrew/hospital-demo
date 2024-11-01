export interface TableActions {
  actionName: string;
  icon: string;
  tooltip: string;
  visible?: (element?: any) => boolean;
}

export interface Column {
  actions?: TableActions[];
  checkboxAll?: boolean;
  columnDef: string;
  header: string;
  isHidden?: boolean;
  isSortable?: boolean;
  isSticky?: boolean;
  sortProperty?: string;
  textAlign?: "center" | "left" | "right";
  translateRoute?: string;
  type?: "action" | "checkbox" | "custom" | "date" | "expand" | "link" | "translate";
  url?: string;
}
export interface SubTableColumn {
  actions?: TableActions[];
  columnDef: string;
  header: string;
  isHidden?: boolean;
  translateRoute?: string;
  type?: "action" | "custom" | "date" | "link" | "translate";
  url?: string;
}
