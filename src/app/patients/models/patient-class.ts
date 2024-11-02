import { Patient, PatientActivity, typeIntensity } from "@patients";

export class PatientClass implements Patient {
  readonly id: number;
  readonly name: string;
  readonly gender: "male" | "female";
  readonly birthDate: string;
  readonly heightCm: number;
  readonly weightKg: number;
  readonly bmi: number;

  readonly activities: PatientActivity[];

  constructor(patient: Patient, patientActivities?: PatientActivity[]) {
    this.id = patient.id;
    this.name = patient.name;
    this.gender = patient.gender;
    this.birthDate = patient.birthDate;
    this.heightCm = patient.heightCm;
    this.weightKg = patient.weightKg;
    this.bmi = patient.bmi;

    this.activities = patientActivities ?? [];
  }

  get age(): number {
    return this.getAge();
  }

  get doesEnoughActivity(): boolean {
    return this.getDoesEnoughActivity();
  }

  private getAge() {
    if (this.birthDate) {
      const today = new Date();
      const birthDate = new Date(this.birthDate);
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    }
    return 0;
  }

  private getDoesEnoughActivity() {
    const doesNotHaveActivities = !this.activities || this.activities.length <= 0;
    if (doesNotHaveActivities) return false;

    const moderatePercentageOfActivity = this.calculatePercentageOfActivityPerIntensity(150, "moderate");
    const vigorousPercentageOfActivity = this.calculatePercentageOfActivityPerIntensity(75, "vigorous");
    const totalPercentageOfActivity = moderatePercentageOfActivity + vigorousPercentageOfActivity;
    return totalPercentageOfActivity >= 1;
  }

  private calculatePercentageOfActivityPerIntensity(goalMinutes: number, intensity: typeIntensity): number {
    let totalActivityMinutes: number = 0;
    this.activities
      .filter((act) => act.intensity == intensity)
      .forEach((act) => {
        totalActivityMinutes += act.minutes;
      });
    return totalActivityMinutes / goalMinutes;
  }
}
