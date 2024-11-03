import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from "@angular/core";
import { provideRouter } from "@angular/router";

import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { routes } from "./app.routes";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { HttpLoaderFactory, HttpLocalLoaderFactory } from "@core";
import { HttpClient, provideHttpClient } from "@angular/common/http";
import { MAT_DIALOG_DEFAULT_OPTIONS, MatDialogConfig } from "@angular/material/dialog";

export const provideTranslation = () => ({
  loader: {
    provide: TranslateLoader,
    useFactory: HttpLocalLoaderFactory,
    deps: [HttpClient],
  },
});

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(),
    importProvidersFrom([TranslateModule.forRoot(provideTranslation())]),
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS,
      useValue: {
        ...new MatDialogConfig(),
        disableClose: true,
        minWidth: "50vw",
      } as MatDialogConfig,
    },
  ],
};
