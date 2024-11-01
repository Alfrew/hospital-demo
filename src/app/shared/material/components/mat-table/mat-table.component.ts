import { animate, state, style, transition, trigger } from "@angular/animations";
import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, ContentChild, EventEmitter, Input, Output, TemplateRef, ViewChild } from "@angular/core";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatIconModule } from "@angular/material/icon";
import { MatSort, MatSortModule, Sort } from "@angular/material/sort";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { MatTooltipModule } from "@angular/material/tooltip";
import { RouterModule } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { Column } from "src/app/shared/utils/table-utils";

@Component({
  selector: "mat-table",
  standalone: true,
  imports: [CommonModule, MatTableModule, MatSortModule, TranslateModule, MatIconModule, MatCheckboxModule, MatTooltipModule, RouterModule],
  templateUrl: "./mat-table.component.html",
  styleUrl: "./mat-table.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger("detailExpand", [
      state("collapsed", style({ height: "0px" })),
      state("expanded", style({ height: "*" })),
      transition("expanded <=> collapsed", animate("250ms cubic-bezier(0.4, 0.0, 0.2, 1)")),
    ]),
  ],
})
export class MatTableComponent {
  @Input() tableColumns: Column[] = [];
  @Input() subTableColumns: Column[] = [];
  @Input() tableData: any[] = [];
  @Input() subTableData: any[] = [];

  @Output() iconAction: EventEmitter<{ element: any; action: string }> = new EventEmitter<{ element: any; action: string }>();
  @Output() sortChange: EventEmitter<Sort> = new EventEmitter<Sort>();
  @Output() checkBoxAction: EventEmitter<{ element: any }> = new EventEmitter();
  @Output() checkBoxAllSelected: EventEmitter<boolean> = new EventEmitter();
  @Output() expandAction: EventEmitter<{ element: any }> = new EventEmitter();

  @ContentChild("custom", { static: false }) customTemplateRef!: TemplateRef<any>;
  @ViewChild(MatSort) sort!: MatSort;

  currentExpandedElement?: any;
  displayedColumns: Array<string> = [];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  dataSourceExpandableRow: MatTableDataSource<any> = new MatTableDataSource();

  constructor() {}

  ngAfterViewChecked() {
    this.dataSource.sortingDataAccessor = (item, property) => this.getCellValue(item, property);
    this.dataSource.sort = this.sort;
  }

  ngOnChanges(): void {
    this.displayedColumns = this.tableColumns.filter((c) => !c.isHidden).map((c) => c.columnDef);
    this.dataSource.data = this.tableData ?? [];
    this.dataSourceExpandableRow.data = this.subTableData ?? [];
  }

  public onRowClick(element: any) {
    if (this.currentExpandedElement == null || this.currentExpandedElement != element) {
      this.dataSourceExpandableRow.data = [];
      this.expandAction.emit({ element: element });
    }
    this.currentExpandedElement = this.currentExpandedElement === element ? null : element;
  }

  public emitSortChange(sortState: Sort) {
    this.updateTableColumns();
    this.sortChange.emit(sortState);
  }

  public emitIconAction(data: any, actionName: string) {
    this.iconAction.emit({ element: data, action: actionName });
  }

  public emitCheckBoxAction(data: any) {
    data.checked = !data.checked;
    this.checkBoxAction.emit(data);
  }

  public getSelectableColumns() {
    return this.tableColumns.filter((c) => c.header.length > 0);
  }

  private updateTableColumns() {
    this.tableColumns.map((col: Column) => {
      if (!this.displayedColumns.includes(col.columnDef) && col.header.length > 0) {
        col.isHidden = true;
      } else if (this.displayedColumns.includes(col.columnDef) && col.header.length > 0) {
        col.isHidden = false;
      }
    });
  }

  public getSubTableColumns() {
    return this.subTableColumns.map((c) => c.columnDef);
  }

  public getCellValue(item: any, property: string) {
    let resultValue = item;

    const colDefDepth = property.split(".");
    for (let depth of colDefDepth) {
      resultValue = resultValue[depth];

      if (resultValue == undefined || resultValue == null) return "";
    }

    return resultValue;
  }

  public getTranslateCellValue(item: any, property: string, translateRoute: string) {
    let resultValue = item;

    const colDefDepth = property.split(".");
    for (let depth of colDefDepth) {
      resultValue = resultValue[depth];

      if (resultValue == undefined || resultValue == null) return "";
    }

    return translateRoute + resultValue;
  }

  public isAllSelected() {
    const numRows = this.dataSource.data.length;
    if (numRows == 0) return -1;

    let numSelected = this.dataSource.data.filter((item) => item.checked).length;
    if (numSelected == 0) return -1;

    return numSelected === numRows ? 0 : 1;
  }

  public toggleAllRows() {
    const numRows = this.dataSource.data.length;
    if (numRows == 0) return;

    let allSelected = this.isAllSelected() == 0;

    this.dataSource.data = this.dataSource.data.map((item) => ({ ...item, checked: !allSelected }));

    this.checkBoxAllSelected.emit(!allSelected);
  }

  public returnColumnClass(column: Column): { [klass: string]: any } {
    let classes: { [klass: string]: any } = {};
    switch (column.textAlign) {
      case "left":
        classes["align-left"] = true;
        break;
      case "right":
        classes["align-right"] = true;
        break;
      default:
        classes["align-center"] = true;
        break;
    }
    return classes;
  }
}
