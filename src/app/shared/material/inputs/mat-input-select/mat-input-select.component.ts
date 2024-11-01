import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, forwardRef, Host, Input, type OnInit, Optional, SkipSelf } from "@angular/core";
import { ControlContainer, ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from "@angular/forms";

import { MatSelectModule } from "@angular/material/select";
import { InputValidationService } from "@core";
import { TranslateModule } from "@ngx-translate/core";
import { InputSelectOption } from "@shared";

@Component({
  selector: "mat-input-select",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatSelectModule, TranslateModule],
  templateUrl: "./mat-input-select.component.html",
  styleUrl: "./mat-input-select.component.scss",
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MatInputSelectComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatInputSelectComponent implements OnInit, ControlValueAccessor {
  @Input() formControlName?: string;
  @Input() label: string = "";
  @Input() optionList: InputSelectOption[] = [];
  @Input() placeholder: string = "";

  formControl?: FormControl;
  errorMessage: string = "";

  constructor(
    @Optional()
    @Host()
    @SkipSelf()
    private controlContainer: ControlContainer,
    private inputValidationService: InputValidationService
  ) {}

  ngOnInit() {
    this.generateFormControl();
  }

  public writeValue(obj: any): void {}
  public registerOnChange(fn: any): void {}
  public registerOnTouched(fn: any): void {}
  private generateFormControl() {
    if (this.formControlName) {
      if (this.controlContainer) {
        this.formControl = this.controlContainer.control!.get(this.formControlName) as FormControl;
        this.subscribeControlEvents();
      } else {
        console.error("Can't find parent FormGroup directive");
      }
    }
  }

  private subscribeControlEvents() {
    this.formControl!.events.subscribe({
      next: () => {
        this.errorMessage = this.inputValidationService.getValidationMessage(this.formControl!);
      },
    });
  }
}
