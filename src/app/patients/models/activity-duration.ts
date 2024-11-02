import { typeActivity } from "@patients";

export interface ActivityDuration {
  patientId: number;
  activity: typeActivity;
  minutes: number;
}
