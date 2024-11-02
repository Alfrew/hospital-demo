import { Component } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { RouterOutlet } from "@angular/router";
import { TranslateModule, TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, TranslateModule, MatIconModule],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent {
  constructor(private translateService: TranslateService) {
    translateService.setDefaultLang("en");
    translateService.use("en");
  }

  changeLanguage(language: string) {
    this.translateService.use(language);
  }
}
