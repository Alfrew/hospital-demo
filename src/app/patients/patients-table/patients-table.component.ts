import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { Column, MatPageToolbarComponent, MatTableComponent, SubTableColumn } from "@shared";
import { Patient, PatientActivity, PatientClass, PatientsFilterDialogComponent, PatientsFilters, PatientsService } from "@patients";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: "patients-table",
  standalone: true,
  imports: [CommonModule, MatTableComponent, MatPageToolbarComponent],
  templateUrl: "./patients-table.component.html",
  styleUrl: "./patients-table.component.scss",
  changeDetection: ChangeDetectionStrategy.Default,
})
export class PatientsTableComponent implements OnInit {
  patientsTableColumns: Column[] = [
    { columnDef: "expand", header: "", type: "expand" },
    { columnDef: "name", header: "patients.name", sortProperty: "name", isSortable: true },
    { columnDef: "gender", header: "patients.gender", sortProperty: "gender", isSortable: true, type: "translate", translateRoute: "common." },
    { columnDef: "age", header: "patients.age", sortProperty: "age", isSortable: true },
    { columnDef: "birthDate", header: "patients.birthDate", sortProperty: "birthDate", isSortable: true, type: "date" },
    { columnDef: "heightCm", header: "patients.heightCm", sortProperty: "heightCm", isSortable: true },
    { columnDef: "weightKg", header: "patients.weightKg", sortProperty: "weightKg", isSortable: true },
    { columnDef: "bmi", header: "patients.bmi", sortProperty: "bmi", isSortable: true },
  ];
  patientsSubTableColumns: SubTableColumn[] = [
    { columnDef: "activity", header: "patients.activity", type: "translate", translateRoute: "patients.activities." },
    { columnDef: "intensity", header: "patients.activityIntensity", type: "translate", translateRoute: "patients.intensities." },
    { columnDef: "minutes", header: "patients.activityMinutes" },
  ];
  patientsTableData: PatientClass[] = [];
  patientsSubTableData: PatientActivity[] = [];
  currentFilters: PatientsFilters = {};

  constructor(private patientsService: PatientsService, private matDialog: MatDialog) {}

  ngOnInit() {
    this.getPatients();
  }

  private getPatients() {
    this.patientsTableData = [];
    this.patientsService.getPatientsWithActivities(this.currentFilters).subscribe({
      next: (filteredPatients) => {
        this.patientsTableData = filteredPatients;
      },
    });
  }

  public expandSubTable(event: PatientClass) {
    this.patientsSubTableData = [...event.activities];
  }

  public openFilters() {
    const dialogRef = this.matDialog.open(PatientsFilterDialogComponent, {
      data: this.currentFilters,
    });

    dialogRef.afterClosed().subscribe((newFilters) => {
      this.currentFilters = newFilters;
      this.getPatients();
    });
  }
}
