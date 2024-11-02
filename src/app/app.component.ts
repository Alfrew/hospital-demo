import { Component } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { RouterOutlet } from "@angular/router";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { MatLoaderComponent } from "@shared";
import { AppStatusService } from "@core";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, TranslateModule, MatIconModule, MatLoaderComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent {
  isSpinnerVisible: boolean = false;

  constructor(private translateService: TranslateService, private appStatusService: AppStatusService) {
    translateService.setDefaultLang("en");
    translateService.use("en");
    this.subscriberToSpinnerStatus();
  }

  subscriberToSpinnerStatus() {
    this.appStatusService.isSpinnerVisible.subscribe((value) => (this.isSpinnerVisible = value));
  }

  changeLanguage(language: string) {
    this.translateService.use(language);
  }
}
