import { Routes } from "@angular/router";
import { patientsRoutes } from "@patients";

export const routes: Routes = [
  ...patientsRoutes,
  { path: "", redirectTo: "/patients", pathMatch: "full" },
  { path: "**", redirectTo: "/patients" }
];
