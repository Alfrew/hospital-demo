import { Routes } from "@angular/router";

export const patientsRoutes: Routes = [
  {
    path: "patients",
    loadComponent: () => import("./patients-table/patients-table.component").then((c) => c.PatientsTableComponent),
  },
];
