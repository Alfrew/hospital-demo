import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, forwardRef, Host, Input, OnInit, Optional, SkipSelf } from "@angular/core";
import { ControlContainer, ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { TranslateModule } from "@ngx-translate/core";
import { InputValidationService } from "@core";

@Component({
  selector: "mat-input-number",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatInputModule, TranslateModule],
  templateUrl: "./mat-input-number.component.html",
  styleUrl: "./mat-input-number.component.scss",
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MatInputNumberComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatInputNumberComponent implements OnInit, ControlValueAccessor {
  @Input() formControlName?: string;
  @Input() isCurrency: boolean = false;
  @Input() isPercentage: boolean = false;
  @Input() label: string = "";
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
