import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, Inject } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { InputSelectOption, MatFlatButtonComponent, MatHollowButtonComponent, MatInputNumberComponent, MatInputSelectComponent } from "@shared";
import { PatientsFilters } from "@patients";
import { TranslateModule } from "@ngx-translate/core";
import { MatCheckboxModule } from "@angular/material/checkbox";

@Component({
  selector: "patients-filter-dialog",
  standalone: true,
  imports: [
    CommonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatFlatButtonComponent,
    MatHollowButtonComponent,
    MatInputNumberComponent,
    MatInputSelectComponent,
    ReactiveFormsModule,
    TranslateModule,
  ],
  templateUrl: "./patients-filter-dialog.component.html",
  styleUrl: "./patients-filter-dialog.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PatientsFilterDialogComponent {
  genderSelectList: InputSelectOption[] = [
    { value: "male", viewValue: "common.male" },
    { value: "female", viewValue: "common.female" },
  ];

  filterForm: FormGroup = new FormGroup({
    gender: new FormControl(null),
    isUnderRecommendedLevelOfActivity: new FormControl(false),
    minAge: new FormControl(null, [Validators.min(0), Validators.max(130)]),
    maxAge: new FormControl(null, [Validators.min(0), Validators.max(130)]),
    minBmi: new FormControl(null, [Validators.min(0), Validators.max(100)]),
    maxBmi: new FormControl(null, [Validators.min(0), Validators.max(100)]),
    minHeightCm: new FormControl(null, [Validators.min(0), Validators.max(250)]),
    maxHeightCm: new FormControl(null, [Validators.min(0), Validators.max(250)]),
    minWeightKg: new FormControl(null, [Validators.min(0), Validators.max(300)]),
    maxWeightKg: new FormControl(null, [Validators.min(0), Validators.max(300)]),
  });

  constructor(private dialogRef: MatDialogRef<PatientsFilterDialogComponent>, @Inject(MAT_DIALOG_DATA) private patientsFilters: PatientsFilters) {
    this.updateFilterFormValues();
  }

  private updateFilterFormValues() {
    this.filterForm.patchValue({
      gender: this.patientsFilters.gender,
      maxAge: this.patientsFilters.maxAge,
      maxBmi: this.patientsFilters.maxBmi,
      maxHeightCm: this.patientsFilters.maxHeightCm,
      maxWeightKg: this.patientsFilters.maxWeightKg,
      minAge: this.patientsFilters.minAge,
      minBmi: this.patientsFilters.minBmi,
      minHeightCm: this.patientsFilters.minHeightCm,
      minWeightKg: this.patientsFilters.minWeightKg,
      isUnderRecommendedLevelOfActivity: this.patientsFilters.isUnderRecommendedLevelOfActivity,
    });
  }

  public applyFilters() {
    if (this.filterForm.valid) {
      const newFilters: PatientsFilters = this.filterForm.value;
      this.dialogRef.close(newFilters);
    }
  }

  public resetFilters() {
    this.filterForm.setValue({
      gender: null,
      maxAge: null,
      maxBmi: null,
      maxHeightCm: null,
      maxWeightKg: null,
      minAge: null,
      minBmi: null,
      minHeightCm: null,
      minWeightKg: null,
      isUnderRecommendedLevelOfActivity: false,
    });
  }
}
