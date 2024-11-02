import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AppStatusService {
  isSpinnerVisible: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructorChecks() {}

  hideSpinner() {
    this.isSpinnerVisible.next(false);
  }

  showSpinner() {
    this.isSpinnerVisible.next(true);
  }
}
