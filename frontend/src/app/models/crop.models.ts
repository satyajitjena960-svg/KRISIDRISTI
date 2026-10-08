export interface Diagnosis {
  id?: number;
  farmerId?: number;
  farmPlotId?: number;
  cropType: string;
  diseaseName: string;
  scientificName?: string;
  confidenceScore: number;
  severityPercentage: number;
  severityLevel: 'MILD' | 'MODERATE' | 'SEVERE';
  symptoms: string[];
  possibleCauses: string[];
  biologicalControl: string[];
  chemicalControl: string[];
  preventiveMeasures: string[];
  safetyDisclaimer: string;
  imageUrl?: string;
  diagnosisDate?: string;
  followUpDueDate?: string;
  status: string;
  isEscalated: boolean;
  expertNotes?: string;
  district?: string;
}

export interface FarmPlot {
  id?: number;
  farmerId: number;
  plotName: string;
  cropType: string;
  variety: string;
  acreage: number;
  plantingDate: string;
  location: string;
  soilType: string;
  irrigationType: string;
  previousDiseases?: string;
  treatmentsApplied?: string;
}

export interface FollowUpRecord {
  id?: number;
  diagnosisId: number;
  farmerId?: number;
  diseaseName?: string;
  cropType?: string;
  followUpDate?: string;
  previousSeverity: number;
  currentSeverity: number;
  severityChangePercent: number;
  conditionStatus: 'IMPROVING' | 'STABLE' | 'WORSENING';
  treatmentApplied: string;
  farmerObservations: string;
  followUpImageUrl?: string;
}

export interface CropHealthHistory {
  id?: number;
  farmPlotId: number;
  cropName: string;
  checkDate: string;
  healthStage: string;
  severityPercent: number;
  symptomsObserved: string;
  imageUrl: string;
  actionsTaken: string;
}

export interface WeatherRiskAssessment {
  id?: number;
  cropType: string;
  district: string;
  state: string;
  temperatureC: number;
  humidityPercent: number;
  rainfallMm: number;
  weatherCondition: string;
  forecastSummary: string;
  riskLevel: 'HIGH' | 'MODERATE' | 'LOW';
  riskScore: number;
  primaryVulnerableDisease: string;
  riskWarning: string;
  preventiveAdvice: string;
  assessedAt?: string;
}

export interface OutbreakRecord {
  id?: number;
  state: string;
  district: string;
  primaryDisease: string;
  affectedCrop: string;
  reportedCases: number;
  alertLevel: 'OUTBREAK_WARNING' | 'WATCH' | 'NORMAL';
  latitude: number;
  longitude: number;
  lastUpdated?: string;
}

export interface NotificationAlert {
  id?: number;
  farmerId?: number;
  title: string;
  message: string;
  alertType: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  isRead: boolean;
  createdAt?: string;
  actionRoute?: string;
}

export interface AnalyticsDashboard {
  totalFarmers: number;
  totalDiseaseCases: number;
  mostReportedDisease: string;
  highRiskRegion: string;
  casesThisWeekGrowthPercent: number;
  expertReviewsCompleted: number;
  pendingEscalations: number;
  treatmentSuccessRatePercent: number;
  diseaseFrequency: { name: string; count: number; percentage: number }[];
  cropWiseCases: { crop: string; cases: number; acresAffected: number }[];
  regionWiseCases: { district: string; cases: number; status: string }[];
  monthlyTrends: { month: string; cases: number; recovered: number }[];
}
