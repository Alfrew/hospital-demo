import { Injectable } from "@angular/core";
import { AbstractControl, FormControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { PASSWORD_REGEX } from "@core";
import { TranslateService } from "@ngx-translate/core";

@Injectable({
  providedIn: "root",
})
export class InputValidationService {
  constructor(private translateService: TranslateService) {}

  public matchValidator(controlName: string, matchingControlName: string): ValidatorFn {
    return (abstractControl: AbstractControl) => {
      const control = abstractControl.get(controlName);
      const matchingControl = abstractControl.get(matchingControlName);
      if (matchingControl!.errors && !matchingControl!.errors["matchValidator"]) {
        return null;
      }
      if (control!.value !== matchingControl!.value) {
        const error = { matchValidator: true };
        matchingControl!.setErrors(error);
        return error;
      } else {
        matchingControl!.setErrors(null);
        return null;
      }
    };
  }

  public maxMoreThanMinValidator(minControlName: string, maxControlName: string): ValidatorFn {
    return (abstractControl: AbstractControl) => {
      const minControl = abstractControl.get(minControlName);
      const maxControl = abstractControl.get(maxControlName);
      if (maxControl!.errors && !maxControl!.errors["maxMoreThanMinValidator"]) {
        return null;
      }
      if (minControl!.value > maxControl!.value) {
        const error = { maxMoreThanMinValidator: true };
        maxControl!.setErrors(error);
        return error;
      } else {
        maxControl!.setErrors(null);
        return null;
      }
    };
  }

  public getValidationMessage(formControl: FormControl): string {
    switch (true) {
      case !formControl.errors:
        return "";

      case formControl.hasError("required"):
        return this.translateService.instant("common.validation.required");

      case formControl.hasError("minLength"):
        return this.translateService.instant("common.validation.minLength") + formControl.errors!["minlength"].requiredLength;

      case formControl.hasError("maxLength"):
        return this.translateService.instant("common.validation.maxLength") + formControl.errors!["maxlength"].requiredLength;

      case formControl.hasError("min"):
        return this.translateService.instant("common.validation.minValue") + formControl.errors!["min"].min;

      case formControl.hasError("max"):
        return this.translateService.instant("common.validation.maxValue") + formControl.errors!["max"].max;

      case this.hasSelectedRegexValidator(formControl.errors!, PASSWORD_REGEX):
        return this.translateService.instant("common.validation.passwordRegex");

      case formControl.hasError("matchValidator"):
        return this.translateService.instant("common.validation.matchPassword");

      case formControl.hasError("maxMoreThanMinValidator"):
        return this.translateService.instant("common.validation.maxMoreThanMinValidator");

      default:
        console.error("New validation message is required, check inside input-validation.service.ts");
        console.info(formControl.errors);
        return this.translateService.instant("common.validation.generic");
    }
  }

  private hasSelectedRegexValidator(validationErrors: ValidationErrors, selectedRegex: RegExp): boolean {
    if (validationErrors["pattern"] && validationErrors["pattern"].requiredPattern == selectedRegex) {
      return !selectedRegex.test(validationErrors["pattern"].actualValue);
    }
    return false;
  }
}
