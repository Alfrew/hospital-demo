export interface PatientsFilters {
  gender?: "male" | "female";
  maxAge?: number;
  maxBmi?: number;
  maxHeightCm?: number;
  maxWeightKg?: number;
  minAge?: number;
  minBmi?: number;
  minHeightCm?: number;
  minWeightKg?: number;
  isUnderRecommendedLevelOfActivity?: boolean;
}
