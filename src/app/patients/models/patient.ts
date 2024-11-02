export interface Patient {
  id: number;
  name: string;
  gender: "male" | "female";
  birthDate: string;
  heightCm: number;
  weightKg: number;
  bmi: number;
}
