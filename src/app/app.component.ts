import { Component } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MenuItem } from "@shared";
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
  title = "hospital-demo";

  constructor(public translateService: TranslateService) {
    translateService.setDefaultLang("en");
    translateService.use("en");
  }

  changeLanguage(language: string) {
    this.translateService.use(language);
  }
}