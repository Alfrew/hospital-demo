import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, forwardRef, Host, Input, type OnInit, Optional, SkipSelf } from "@angular/core";
import { ControlContainer, ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from "@angular/forms";

import { MatSelectModule } from "@angular/material/select";
import { InputValidationService } from "@core";
import { TranslateModule } from "@ngx-translate/core";
import { InputSelectOption } from "@shared";

@Component({
  selector: "mat-input-multi-select",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatSelectModule, TranslateModule],
  templateUrl: "./mat-input-multi-select.component.html",
  styleUrl: "./mat-input-multi-select.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatInputMultiSelectComponent implements OnInit, ControlValueAccessor {
  @Input() formControlName?: string;
  @Input() hasClearOption: boolean = false;
  @Input() isMultiple: boolean = false;
  @Input() label: string = "";
  @Input() multipleLimit?: number;
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
    this.formControlCreator();
    this.checkHasMultipleLimit();
  }

  /**
   * Used in `multiSelectInputs` to disable all the options that are not selected when the `multipleLimit` is reached.
   * @param optionValue the option value that will be checked and (maybe) disabled.
   * @returns a boolean, `true` if the `optionValue` is not part of the checked values and the
   * `multipleLimit` has been reached, `false` if one of the previous conditions is not valid.
   */
  public isOptionDisabled(optionValue: any): boolean {
    if (this.isMultiple && this.formControl!.value && !!this.multipleLimit) {
      return this.formControl!.value.length >= this.multipleLimit && !this.formControl!.value.find((value: any) => value == optionValue);
    } else {
      return false;
    }
  }

  /**
   * Used to enable the multiple selection if `multipleLimit` has a value.
   */
  private checkHasMultipleLimit() {
    this.isMultiple = !!this.multipleLimit;
  }

  public writeValue(obj: any): void {}
  public registerOnChange(fn: any): void {}
  public registerOnTouched(fn: any): void {}
  private formControlCreator() {
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
