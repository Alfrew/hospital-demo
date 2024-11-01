import { HttpClient } from "@angular/common/http";
import { WebApiTranslateLoader } from "./webApiTranslateLoader";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";

export function HttpLoaderFactory(http: HttpClient) {
  return new WebApiTranslateLoader(http);
}

export function HttpLocalLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}
