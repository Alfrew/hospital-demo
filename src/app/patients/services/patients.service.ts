import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, mergeMap, Observable } from "rxjs";
import { ActivityDuration, ActivityIntensity, Patient, PatientActivity, PatientClass, PatientsFilters, typeIntensity } from "@patients";

@Injectable({
  providedIn: "root",
})
export class PatientsService {
  private apiUrl = "http://localhost:4201";
  private activitiesIntensityMap: { [key: string]: typeIntensity } = {};

  constructor(private http: HttpClient) {
    this.getActivityIntensities().subscribe({
      next: (activities) => {
        this.createActivitiesIntensityMap(activities);
      },
    });
  }

  public getPatientsWithActivities(filters: PatientsFilters): Observable<PatientClass[]> {
    return this.getAllPatientsWithActivities().pipe(
      map((patients) =>
        patients.filter(
          (patient) =>
            (filters.maxAge ? filters.maxAge >= patient.age : true) &&
            (filters.minAge ? filters.minAge <= patient.age : true) &&
            (filters.gender ? filters.gender == patient.gender : true) &&
            (filters.maxBmi ? filters.maxBmi >= patient.bmi : true) &&
            (filters.minBmi ? filters.minBmi <= patient.bmi : true) &&
            (filters.maxHeightCm ? filters.maxHeightCm >= patient.heightCm : true) &&
            (filters.minHeightCm ? filters.minHeightCm <= patient.heightCm : true) &&
            (filters.maxWeightKg ? filters.maxWeightKg >= patient.weightKg : true) &&
            (filters.minWeightKg ? filters.minWeightKg <= patient.weightKg : true) &&
            (filters.isUnderRecommendedLevelOfActivity ? !patient.doesEnoughActivity : true)
        )
      )
    );
  }

  private getAllPatientsWithActivities(): Observable<PatientClass[]> {
    return this.http.get<Patient[]>(`${this.apiUrl}/patients`).pipe(mergeMap((patients) => this.addActivitiesToPatients(patients)));
  }

  private addActivitiesToPatients(patients: Patient[]): Observable<PatientClass[]> {
    return this.getPatientsActivities().pipe(
      map((activities) =>
        patients.map((patient) => {
          return new PatientClass(
            patient,
            activities.filter((act) => act.patientId == patient.id)
          );
        })
      )
    );
  }

  private getAllPatients(): Observable<PatientClass[]> {
    return this.http.get<Patient[]>(`${this.apiUrl}/patients`).pipe(
      map((results) =>
        results.map((el) => {
          return new PatientClass(el);
        })
      )
    );
  }

  private getActivityIntensities(): Observable<ActivityIntensity[]> {
    return this.http.get<ActivityIntensity[]>(`${this.apiUrl}/activities`);
  }

  private createActivitiesIntensityMap(activityIntensity: ActivityIntensity[]) {
    activityIntensity.forEach((act) => {
      this.activitiesIntensityMap[act.activity] = act.intensity;
    });
  }

  private getPatientsActivities(): Observable<PatientActivity[]> {
    return this.http.get<ActivityDuration[]>(`${this.apiUrl}/patientsActivities`).pipe(
      map(
        (activities) =>
          (activities = activities.map((activity) => {
            let newActivity: PatientActivity = {
              patientId: activity.patientId,
              activity: activity.activity,
              minutes: activity.minutes,
              intensity: this.activitiesIntensityMap[activity.activity],
            };
            return newActivity;
          }))
      )
    );
  }

  private getPatientsActivitiesById(patientId: number): Observable<PatientActivity[]> {
    return this.http.get<ActivityDuration[]>(`${this.apiUrl}/patientsActivities`).pipe(
      map((activities) =>
        activities
          .filter((act) => act.patientId == patientId)
          .map((activity) => {
            let newActivity: PatientActivity = {
              patientId: activity.patientId,
              activity: activity.activity,
              minutes: activity.minutes,
              intensity: this.activitiesIntensityMap[activity.activity],
            };
            return newActivity;
          })
      )
    );
  }
}
